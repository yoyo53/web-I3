<template>
    <div class="min-h-screen p-8 flex justify-center items-start">
      <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h1 class="text-2xl font-semibold text-[primary] mb-4">Create Survey</h1>
        <CreateSurveyComponent/>
      </div>
    </div>
  </template>
  

  <script>
  import CreateSurveyComponent from '@/components/surveys/CreateSurveyComponent.vue';

  export default {
    components: { 
      CreateSurveyComponent,
    },

  };
  </script>
  