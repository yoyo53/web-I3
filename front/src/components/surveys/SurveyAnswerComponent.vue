<template>
    <div>
        <div v-if="question.question_type === 'radio'" class="min-w-0 flex-auto">
            <RadioButtonAnswerComponent :question="question" />
        </div>
        <div v-else-if="question.question_type === 'checkbox'" class="min-w-0 flex-auto">
            <CheckBoxAnswerComponent :question="question" />
        </div>
        <div v-else-if="question.question_type === 'score'" class="min-w-0 flex-auto">
            <StarRatingAnswerComponent :question="question" />
        </div>
        <div v-else class="min-w-0 flex-auto">
            <TextAnswerComponent :question="question" />
        </div>
    </div>
</template>

<script>
import RadioButtonAnswerComponent from '@/components/statistics/RadioButtonAnswerComponent.vue';
import CheckBoxAnswerComponent from '@/components/statistics/CheckBoxAnswerComponent.vue';
import StarRatingAnswerComponent from '@/components/statistics/StarRatingAnswerComponent.vue';
import TextAnswerComponent from '@/components/statistics/TextAnswerComponent.vue';

export default {
    props: {
        question: {
            type: Object,
            required: true
        },
    },
    components: {
        RadioButtonAnswerComponent,
        CheckBoxAnswerComponent,
        StarRatingAnswerComponent,
        TextAnswerComponent
    }
};
</script>