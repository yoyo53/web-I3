<script>
    import { Bar } from "vue-chartjs";
    import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";
    import TextAnswerComponent from "@/components/statistics/TextAnswerComponent.vue";

    Chart.register(CategoryScale, LinearScale, BarElement);

    export default {
        name: "ScoreStatisticsComponent",
        inject: ["userState"],
        props: {
            question: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                mean: 0,
                chartData: {},
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                },
                showDetails: false,
            };
        },
        components: {
            Bar,
            TextAnswerComponent,
        },
        methods: {
            countAnswers() {
                return this.question.answers.reduce((count, { answer_text }) => {
                    let index = ["1", "2", "3", "4", "5"].findIndex((option) => option === answer_text);
                    count[index] = (count[index] ?? 0) + 1;
                    return count;
                }, []);
            },
            getMean() {
                let sum = 0;
                this.question.answers.forEach((answer) => {
                    sum += parseInt(answer.answer_text);
                });
                return sum / this.question.answers.length;
            },
            toggleDetails() {
                this.showDetails = !this.showDetails;
            },
            randomColor() {
                return "#" + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0");
            },
        },
        beforeMount() {
            this.chartData = {
                labels: ["1", "2", "3", "4", "5"],
                datasets: [
                    {
                        maxBarThickness: 80,
                        data: this.countAnswers(),
                        backgroundColor: ["1", "2", "3", "4", "5"].map(this.randomColor),
                    },
                ],
            };
            this.mean = this.getMean();
        },
    };
</script>

<template>
    <div class="space-y-8">
        <Bar :data="chartData" :options="chartOptions" class="!h-96" />

        <p class="text-2xl font-semibold text-center">Mean: {{ this.mean }}</p>

        <div v-if="userState.userType === 'Admin'" class="space-y-4">
            <button
                @click="toggleDetails"
                class="block mx-auto py-2 px-4 bg-efrei-blue-500 font-semibold text-white rounded-md shadow-md hover:bg-efrei-blue-950 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
            >
                {{ showDetails ? "Close Details" : "View Details" }}
            </button>

            <TextAnswerComponent v-if="showDetails" :question="question" />
        </div>
    </div>
</template>

<style></style>
