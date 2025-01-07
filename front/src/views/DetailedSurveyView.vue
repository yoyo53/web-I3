<template>
    <div>
      <h1>Survey Details</h1>
      <p>Survey ID: {{ id }}</p>
      
      <div v-for="question in survey.questions" :key="question.id">
        <p>{{ question.question_text }}</p>
        
        <SurveyAnswerComponent v-if="userState.userType === 'Teacher' || 'Admin' " :question="question" />
        <SurveyAnswerFormComponent v-if="userState.userType === 'Student' " :question="question" />

      </div>  

    </div>
</template>
  
<script>
import SurveyAnswerComponent from '@/components/surveys/SurveyAnswerComponent.vue';
import SurveyAnswerFormComponent from '@/components/surveys/SurveyAnswerFormComponent.vue';

  export default {
    data() {
      return {
        survey: {},
      };
    },
    inject: ['userState'],
    components: {
      SurveyAnswerComponent,
      SurveyAnswerFormComponent
    },
    name: 'DetailedSurveysComponent',
    props: {
      id: {
        type: String,
        required: true
      }
    },
    methods: {
      async fetchQuestions() {
        const response = await fetch(`${import.meta.env.VITE_API_URL}survey/${this.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.survey = await response.json();
        console.log("Survey details:");
        console.log(this.survey);
      }
    },
    beforeMount() {
      this.fetchQuestions();
    }
  };
</script>
