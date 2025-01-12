<template>
    <div v-for="answer in question.answers" :key="answer.id">
        <div class="flex items-center py-2 px-4 mb-2 bg-white rounded-lg shadow-sm hover:bg-gray-100">
            <div class="ml-4">
                <div class="text-xl font-medium text-gray-700">{{ answer.answer_text }}</div>
            </div>
        </div>
    </div>
</template>


<script>

export default {

    props: {
        question: {
            type: Object,
            required: true
        }
    },
};

</script>