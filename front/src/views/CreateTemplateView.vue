<template>
    <div class="min-h-screen p-8 flex justify-center items-start">
      <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h1 class="text-2xl font-semibold text-[primary] mb-4">Create Template</h1>

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
        </div>
  
        <!-- Dynamic Questions -->
        <div v-for="(question, index) in questions" :key="index" class="mb-4 p-4 border-2 border-dashed border-transparent-hover rounded-lg">
          <label class="block text-sm font-medium text-gray-700 mb-2">Question {{ index + 1 }}</label>
          <input
            type="text"
            v-model="question.text"
            class="block w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
            placeholder="Enter question"
          />
  
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

          <div v-if="question.responseType === 'radio'">
            <Radiobutton />
            </div>
        <div v-if="question.responseType === 'checkbox'">
            <Checkbox />
            </div>
        </div>
  
        <!-- Add Question Button -->
        <button
          @click="addQuestion"
            class="w-full py-2 px-4 bg-primary font-semibold text-[white] rounded-md shadow-md hover:bg-primary-hover transition duration-300"
          >
            Add Question
          </button>
        
          <!-- Submit Form Button -->
          <button
            @click="submitTemplate"
            class="mt-4 w-full py-2 px-4 bg-transparent font-semibold text-[primary] rounded-md shadow-md hover:bg-transparent-hover transition duration-300"
        >
          Submit Template
        </button>
      </div>
    </div>
  </template>
  

  <script>
    import Radiobutton from '@/components/TypesAnswers/Radiobutton.vue';
    import Checkbox from '@/components/TypesAnswers/Checkbox.vue';

  export default {
    data() {
      return {
        templateName: '',
        questions: [],
      };
    },
    components: {
      Radiobutton,
      Checkbox,
    },
    methods: {
      addQuestion() {
        this.questions.push({ text: '', responseType: 'text' });
      },
      submitTemplate() {
        // Logique pour soumettre les données (à implémenter)
        console.log({
          templateName: this.templateName,
          questions: this.questions,
        });
        alert('Template submitted! Check console for details.');
      },
    },
  };
  </script>
  