<template>
    <TemplateViewerEditor
      :template="template"
      :isEditable="false"
    />
  </template>
  
  <script>
  import TemplateViewerEditor from "@/components/templates/TemplateViewerComponent.vue";
  
  export default {
    props: {
      id: {
        type: Number,
        required: true,
      },
    },
    components: {
      TemplateViewerEditor,
    },
    data() {
      return {
        template: null, // Remplacez par les données réelles
      };
    },
    async created() {
      await this.fetchTemplate();
    },
    watch: {
      id(newId, oldId) {
        if (newId !== oldId) {
          this.fetchTemplate();
        }
      }
    },
    methods: {
      async fetchTemplate() {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}admin/templates/${this.id}`);
          this.template = await response.json();
        } catch (error) {
          console.error("Error fetching template:", error);
        }
      }
    }
  };
  </script>
  