<template>
  <div class="stack-list">
    <ul class="flex flex-col gap-4">
      <li v-for="survey in surveys" :key="survey.id"
        class="border border-gray-300 rounded-lg p-4 bg-gray-50 transition-transform duration-200 ease-in-out hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md cursor-pointer">
        <button v-if="userState.userType === 'Admin'" @click="removeSurvey(survey.surveyID)"
          class="text-red-400 hover:text-red-500 transition duration-300">
          Remove
        </button>
        <router-link :to="{ name: routeToSurvey(), params: { id: survey.surveyID } }">
          <SurveyComponent :survey="survey" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import SurveyComponent from '@/components/surveys/SurveyComponent.vue';
export default {
  inject: ['userState'],
  components: {
    SurveyComponent,
  },

  props: {
    surveys: {
      type: Array,
      required: true,
    },
  },
  methods: {
    routeToSurvey() {
      if (this.userState.userType === 'Teacher') {
        return 'teacherSurveys';
      } else if (this.userState.userType === 'Admin') {
        return 'adminSurveys';
      } else {
        return 'studentSurveys';
      }
    },
    removeSurvey(surveyID) {
      fetch(`${import.meta.env.VITE_API_URL}admin/deleteSurvey/${surveyID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },

      })
      this.$emit('removeSurvey', surveyID);
    },

  },
}

</script>