<template>
    <div class="flex flex-col gap-y-4">
        <h1 class="text-2xl font-semibold text-gray-900">Surveys</h1>
        <SurveysListComponent :surveys="surveys"/>
    </div>
</template>

<script>
    import SurveysListComponent from '@/components/surveys/SurveysListComponent.vue';

    export default{
        data(){
            console.log(this.$route.query.id);
            return {
                surveys: [],
            };
        },
        components: {
            SurveysListComponent,
        },
        methods: {
            async fetchAllSurveys(){
                const response = await fetch('http://localhost:3000/teacher/surveys?id=123');
                this.surveys = await response.json();
            }
        },
        beforeMount(){
            this.fetchAllSurveys();
            
        }
    }
</script>