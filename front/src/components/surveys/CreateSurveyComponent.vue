<template>
  <form>
    <!-- Survey Name -->
    <div class="mb-6">
      <label for="template-name" class="block text-sm font-medium text-gray-700 mb-2">
        Survey Name
      </label>
      <input type="text" id="template-name" v-model="templateName"
        class="block w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter template name" />
      <div v-if="errors.templateName" class="text-red-500 text-sm mt-1">
        {{ errors.templateName }}
      </div>
      <div class="flex justify-between items-center">
        <searchBarTemplate class="py-2" @template-selected="handleTemplateSelected"/>
        <searchBarModule class="py-2" @module-selected="handleModuleSelected"/>
        <button @click="modifyForm" class="ml-4 py-2 px-4 bg-primary font-semibold text-white rounded-md shadow-md hover:bg-primary-hover transition duration-300
              ">
          Modify Form
        </button>
      </div>

    </div>
    <!-- Dynamic Questions -->
    <div v-for="(question, index) in questions" :key="index"
      class="mb-4 p-4 border-2 border-dashed border-transparent-hover rounded-lg">
      <label class="block text-sm font-medium text-gray-700 mb-2">Question {{ index + 1 }}</label>

      <div>
      <input type="text" v-model="question.question_text"
      :disabled="!isEditable"
        class="block w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
        placeholder="Enter question" />
      </div>
      <!-- <div v-if="errors[`question_${question.id}`]" class="text-red-500 text-sm mt-1">
        {{ errors[`question_${question.id}`] }}
      </div> -->

      <label class="block text-sm font-medium text-gray-700 mb-2">Response Type</label>
      <select v-model="question.question_type" :disabled="!isEditable" 
        class="block w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <option value="text">Text Input</option>
        <option value="stars">Star Rating (1-5)</option>
        <option value="radio">Radio Buttons</option>
        <option value="checkbox">Checkbox</option>
      </select>

      <RadioButton v-if="question.question_type === 'radio'" :question="question" :isEditable="isEditable"
        @update-options="updateOptions" />

      <CheckBox v-if="question.question_type === 'checkbox'" :question="question" :isEditable="isEditable"
        @update-options="updateOptions" />
    </div>

    <!-- Add Question Button -->
    <div v-if="isEditable">
    <button @click="addQuestion"
      class="w-full py-2 px-4 bg-primary font-semibold text-[white] rounded-md shadow-md hover:bg-primary-hover transition duration-300">
      Add Question
    </button>
    </div>

    <!-- Submit Form Button -->
    <button @click="submitSurvey"
      class="mt-4 w-full py-2 px-4 bg-transparent font-semibold text-[primary] rounded-md shadow-md hover:bg-transparent-hover transition duration-300">
      Publish Survey
    </button>

  </form>
</template>

<script>
import RadioButton from '@/components/TypesAnswers/RadioButton.vue';
import CheckBox from '@/components/TypesAnswers/CheckBox.vue';

import searchBarTemplate from '../searchBarTemplate.vue';
import searchBarModule from '../searchBarModule.vue';

export default {
  data() {
    return {
      modified: false,
      isEditable: true,
      templateName: '',
      questionsTemplateNotModified: [],
      temlpateID: null,
      questions: [],
      errors: {},
    };
  },
  components: {
    RadioButton,
    CheckBox,
    searchBarTemplate,
    searchBarModule
  },
  methods: {
    modifyForm() {
      this.isEditable = !this.isEditable;
    },
    addQuestion() {
      //this.id += 1;
      this.questions.push({ question_text: '', question_type: 'text', options: [] });
      console.log(this.questions);
    },
    updateOptions(question, options) {
      question.options = options; // Mettre à jour les options de la question
    },
    validateFields() {
      this.errors = {}; // Réinitialiser les erreurs
      let isValid = true;

      // Validation du template name
      if (!this.templateName.trim()) {
        this.errors.templateName = 'Template name is required.';
        isValid = false;
      }

      // Validation des questions
      this.questions.forEach((question) => {
        if (question.question_type === 'text' && !question.question_text.trim()) {
          this.errors[`question_${question.id}`] = 'Question text is required.';
          isValid = false;
        }
      });

      return isValid;
    },
    handleTemplateSelected(template) {
      this.isEditable = false;
      this.templateName = template.name;
      console.log(template.name, template.survey_templateID);
      this.getTemplate(template.survey_templateID);
    },
    handleModuleSelected(module) {
      console.log(module);
    },
    async getTemplate(templateID) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}admin/templates/${templateID}`);
        response.json().then((data) => {
          console.log(data);
          this.questions = data.questions;
          this.questionsTemplateNotModified = JSON.parse(JSON.stringify(data.questions));
        });
      } catch (error) {
        console.error(error);
      }
    },
    submitSurvey() {
      if (this.validateFields()) {
        console.log(this.questions);
        console.log(this.questionsTemplateNotModified);
        if (JSON.stringify(this.questionsTemplateNotModified) === JSON.stringify(this.questions)) {
          console.log('No changes');
        } else {
          console.log('Changes detected');
        }
      }
    },
  },
};
</script>