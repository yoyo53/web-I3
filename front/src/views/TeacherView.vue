<template>
    <div class="flex flex-col gap-y-4">
        <h1 class="text-2xl font-semibold text-gray-900">Surveys</h1>
        <SurveysListComponent :surveys="surveys"/>
    </div>
</template>

<script>
import SideBarComponent from '@/components/sidebar/SideBarComponent.vue';
import SurveysListComponent from '@/components/surveys/SurveysListComponent.vue';

    export default{
        data(){
            return {
                surveys: [],
            };
        },
        components: {
            SurveysListComponent,
            SideBarComponent,
        },
        methods: {
            async fetchAllSurveys(){
                const response = await fetch('http://localhost:3000/teacher/surveys', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                this.surveys = await response.json();
                console.log(this.surveys);
            }
        },
        beforeMount(){
            this.fetchAllSurveys();
            
        }
    }
</script>