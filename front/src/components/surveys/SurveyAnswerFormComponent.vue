<template>
    <div class="survey-answer-form">
        <h1>Survey Answer Form</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="question1">Question 1:</label>
                <input type="text" id="question1" v-model="answers.question1" required />
            </div>
            <div class="form-group">
                <label for="question2">Question 2:</label>
                <input type="text" id="question2" v-model="answers.question2" required />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'SurveyAnswerFormComponent',
    data() {
        return {
            answers: {
                question1: '',
                question2: ''
            }
        };
    },
    methods: {
        submitForm() {
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