<script>
    import ScoreAnswerComponent from "@/components/answers/ScoreAnswerComponent.vue";
    import TextAnswerComponent from "@/components/answers/TextAnswerComponent.vue";
    import RadioAnswerComponent from "@/components/answers/RadioAnswerComponent.vue";
    import CheckboxAnswerComponent from "@/components/answers/CheckboxAnswerComponent.vue";
    import { useToast } from "vue-toastification";
    const toaster = useToast();

    export default {
        name: "SurveyFormComponent",
        props: {
            questions: {
                type: Object,
                required: true,
            },
            surveyID: {
                type: Number,
                required: true,
            },
        },
        data() {
            return {
                answers: {},
            };
        },
        components: {
            ScoreAnswerComponent,
            TextAnswerComponent,
            RadioAnswerComponent,
            CheckboxAnswerComponent,
        },
        methods: {
            selectAnswer(options, question) {
                this.answers[question.questionID] = options;
            },
            async submitForm() {
                if (Object.keys(this.answers).length !== this.questions.length) {
                    toaster.error("Please answer all questions");
                } else {
                    try {
                        const response = await fetch(
                            import.meta.env.VITE_API_URL + "student/surveys/" + this.surveyID + "/answer",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                                },
                                body: JSON.stringify({
                                    answers: this.answers,
                                }),
                            },
                        );
                        const data = await response.json();

                        if (!response.ok) {
                            throw new Error(data.message);
                        }

                        toaster.success("Survey answered successfully");
                        this.$router.push({ name: "student" });
                    } catch (error) {
                        console.error(error);
                        toaster.error("Something went wrong");
                    }
                }
            },
        },
    };
</script>

<template>
    <div>
        <form class="space-y-4" @submit.prevent="submitForm">
            <div
                v-for="(question, index) in questions"
                :key="index"
                class="mb-4 p-4 border-2 border-dashed border-neutral-200 rounded-lg"
            >
                <label class="mb-2 block text-sm">Question {{ index + 1 }}</label>
                <p class="block w-full px-4 py-2 border border-neutral-300 rounded-md mb-2">
                    {{ question.question_text }}
                </p>

                <ScoreAnswerComponent
                    v-if="question.question_type === 'score'"
                    :question="question"
                    @selectedScore="selectAnswer"
                />

                <TextAnswerComponent
                    v-if="question.question_type === 'text'"
                    :question="question"
                    @selectedText="selectAnswer"
                />

                <RadioAnswerComponent
                    v-if="question.question_type === 'radio'"
                    :question="question"
                    :editable="false"
                    :answerable="true"
                    @selected-radio="selectAnswer"
                />

                <CheckboxAnswerComponent
                    v-if="question.question_type === 'checkbox'"
                    :question="question"
                    :editable="false"
                    :answerable="true"
                    @selected-checkbox="selectAnswer"
                />
            </div>

            <button
                type="submit"
                class="w-full py-2 px-4 bg-efrei-blue-500 font-semibold text-white rounded-md shadow-md hover:bg-efrei-blue-950 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
            >
                Submit Answers
            </button>
        </form>
    </div>
</template>

<style></style>
