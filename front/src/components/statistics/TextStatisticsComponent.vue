<script>
    export default {
        name: "TextStatisticsComponent",
        inject: ["userState"],
        props: {
            question: {
                type: Object,
                required: true,
            },
            itemsPerPage: {
                type: Number,
                default: 5,
            },
        },
        data() {
            return {
                currentPage: 1,
            };
        },
        computed: {
            totalPages() {
                return Math.ceil(this.filteredAnswers.length / this.itemsPerPage);
            },
            filteredAnswers() {
                return this.userState.userType === "Admin"
                    ? this.question.answers
                    : this.question.answers.filter((answer) => answer.answer_text);
            },
            filteredAndPaginatedAnswers() {
                return this.filteredAnswers.slice(
                    (this.currentPage - 1) * this.itemsPerPage,
                    this.currentPage * this.itemsPerPage,
                );
            },
        },
    };
</script>

<template>
    <div>
        <div class="max-w-3xl mx-auto py-4">
            <div
                v-for="(answer, index) in filteredAndPaginatedAnswers"
                :key="index"
                class="flex items-center p-4 mb-4 bg-white shadow-md border border-gray-300 rounded-lg hover:shadow-lg hover:border-gray-400 transition duration-300"
            >
                <div class="ml-4 flex-grow">
                    <p class="text-lg font-medium">{{ answer.answer_text }}</p>
                </div>
                <div v-if="userState.userType === 'Admin'">
                    {{ answer.student.firstname }} {{ answer.student.lastname }}
                </div>
                <div v-else class="text-sm text-neutral-500">Answer #{{ index + 1 }}</div>
            </div>

            <div v-if="filteredAnswers.length > itemsPerPage" class="flex justify-center items-center mt-6 space-x-4">
                <button
                    type="button"
                    class="py-2 px-4 bg-efrei-blue-500 font-semibold text-white rounded-md shadow-md hover:bg-efrei-blue-950 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    :disabled="currentPage === 1"
                    @click="currentPage--"
                >
                    Previous
                </button>
                <span class="text-sm text-neutral-500 font-medium">Page {{ currentPage }} of {{ totalPages }}</span>
                <button
                    type="button"
                    class="py-2 px-4 bg-efrei-blue-500 font-semibold text-white rounded-md shadow-md hover:bg-efrei-blue-950 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    :disabled="currentPage === totalPages"
                    @click="currentPage++"
                >
                    Next
                </button>
            </div>

            <div v-if="question.answers.length <= 0" class="text-center text-neutral-500 text-lg mt-8">
                No answers available
            </div>
        </div>
    </div>
</template>

<style></style>
