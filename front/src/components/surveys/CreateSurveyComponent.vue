<template>
  <form>
    <!-- Survey Name -->
    <div class="mb-6">
      <div class="flex justify-between items-center">
        <searchBarTemplate class="py-2" @template-selected="handleTemplateSelected" />
        <searchBarModule class="py-2" @module-selected="handleModuleSelected" />
        <button @click="modifyForm" class="ml-4 py-2 px-4 bg-primary font-semibold text-white rounded-md shadow-md hover:bg-primary-hover transition duration-300
              ">
          Modify Form
        </button>
      </div>
      <div v-if = "isEditable">
        <input type="text" v-model="templateName"
          class="block w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-4"
          placeholder="Enter Template name" />
      </div>

    </div>
    <!-- Dynamic Questions -->
    <div v-for="(question, index) in questions" :key="index"
      class="mb-4 p-4 border-2 border-dashed border-transparent-hover rounded-lg">
      <label class="block text-sm font-medium text-gray-700 mb-2">Question {{ index + 1 }}</label>

      <div>
        <input type="text" v-model="question.question_text" :disabled="!isEditable"
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
        <option value="score">Star Rating (1-5)</option>
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
      questionsTemplateNotModified: [],
      templateID: null,
      moduleID: null,
      questions: [],
      errors: {},
      templateName: '',
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
      this.templateID = template.survey_templateID;
      console.log(template.name, template.survey_templateID);
      this.getTemplate(template.survey_templateID);
    },
    handleModuleSelected(module) {
      console.log(module);
      this.moduleID = module.moduleID;
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
    async submitSurvey() {
      if (this.validateFields()) {
        console.log(this.questions);
        console.log(this.questionsTemplateNotModified);
        if (JSON.stringify(this.questionsTemplateNotModified) === JSON.stringify(this.questions)) {
          console.log('No changes');
          console.log(this.moduleID);
          console.log(this.templateID);
          const response = await fetch(`${import.meta.env.VITE_API_URL}survey/createfromtemplate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              survey_templateID: this.templateID,
              moduleID: this.moduleID,
            }),
          });
          response.json().then((data) => {
            console.log(data);
            //this.questions = data.questions;
            //this.questionsTemplateNotModified = JSON.parse(JSON.stringify(data.questions));
          });
        } else {
          console.log('Changes detected');
          console.log(this.questions)
          const response = await fetch(`${import.meta.env.VITE_API_URL}survey/createfromnothing`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: this.templateName,
              questions: this.questions,
              moduleID: this.moduleID,
            }),
          });
          response.json().then((data) => {
            console.log(data);
            //this.questions = data.questions;
            //this.questionsTemplateNotModified = JSON.parse(JSON.stringify(data.questions));
          });
        }
      }
    },
  },
};
</script>