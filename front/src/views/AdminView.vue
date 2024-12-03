<template>
    <div class="flex flex-col gap-y-4">
        <h1 class="text-2xl font-semibold text-gray-900">Surveys</h1>
        <div v-if="surveys.length === 0" class="text-gray-500 text-sm">
            No surveys yet
        </div>
        <SurveysListComponent :surveys="surveys"/>
        <SideBarComponent/>
    </div>
</template>

<script>
    import SurveysListComponent from '@/components/surveys/SurveysListComponent.vue';
    import SideBarComponent from '@/components/sidebar/SideBarComponent.vue';

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
                const response = await fetch('http://localhost:3000/admin');
                this.surveys = await response.json();
            }
        },
        beforeMount(){
            this.fetchAllSurveys();
            
        }
    }
</script>