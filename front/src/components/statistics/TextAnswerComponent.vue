<template>
    <div class="max-w-3xl mx-auto p-4">
        <!-- Réponses filtrées et paginées -->
        <div 
            v-for="(answer, index) in filteredAndPaginatedAnswers" 
            :key="index" 
            class="flex items-center p-4 mb-4 bg-white shadow-md border border-gray-300 rounded-lg hover:shadow-lg hover:border-gray-400 transition duration-300"
        >
            <div class="ml-4 flex-grow">
                <p class="text-lg font-medium text-gray-800">{{ answer.answer_text }}</p>
            </div>
            <div class="text-sm text-gray-400">
                Answer #{{ index + 1 }}
            </div>
        </div>

        <!-- Contrôles de pagination -->
        <div class="flex justify-center items-center mt-6 space-x-4">
            <button 
                class="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed" 
                :disabled="currentPage === 1" 
                @click="currentPage--"
            >
                Previous
            </button>
            <span class="text-gray-600 text-sm font-medium">
                Page {{ currentPage }} of {{ totalPages }}
            </span>
            <button 
                class="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed" 
                :disabled="currentPage === totalPages" 
                @click="currentPage++"
            >
                Next
            </button>
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
    data() {
        return {
            currentPage: 1, // Page actuelle
            itemsPerPage: 5, // Nombre de réponses par page
            isTeacher: false, // Rôle de l'utilisateur
        };
    },
    inject: ['userState'],
    computed: {
        totalPages() {
            // Calcul du nombre total de pages
            return Math.ceil(this.filteredAnswers.length / this.itemsPerPage);
        },
        filteredAnswers() {
            // Filtre les réponses en fonction du rôle de l'utilisateur
            return this.isTeacher
                ? this.question.answers.filter(answer => answer.answer_text)
                : this.question.answers;
        },
        filteredAndPaginatedAnswers() {
            // Retourne les réponses filtrées pour la page actuelle
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredAnswers.slice(start, end);
        },
    },
    beforeMount() {
        // Détermine le rôle de l'utilisateur
        this.isTeacher = this.userState.userType === 'Teacher';
    },
};
</script>
