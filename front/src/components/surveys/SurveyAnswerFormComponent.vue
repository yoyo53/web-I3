<template>
    <div class="survey-answer-form">
        <form>

            <!-- Dynamic Questions -->
            <div v-for="(question, index) in questions" :key="index"
                class="mb-4 p-4 border-2 border-dashed border-transparent-hover rounded-lg">
                <!-- <label class="block text-sm font-medium text-gray-700 mb-2">Question {{ index + 1 }}</label> -->
                <div class="flex justify-between items-center mb-2">
                    <label class="block text-sm font-medium text-gray-700">Question {{ index + 1 }}</label>
                </div>
                <p class="block w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 mb-2">{{
                    question.question_text }}</p>
                <!-- <label class="block text-sm font-medium text-gray-700 mb-2">Response Type</label>
                <select v-model="question.question_type"
                    class="block w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="text">Text Input</option>
                    <option value="score">Star Rating (1-5)</option>
                    <option value="radio">Radio Buttons</option>
                    <option value="checkbox">Checkbox</option>
                </select> -->

                <!-- Dynamic Answer Components -->
                <ScoreAnswer v-if="question.question_type === 'score'" :question="question"
                    @selectedScore="selectAnswer" />

                <TextAnswer v-if="question.question_type === 'text'" :question="question"
                    @selectedText="selectAnswer" />

                <RadioButton v-if="question.question_type === 'radio'" :question="question" :is-editable="false"
                    @selected-radio="selectAnswer" />

                <CheckBox v-if="question.question_type === 'checkbox'" :question="question" :is-editable="false"
                    @selected-checkbox="selectAnswer" />
            </div>

            <!-- Submit Form Button -->
            <button @click="submitForm"
                class="mt-4 w-full py-2 px-4 bg-transparent font-semibold text-[primary] rounded-md shadow-md hover:bg-transparent-hover transition duration-300">
                Submit Template
            </button>

        </form>
    </div>
</template>

<script>

import ScoreAnswer from '../TypesAnswers/ScoreAnswer.vue';
import TextAnswer from '../TypesAnswers/TextAnswer.vue';

import RadioButton from '@/components/TypesAnswers/RadioButton.vue';
import CheckBox from '@/components/TypesAnswers/CheckBox.vue';

export default {
    name: 'SurveyAnswerFormComponent',
    components: {
        ScoreAnswer,
        TextAnswer,
        RadioButton,
        CheckBox,
    },
    props: {
        questions: {
            type: Object,
            required: true
        },
        surveyID: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            answers: {}
        };
    },
    methods: {
        selectAnswer(options, question) {
            console.log('Selected score:', options, 'for question:', question);
            this.answers[question.questionID] = options;
        },
        async submitForm() {
            console.log('Form submitted with answers:', this.questions);
            console.log('Form submitted with answers:', this.answers);
            // Add your form submission logic here answertosurvey
            const response = await fetch(`${import.meta.env.VITE_API_URL}student/answertosurvey`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    surveyID: this.surveyID,
                    answers: this.answers
                })
            });
            const data = await response.json();
            console.log(data);
        }
    }
};
</script>