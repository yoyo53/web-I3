<script>
    import RadioStatisticsComponent from "@/components/statistics/RadioStatisticsComponent.vue";
    import CheckboxStatisticsComponent from "@/components/statistics/CheckboxStatisticsComponent.vue";
    import ScoreStatisticsComponent from "@/components/statistics/ScoreStatisticsComponent.vue";
    import TextStatisticsComponent from "@/components/statistics/TextStatisticsComponent.vue";

    export default {
        name: "SurveyStatisticsComponent",
        props: {
            questions: {
                type: Array,
                required: true,
            },
        },
        components: {
            RadioStatisticsComponent,
            CheckboxStatisticsComponent,
            ScoreStatisticsComponent,
            TextStatisticsComponent,
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

            <RadioStatisticsComponent v-if="question.question_type === 'radio'" :question="question" />

            <CheckboxStatisticsComponent v-else-if="question.question_type === 'checkbox'" :question="question" />

            <ScoreStatisticsComponent v-else-if="question.question_type === 'score'" :question="question" />

            <TextStatisticsComponent v-else :question="question" />
        </div>
    </div>
</template>

<style></style>
