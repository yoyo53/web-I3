<script>
    import ScoreAnswer from "@/components/TypesAnswers/ScoreAnswer.vue";
    import TextAnswer from "@/components/TypesAnswers/TextAnswer.vue";
    import RadioButton from "@/components/TypesAnswers/RadioButton.vue";
    import CheckBox from "@/components/TypesAnswers/CheckBox.vue";
    import { useToast } from "vue-toastification";
    const toaster = useToast();

    export default {
        name: "SurveyAnswerFormComponent",
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
            ScoreAnswer,
            TextAnswer,
            RadioButton,
            CheckBox,
        },
        methods: {
            selectAnswer(options, question) {
                this.answers[question.questionID] = options;
            },
            async submitForm() {
                if (Object.keys(this.answers).length !== this.questions.length) {
                    toaster.error("Please answer all questions");
                }
                else {
                    try {
                        const response = await fetch(import.meta.env.VITE_API_URL + "student/answertosurvey", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                            body: JSON.stringify({
                                surveyID: this.surveyID,
                                answers: this.answers,
                            }),
                        });
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

                <ScoreAnswer
                    v-if="question.question_type === 'score'"
                    :question="question"
                    @selectedScore="selectAnswer"
                />

                <TextAnswer
                    v-if="question.question_type === 'text'"
                    :question="question"
                    @selectedText="selectAnswer"
                />

                <RadioButton
                    v-if="question.question_type === 'radio'"
                    :question="question"
                    :editable="false"
                    :answerable="true"
                    @selected-radio="selectAnswer"
                />

                <CheckBox
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
                Submit Template
            </button>
        </form>
    </div>
</template>

<style></style>
