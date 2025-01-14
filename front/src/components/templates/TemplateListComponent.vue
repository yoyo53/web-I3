<template>
  <div class="stack-list">
    <ul class="flex flex-col gap-4">
      <li v-for="template in templates" :key="template.id"
        class="border border-gray-300 rounded-lg p-4 bg-gray-50 transition-transform duration-200 ease-in-out hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md cursor-pointer">
        <button @click="() => {showPopup = true; deleteTemplate = template}"
          class="text-red-400 hover:text-red-500 transition duration-300">
          Remove
        </button>
        <TemplateComponent v-on:click="openTemplate(template)" :template="template" />
      </li>
    </ul>
    <PopupComponent :show-dialog="showPopup" :dialog="'Are you sure you want to delete this template?'"
          :onConfirm="() => removeTemplate(deleteTemplate.survey_templateID)" />
  </div>
</template>



<script>
import TemplateComponent from '@/components/templates/TemplateComponent.vue';
import PopupComponent from '@/components/PopupComponent.vue';

export default {
  data() {
    return {
      showPopup: false,
      deleteTemplate: null,
    };
  },
  methods: {
    openTemplate(template) {
      this.$router.push({ path: `template/${template.survey_templateID}` });
    },
    async removeTemplate(templateID) {
      const response = await fetch(`${import.meta.env.VITE_API_URL}admin/deleteTemplate/${templateID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        console.log('Error deleting template');
        return;
      }
      this.$emit('removeTemplate');
    },
  },
  components: {
    TemplateComponent,
    PopupComponent,
  },
  props: {
    templates: {
      type: Array,
      required: true,
    },
  },
}

</script>