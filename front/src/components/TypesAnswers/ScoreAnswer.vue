<template>
    <div class="flex justify-center px-6 py-4 lg:px-8">
        <div v-for="n in 5" :key="n" @click="selectedScore = n" class="inline-block text-4xl select-none mt-10 sm:mx-auto sm:max-w-sm">
            <span :class="n <= selectedScore ? 'text-efrei-blue-500' : 'text-gray-500'">&#9733;</span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ScoreAnswer',
    props: {
        question: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            selectedScore: null,
        };
    },
    watch: {
        selectedScore() {
            this.$emit('selectedScore', [this.selectedScore.toString()], this.question);
        },
    },
};


</script>