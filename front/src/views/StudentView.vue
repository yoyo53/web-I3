<template>
    <div>
        <div>
            <h1 class="text-2xl font-bold text-center">Welcome, {{ studentName }}</h1>
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
            const type = localStorage.getItem('userType');
            if (type !== 'Student') {
                this.$router.push('/login');
                console.log('User type : ', type, 'is not a student');
            }
        }, 
        async fetchStudentName() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}student`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            const data = await response.json();
            console.log(data);
            this.studentName = data[0].user.firstname + " " + data[0].user.lastname;
        }, 
        async fetchAllStudentSurveys() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}student/surveys`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            this.surveys = await response.json();
            console.log(this.surveys);
        }
    },
    beforeMount() {
        this.fetchToken();
        this.fetchStudentName();
        this.fetchAllStudentSurveys();

    }
}
</script>