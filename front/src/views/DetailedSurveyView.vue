<template>
  <div class="flex">
    <!-- Contenu principal -->
    <div class="flex-grow p-6 bg-gray-50">
      <!-- Titre et détails du sondage -->
      <div class="bg-white shadow rounded-lg p-6 mb-6">
        <h1 class="text-2xl font-semibold text-gray-800 mb-4"> {{ survey.subject }}-{{ survey.group }}</h1>
      </div>

      <!-- Liste des questions -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Questions</h2>
        <div v-for="question in survey.questions" :key="question.id" class="mb-6 border-b pb-4 last:border-b-0 last:pb-0">
          <p class="text-lg font-medium text-gray-700 mb-2">{{ question.question_text }}</p>

          <!-- Composants de réponse selon le type d'utilisateur -->
          <SurveyAnswerComponent
            v-if="userState.userType === 'Teacher' || userState.userType === 'Admin'"
            :question="question"
            class="mt-4"
          />
          <SurveyAnswerFormComponent
            v-if="userState.userType === 'Student'"
            :question="question"
            class="mt-4"
          />
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
