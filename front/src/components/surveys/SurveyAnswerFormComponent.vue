<template>
    <div class="survey-answer-form">
        <h1>Survey Answer Form</h1>
        <form @submit.prevent="submitForm">
            <div v-for="question in question" :key="question.questionID" class="mb-4">
                <label :for="'question-' + question.questionID">{{ question.question_text }}</label>
                <div v-if="question.question_type === 'text'">
                    <input type="text" :id="'question-' + question.questionID" v-model="answers[question.questionID]" class="block w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div v-else-if="question.question_type === 'radio'">
                    <div v-for="option in question.options" :key="option.option_text">
                        <input type="radio" :id="'question-' + question.questionID + '-' + option.option_text" :name="'question-' + question.questionID" :value="option.option_text" v-model="answers[question.questionID]" />
                        <label :for="'question-' + question.questionID + '-' + option.option_text">{{ option.option_text }}</label>
                    </div>
                </div>
                <div v-else-if="question.question_type === 'checkbox'">
                    <div v-for="option in question.options" :key="option.option_text">
                        <input type="checkbox" :id="'question-' + question.questionID + '-' + option.option_text" :value="option.option_text" v-model="answers[question.questionID]" />
                        <label :for="'question-' + question.questionID + '-' + option.option_text">{{ option.option_text }}</label>
                    </div>
                </div>
                <div v-else-if="question.question_type === 'score'">
                    <div v-for="score in [1, 2, 3, 4, 5]" :key="score">
                        <input type="radio" :id="'question-' + question.questionID + '-' + score" :name="'question-' + question.questionID" :value="score" v-model="answers[question.questionID]" />
                        <label :for="'question-' + question.questionID + '-' + score">{{ score }}</label>
                    </div>
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'SurveyAnswerFormComponent',
    props: {
        question: {
            type: Object,
            required: true
        }, 
    },
    data() {
        return {
            answers: {}
        };
    },
    methods: {
        async submitForm() {
            console.log('Form submitted with answers:', this.answers);
            // Add your form submission logic here
        }
    }
};
</script>

<style scoped>
.survey-answer-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>