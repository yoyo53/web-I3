<script>
    export default {
        name: "ScoreAnswerComponent",
        props: {
            question: {
                type: Object,
                required: true,
            },
            score: {
                type: Number,
                default: 5,
            },
        },
        data() {
            return {
                selectedScore: null,
            };
        },
        methods: {
            selectScore(score) {
                this.selectedScore = score;
                this.$emit("selectedScore", [this.selectedScore.toString()], this.question);
            },
        },
    };
</script>
<template>
    <div class="flex justify-center px-6 py-4">
        <div
            v-for="value in score"
            :key="value"
            @click="selectScore(value)"
            @keydown.enter="selectScore(value)"
            tabindex="0"
            class="size-10 text-center text-4xl mx-auto cursor-pointer select-none rounded-lg focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-efrei-blue-700"
        >
            <span :class="value <= selectedScore ? 'text-efrei-blue-500' : 'text-neutral-500'">&#9733;</span>
        </div>
    </div>
</template>

<style></style>
