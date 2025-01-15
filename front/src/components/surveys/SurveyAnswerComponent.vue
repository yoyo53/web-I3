<script>
    import RadioButtonAnswerComponent from "@/components/statistics/RadioButtonAnswerComponent.vue";
    import CheckBoxAnswerComponent from "@/components/statistics/CheckBoxAnswerComponent.vue";
    import StarRatingAnswerComponent from "@/components/statistics/StarRatingAnswerComponent.vue";
    import TextAnswerComponent from "@/components/statistics/TextAnswerComponent.vue";

    export default {
        name: "SurveyAnswersComponent",
        props: {
            questions: {
                type: Array,
                required: true,
            },
        },
        components: {
            RadioButtonAnswerComponent,
            CheckBoxAnswerComponent,
            StarRatingAnswerComponent,
            TextAnswerComponent,
        },
    };
</script>

<template>
    <div>
        <div
            v-for="(question, index) in questions"
            :key="index"
            class="my-6 border-b border-neutral-300 pb-4 last:border-b-0 last:pb-0"
        >
            <p class="text-base text-neutral-500">Question {{ index + 1 }}</p>
            <p class="text-lg mb-2">{{ question.question_text }}</p>

            <RadioButtonAnswerComponent v-if="question.question_type === 'radio'" :question="question" />

            <CheckBoxAnswerComponent v-else-if="question.question_type === 'checkbox'" :question="question" />

            <StarRatingAnswerComponent v-else-if="question.question_type === 'score'" :question="question" />

            <TextAnswerComponent v-else :question="question" />
        </div>
    </div>
</template>

<style></style>
