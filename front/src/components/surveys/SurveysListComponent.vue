<script>
    import PopupComponent from "@/components/popup/PopupComponent.vue";
    import { useToast } from "vue-toastification";
    const toaster = useToast();

    export default {
        name: "SurveysListComponent",
        inject: ["userState"],
        props: {
            surveys: {
                type: Array,
                required: true,
            },
        },
        data() {
            return {
                showPopup: false,
                selectedSurvey: null,
            };
        },
        components: {
            PopupComponent,
        },
        methods: {
            getSurveyRoute() {
                if (this.userState.userType === "Admin") {
                    return "adminSurveyView";
                } else if (this.userState.userType === "Teacher") {
                    return "teacherSurveyView";
                } else {
                    return "studentSurveyView";
                }
            },
            async deleteSurvey(surveyID) {
                try {
                    const response = await fetch(import.meta.env.VITE_API_URL + "admin/surveys/" + surveyID, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    this.$emit("removeSurvey");
                    toaster.success("Survey deleted successfully");
                } catch (error) {
                    console.error(error);
                    toaster.error("Something went wrong");
                }
            },
            openModal(survey) {
                this.selectedSurvey = survey;
                this.showPopup = true;
            },
            closeModal() {
                this.showPopup = false;
            },
        },
    };
</script>

<template>
    <div>
        <ul class="space-y-4">
            <li v-for="(survey, index) in surveys" :key="index">
                <RouterLink
                    :to="{ name: getSurveyRoute(), params: { id: survey.surveyID } }"
                    class="p-4 block border border-neutral-300 rounded-lg bg-neutral-50 cursor-pointer transition-transform duration-200 ease-in-out hover:bg-neutral-100 hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
                >
                    <button
                        v-if="userState.userType === 'Admin'"
                        type="button"
                        @click.prevent="openModal(survey)"
                        class="text-red-400 hover:text-red-500 font-semibold rounded-lg focus:outline-none focus:ring-offset-4 focus:ring-2 focus:ring-red-700"
                    >
                        Remove
                    </button>
                    <div class="flex min-w-0 gap-x-4">
                        <div class="min-w-0 flex-auto">
                            <p class="text-sm/6 font-semibold">Subject: {{ survey.subject }}</p>
                            <p class="mt-1 text-xs/5 text-neutral-500">
                                {{ survey.teacher.firstname }} {{ survey.teacher.lastname }}
                            </p>
                        </div>
                        <div class="text-end">
                            <p class="text-sm/6">Group</p>
                            <p class="mt-1 text-xs/5 text-neutral-500">{{ survey.group }}</p>
                        </div>
                    </div>
                </RouterLink>
            </li>
        </ul>
        <PopupComponent
            :isOpen="showPopup"
            popUpText="Are you sure you want to delete this survey ? This will also delete all associated answers"
            @close-modal="closeModal"
            @confirm-action="deleteSurvey(selectedSurvey.surveyID)"
        />
    </div>
</template>

<style></style>
