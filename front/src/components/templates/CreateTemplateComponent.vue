<template>
    <!-- Template Name -->
    <div class="mb-6">
          <label for="template-name" class="block text-sm font-medium text-gray-700 mb-2">
            Template Name
          </label>
          <input
            type="text"
            id="template-name"
            v-model="templateName"
            class="block w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter template name"
          />
          <div v-if="errors.templateName" class="text-red-500 text-sm mt-1">
            {{ errors.templateName }}
        </div>
    </div>
    <!-- Dynamic Questions -->
    <div v-for="(question, index) in questions" :key="index" class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Question {{ index + 1 }}</label>
          <input
            type="text"
            v-model="question.text"
            class="block w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
            placeholder="Enter question"
          />
          <div v-if="errors[`question_${question.id}`]" class="text-red-500 text-sm mt-1">
            {{ errors[`question_${question.id}`] }}
        </div>
  
          <label class="block text-sm font-medium text-gray-700 mb-2">Response Type</label>
          <select
            v-model="question.responseType"
            class="block w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="text">Text Input</option>
            <option value="stars">Star Rating (1-5)</option>
            <option value="radio">Radio Buttons</option>
            <option value="checkbox">Checkbox</option>
          </select>

            <Radiobutton 
                v-if="question.responseType === 'radio'"
                :questionId="question.id"
                :checkboxes="question.options"
                @update-options="updateOptions"
            />

            <Checkbox 
                v-if="question.responseType === 'checkbox'"
                :questionId="question.id"
                :checkboxes="question.options"
                @update-options="updateOptions"
            />
        </div>
  
        <!-- Add Question Button -->
        <button
          @click="addQuestion"
          class="w-full py-2 px-4 bg-secondary-blue-color text-white rounded-md shadow-md hover:bg-primary-blue-color transition duration-300"
        >
          Add Question
        </button>
  
        <!-- Submit Form Button -->
        <button
          @click="submitTemplate"
          class="mt-4 w-full py-2 px-4 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-300"
        >
          Submit Template
        </button>
</template>

<script>
    import Radiobutton from '@/components/TypesAnswers/Radiobutton.vue';
    import Checkbox from '@/components/TypesAnswers/Checkbox.vue';

  export default {
    data() {
      return {
        templateName: '',
        id: 0,
        questions: [],
        errors: {},
      };
    },
    components: {
      Radiobutton,
      Checkbox,
    },
    methods: {
      addQuestion() {
        this.id += 1;
        this.questions.push({ id: this.id, text: '', responseType: 'text', options: [] });
        console.log(this.questions);
      },
      updateOptions(questionId, options) {
      const question = this.questions.find((q) => q.id === questionId);
      if (question) {
        question.options = options;
      }
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
        if (question.responseType === 'text' && !question.text.trim()) {
          this.errors[`question_${question.id}`] = 'Question text is required.';
          isValid = false;
        }
      });

      return isValid;
    },
      submitTemplate() {
        if (this.validateFields()) {
        console.log({
          templateName: this.templateName,
          questions: this.questions,
        });
    }
      },
    },
  };
</script>