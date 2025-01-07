<!-- <template>
  <div class="min-h-screen p-8 flex justify-center items-start">
    <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
      <h1 class="text-2xl font-semibold text-[primary] mb-4">Create Template</h1>
      <div>
        <select @change="handleSelection" class="border rounded p-2">
          <option value="">-- Select an option --</option>
          <option v-for="template in templates" :key="template.id" :value="template.id">
            {{ template.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
  
  <script>

    export default{
        data(){
            return {
                templates: [],
            };
        },
        methods: {
            handleSelection(event) {
              console.log('Selected template ID:', event.target.value);
            },
            async fetchAllSurveys(){
                const response = await fetch(`${import.meta.env.VITE_API_URL}admin/templates`);
                this.templates = await response.json();
                console.log(this.templates);
            }
        },
        beforeMount(){
            this.fetchAllSurveys();
            
        }
    }
</script> -->

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
