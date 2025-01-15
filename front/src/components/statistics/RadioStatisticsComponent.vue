<script>
    import { Pie } from "vue-chartjs";
    import { Chart, ArcElement, Legend } from "chart.js";
    import TextStatisticsComponent from "@/components/statistics/TextStatisticsComponent.vue";

    Chart.register(ArcElement, Legend);

    export default {
        name: "RadioStatisticsComponent",
        inject: ["userState"],
        props: {
            question: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                chartData: {},
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                },
                showDetails: false,
            };
        },
        components: {
            Pie,
            TextStatisticsComponent,
        },
        methods: {
            countAnswers() {
                return this.question.answers.reduce((count, { answer_text }) => {
                    let index = this.question.options.findIndex(({ option_text }) => option_text === answer_text);
                    count[index] = (count[index] ?? 0) + 1;
                    return count;
                }, []);
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
                labels: this.question.options.map((label) => label.option_text),
                datasets: [
                    {
                        data: this.countAnswers(),
                        borderWidth: 1,
                        backgroundColor: this.question.options.map(this.randomColor),
                    },
                ],
            };
        },
    };
</script>

<template>
    <div class="space-y-8">
        <Pie :data="chartData" :options="chartOptions" class="!h-96" />

        <div v-if="userState.userType === 'Admin'" class="space-y-4">
            <button
                @click="toggleDetails"
                class="block mx-auto py-2 px-4 bg-efrei-blue-500 font-semibold text-white rounded-md shadow-md hover:bg-efrei-blue-950 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
            >
                {{ showDetails ? "Close Details" : "View Details" }}
            </button>

            <TextStatisticsComponent v-if="showDetails" :question="question" />
        </div>
    </div>
</template>

<style></style>
