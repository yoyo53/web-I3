<template>
  <div class="flex">
    <!-- Contenu principal -->
    <div class="flex-grow p-6 bg-gray-50 overflow-auto">
      <!-- Titre et détails du sondage -->
      <div class="bg-white shadow rounded-lg p-6 mb-6 flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-gray-800 mb-4"> {{ survey.subject }}-{{ survey.group }}</h1>
        <div class="text-right">
          <h3 class="text-lg font-medium text-gray-700">Teachers:</h3>
            <p class="text-gray-600">{{ survey.teacher.firstname }} {{ survey.teacher.lastname }}</p>
        </div>
      </div>

      <!-- Liste des questions -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Questions</h2>
        
        <!-- Composants de réponse Teacher et Admin -->
        <div v-if="userState.userType === 'Teacher' || userState.userType === 'Admin'">
          <div v-for="question in survey.questions" :key="question.id"
            class="mb-6 border-b pb-4 last:border-b-0 last:pb-0">
            <p class="text-lg font-medium text-gray-700 mb-2">{{ question.question_text }}</p>
            <SurveyAnswerComponent v-if="userState.userType === 'Teacher' || userState.userType === 'Admin'"
              :question="question" class="mt-4" />
          </div>
        </div>

        <!-- Composants de réponse Student -->
        <div v-else-if="userState.userType === 'Student'">
          <!-- Template Name -->
          <SurveyAnswerFormComponent :questions="survey.questions" class="mt-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SurveyAnswerComponent from '@/components/surveys/SurveyAnswerComponent.vue';
import SurveyAnswerFormComponent from '@/components/surveys/SurveyAnswerFormComponent.vue';

export default {
  data() {
    return {
      survey: {}, // Contiendra les détails du sondage
    };
  },
  inject: ['userState'],
  components: {
    SurveyAnswerComponent,
    SurveyAnswerFormComponent,
  },
  name: 'DetailedSurveysComponent',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    // Fonction pour récupérer les questions du sondage via une API
    async fetchSurvey() {
      let url;
      if (this.userState.userType === 'Teacher') {
        url = `${import.meta.env.VITE_API_URL}teacher/surveys/${this.id}`;
      } else if (this.userState.userType === 'Admin') {
        url = `${import.meta.env.VITE_API_URL}admin/surveys/${this.id}`;
      } else {
        url = `${import.meta.env.VITE_API_URL}student/surveys/${this.id}`;
      }
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      this.survey = await response.json();
      console.log(this.survey);
    },
  },
  beforeMount() {
    this.fetchSurvey();
  },
};
</script>
