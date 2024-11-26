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
        components: {
            SurveyComponent,
        },
        props: {
        surveys: {
            type: Array,
            required: true,
        },
    },
    }

</script>