<template>
    <div>
        <h1>Survey Answer Component</h1>
        <form @submit.prevent="submitAnswer">
            <div v-for="(question, index) in questions" :key="index">
                <label :for="'question-' + index">{{ question }}</label>
                <input type="text" :id="'question-' + index" v-model="answers[index]" />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            questions: ["What is your name?", "How old are you?", "What is your favorite color?"],
            answers: ["", "", ""]
        };
    },
    methods: {
        submitAnswer() {
            console.log("Submitted answers:", this.answers);
            // Add your form submission logic here
        }
    }
};
</script>

<style scoped>
h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

form {
    display: flex;
    flex-direction: column;
}

div {
    margin-bottom: 10px;
}

label {
    margin-bottom: 5px;
}

input {
    padding: 5px;
    font-size: 16px;
}

button {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
}
</style>