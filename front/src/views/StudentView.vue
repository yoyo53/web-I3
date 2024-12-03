<template>
    <div>
        <div>

        </div>
    <div class="flex justify-center min-h-screen">
        <div v-if="surveys.length === 0" class="text-gray-500 text-sm">
            <p>No surveys yet</p>
        </div>
        <div v-else>
            <p class="text-gray-500 text-sm">{{ surveys.length }} surveys available</p>
            <SurveysListComponent :surveys="surveys" />
        </div>
    </div>
    </div>
</template>

<script>
import SurveysListComponent from '@/components/surveys/SurveysListComponent.vue';

export default {
    data() {
        return {
            surveys: [],
            studenId: null,
            studentName: '',
        };
    },
    components: {
        SurveysListComponent,
    },
    methods: {
        async fetchToken() {
            const type = localStorage.getItem('type');
            if (type !== 'Student') {
                this.$router.push('/login');
                console.log('User type : ', type, 'is not a student');
            }
        }, 
        async fetchStudentName() {
            const response = await fetch(`http://localhost:3000/student`);
            const data = await response.json();
            this.studentName = data.name;
            console.log('Student name : ', this.studentName);
        }, 
        /*
        async fetchAllSurveys() {
            const response = await fetch('http://localhost:3000/admin');
            this.surveys = await response.json();
        }
        */
    },
    beforeMount() {
        this.fetchToken();
        this.fetchStudentName();
        //this.fetchAllSurveys();

    }
}
</script>