<template>
    <div class="min-h-screen p-8 flex justify-center items-start">
      <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h1 class="text-2xl font-semibold text-gray-800 mb-4">Create Template</h1>
        <CreateTemplateComponent/>
      </div>
    </div>
  </template>
  

  <script>
    import CreateTemplateComponent from '@/components/templates/CreateTemplateComponent.vue';

  export default {
    components: {
      CreateTemplateComponent,
    },

  };
  </script>
  