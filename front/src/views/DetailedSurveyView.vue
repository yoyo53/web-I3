<script>
    import SurveyAnswerComponent from "@/components/surveys/SurveyAnswerComponent.vue";
    import SurveyAnswerFormComponent from "@/components/surveys/SurveyAnswerFormComponent.vue";
    import { useToast } from "vue-toastification";
    const toaster = useToast();

    export default {
        name: "SurveyView",
        inject: ["userState"],
        props: {
            id: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                survey: null,
            };
        },
        components: {
            SurveyAnswerComponent,
            SurveyAnswerFormComponent,
        },
        methods: {
            async getSurvey(surveyID) {
                try {
                    let route;
                    if (this.userState.userType === "Teacher") {
                        route = "teacher/surveys/";
                    } else if (this.userState.userType === "Admin") {
                        route = "admin/surveys/";
                    } else {
                        route = "student/surveys/";
                    }
                    const response = await fetch(import.meta.env.VITE_API_URL + route + surveyID, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }

                    this.survey = await response.json();
                } catch (error) {
                    console.error(error);
                    toaster.error("Something went wrong");
                }
            },
        },
        beforeMount() {
            this.getSurvey(this.id);
        },
    };
</script>

<template>
    <div class="flex justify-center items-center">
        <section v-if="!survey">
            <p class="text-2xl font-semibold">Loading survey details...</p>
        </section>

        <section v-else class="p-6 w-full max-w-7xl">
            <h1 class="mb-4 text-2xl font-semibold text-center">
                {{ survey.subject }} - {{ survey.group }} - {{ survey.teacher.firstname }} {{ survey.teacher.lastname }}
            </h1>

            <div class="shadow rounded-lg p-6">
                <h2 class="text-xl font-semibold mb-4">Questions</h2>
                <div v-if="userState.userType === 'Admin' || userState.userType === 'Teacher'">
                    <SurveyAnswerComponent
                        :questions="survey.questions"
                        class="mb-4"
                    >
                    </SurveyAnswerComponent>
                </div>
                <div v-else>
                    <SurveyAnswerFormComponent
                        :questions="survey.questions"
                        :surveyID="this.survey.surveyID"
                        class="mb-4"
                    />
                </div>
            </div>
        </section>
    </div>
</template>

<style></style>
