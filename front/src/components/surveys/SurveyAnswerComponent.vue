<template>
    <div>
        <div v-if="question_type === 'radio'" class="min-w-0 flex-auto">
            <RadioButtonAnswerComponent :answers="answers" />
        </div>
    </div>
</template>

<script>
import RadioButtonAnswerComponent from '@/components/statistics/RadioButtonAnswerComponent.vue';

export default {
    props: {
        answers: {
            type: Array,
            required: true
        },
        question_type: {
            type: String,
            required: true
        }
    },
    components: {
        RadioButtonAnswerComponent
    }
};
</script>