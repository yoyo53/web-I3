<template>
  <div class="template-container">
    <!-- Template Name -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
      <input
        v-if="isEditable"
        type="text"
        v-model="localTemplate.name"
        class="block w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <p v-else class="text-gray-700 text-lg">{{ localTemplate.name }}</p>
    </div>

    <!-- Questions -->
    <div v-for="(question, index) in localTemplate.questions" :key="index" class="mb-6 p-4 border rounded-lg">
  <label class="block text-sm font-medium text-gray-700 mb-2">Question {{ index + 1 }}</label>
  <input
    v-if="isEditable"
    type="text"
    v-model="question.question_text"
    class="block w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
  />
  <p v-else class="text-gray-700">{{ question.question_text }}</p>

  <label class="block text-sm font-medium text-gray-700 mb-2">Response Type</label>
  <select
    v-if="isEditable"
    v-model="question.question_typeID"
    class="block w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    <option value="1">Text Input</option>
    <option value="2">Radio Buttons</option>
    <option value="3">Checkbox</option>
    <option value="4">Star Rating (1-5)</option>
  </select>
  <p v-else class="text-gray-700">
    Type: 
    <span v-if="question.question_typeID === 1">Text Input</span>
    <span v-if="question.question_typeID === 2">Radio Buttons</span>
    <span v-if="question.question_typeID === 3">Checkbox</span>
    <span v-if="question.question_typeID === 4">Star Rating (1-5)</span>
  </p>

  <!-- Affichage des options RadioButton ou CheckBox en fonction de question_typeID -->
  <RadioButton 
    v-if="question.question_typeID === 2"
    :questionId="question.id"
    :radios="question.options"
    @update-options="updateOptions"
  />
  <CheckBox 
    v-if="question.question_typeID === 3"
    :questionId="question.id"
    :checkboxes="question.options"
    @update-options="updateOptions"
  />
</div>


    <!-- Save Button (only in editable mode) -->
    <button
      v-if="isEditable"
      @click="saveTemplate"
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
    >
      Save Changes
    </button>
  </div>
</template>

<script>
import RadioButton from '@/components/TypesAnswers/RadioButton.vue';
import CheckBox from '@/components/TypesAnswers/CheckBox.vue';

export default {
  props: {
    template: {
      type: Object,
      required: true,
    },
    isEditable: {
      type: Boolean,
      default: false,
    },
  },
  components: {
      RadioButton,
      CheckBox,
    },
  data() {
    return {
      // Create a local copy of the template prop
      localTemplate: JSON.parse(JSON.stringify(this.template)),
    };
  },
  watch: {
    template: {
      handler(newTemplate) {
        this.localTemplate = JSON.parse(JSON.stringify(newTemplate)); 
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    saveTemplate() {
     //TODO
      console.log("Template saved:", this.localTemplate);
    },
  },
};
</script>
