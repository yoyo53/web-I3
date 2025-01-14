<script>
    import SurveysListComponent from "@/components/surveys/SurveysListComponent.vue";
    import { useToast } from "vue-toastification";
    const toaster = useToast();

    export default {
        name: "SurveysListView",
        inject: ["userState"],
        data() {
            return {
                surveys: [],
            };
        },
        components: {
            SurveysListComponent,
        },
        methods: {
            async fetchAllSurveys() {
                try {
                    let route;
                    if (this.userState.userType === "Admin") {
                        route = "admin/surveys";
                    } else if (this.userState.userType === "Teacher") {
                        route = "teacher/surveys";
                    } else {
                        route = "student/surveys";
                    }
                    const response = await fetch(import.meta.env.VITE_API_URL + route, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }

                    this.surveys = await response.json();
                } catch (error) {
                    console.error(error);
                    toaster.error("Something went wrong");
                }
            },
        },

        beforeMount() {
            this.fetchAllSurveys();
        },
    };
</script>

<template>
    <div>
        <section class="my-12">
            <h1 class="my-6 text-3xl font-semibold text-center">Surveys</h1>
            <RouterLink
                v-if="userState.userType === 'Admin'"
                :to="{ name: 'createSurvey' }"
                class="block w-full max-w-7xl rounded-md text-center my-4 px-4 py-2 text-sm/6 font-semibold text-white shadow-sm bg-efrei-blue-500 hover:bg-efrei-blue-950 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
                >
                Create a Survey
            </RouterLink>
            <div v-if="surveys.length === 0" class="text-gray-500 text-sm text-center">No surveys yet</div>
            <SurveysListComponent v-else class="max-w-7xl mx-auto" :surveys="surveys" @removeSurvey="fetchAllSurveys" />
        </section>
    </div>
</template>

<style></style>
