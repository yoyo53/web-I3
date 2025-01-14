<template>
    <div class="stack-list">
      <ul class="flex flex-col gap-4"> 
        <li 
          v-for="survey in surveys" 
          
          :key="survey.id" 
          class="border border-gray-300 rounded-lg p-4 bg-gray-50 transition-transform duration-200 ease-in-out hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md cursor-pointer"
          >
          <router-link 
          v-if="userState.userType === 'Student'" 
          :to="{ name: 'student-survey', params: { id: survey.surveyid } }"
        >
          <SurveyComponent :survey="survey" />
        </router-link>
        <router-link 
          v-else-if="userState.userType === 'Teacher'" 
          :to="{ name: 'teacher-survey', params: { id: survey.surveyid } }"
        >
          <SurveyComponent :survey="survey" />
        </router-link> 
        </li>
      </ul>
    </div>
  </template>
  
<script>
    import SurveyComponent from '@/components/surveys/SurveyComponent.vue';
    export default{
        components: {
            SurveyComponent,
        }, 
        inject: ['userState'],
        props: {
        surveys: {
            type: Array,
            required: true,
        },
        
    },
    }

</script>