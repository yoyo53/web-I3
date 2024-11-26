<template>
    <div>
        <ul>
            <li v-for="survey in surveys" :key="survey.id">
                <SurveyComponent :survey="survey"/>
            </li>
        </ul>
    </div>
</template>
  
  
<script>
    import SurveyComponent from '@/components/surveys/SurveyComponent.vue';

    export default{
        props: {
        surveys: {
            type: Array,
            required: true,
        },
        components: {
            SurveyComponent,
        },
    },
    }

</script>