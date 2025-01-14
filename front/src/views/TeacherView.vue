<template>
    <div>
        <div class="flex flex-col gap-y-4">
            <h1 class="text-2xl font-semibold text-gray-900">Surveys</h1>
            <div v-if="surveys.length === 0" class="text-gray-500 text-sm">
                No surveys yet
            </div>
            <SurveysListComponent :surveys="surveys"/>
        </div>
    </div>
</template>

<script>
import SurveysListComponent from '@/components/surveys/SurveysListComponent.vue';

    export default{
        data(){
            return {
                surveys: [],
            };
        },
        components: {
            SurveysListComponent,
        },
        methods: {
            async fetchAllSurveys(){
                const response = await fetch(`${import.meta.env.VITE_API_URL}teacher/surveys`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                this.surveys = await response.json();
            }
        },
        beforeMount(){
            this.fetchAllSurveys();
            
        }
    }
</script>