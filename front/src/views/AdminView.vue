<template>
    <div>
        <div class="flex flex-col gap-y-4">
            <h1 class="text-2xl font-semibold text-gray-900">Surveys</h1>
            <div v-if="surveys.length === 0" class="text-gray-500 text-sm">
                No surveys yet
            </div>
            <button
                @click="goToAddSurvey"
                class="w-full max-w-xs py-2 px-4 bg-gray-300 text-gray-800 rounded-sm transition-all duration-300 ease-in-out hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                >
                Add a Survey
            </button>
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
                const response = await fetch(`${import.meta.env.VITE_API_URL}admin/surveys`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                this.surveys = await response.json();
                console.log(this.surveys);
            },
            goToAddSurvey(){
                this.$router.push({ path: '/admin/surveys/create' });
            },
        },
        beforeMount(){
            this.fetchAllSurveys();
            
        }
    }
</script>