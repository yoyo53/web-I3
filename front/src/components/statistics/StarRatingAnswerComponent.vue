<template>
    
    <div>
        <Bar :data="chartData" :options="chartOptions" class="!h-96"/>
        <div class="flex justify-center items-center mt-4">
            <p class="font-bold text-3xl text-center">Mean: {{ mean }}</p>
        </div>
    </div>

</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
    data() {
        return {
            mean: 0,
            chartData: {},
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,

            },
        };
    },
    components: {
        Bar,
    },
    props: {
        question: {
            type: Object,
            required: true
        }
    },
    methods: {
        countAnswers(){
            let count = {};
            this.question.answers.forEach((answer) => {
                if(count[answer.answer_text] === undefined){
                    count[answer.answer_text] = 1;
                }else{
                    count[answer.answer_text]++;
                }
            });
            return count;
        },
        getMean(){
            let sum = 0;
            this.question.answers.forEach((answer) => {
                sum += parseInt(answer.answer_text);
            });
            return sum / this.question.answers.length;
        }
    },
    beforeMount(){
        let count = this.countAnswers();
        this.chartData = {
            labels: [1,2,3,4,5],
            datasets: [
                {
                    maxBarThickness: 80,
                    minBarLength: 2,
                    label: 'Answers',
                    data: [1,2,3,4,5].map((label) => count[label]),
                    backgroundColor: [1,2,3,4,5].map(_ => "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")),
                    borderWidth: 1,
                },
            ],
        };
        this.mean = this.getMean();
    }
};

</script>