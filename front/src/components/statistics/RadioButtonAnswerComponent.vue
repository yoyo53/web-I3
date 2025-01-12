<template>
    <div>
        <Pie :data="chartData" :options="chartOptions" />
    </div>

</template>

<script>
import { Pie } from 'vue-chartjs';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

export default {
    data() {
        return {
            chartData: {},
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
            },
        };
    },
    components: {
        Pie,
    },
    props: {
        answers: {
            type: Array,
            required: true
        }
    },
    methods: {
        countAnswers(){
            let count = {};
            this.answers.forEach((answer) => {
                if(count[answer.answer_text] === undefined){
                    count[answer.answer_text] = 1;
                }else{
                    count[answer.answer_text]++;
                }
            });
            return count;
        },
        getLabels(){
            let labels = this.answers.map((answer) => answer.answer_text);
            labels = [...new Set(labels)];
            return labels;
        }
    },
    beforeMount(){
        let labels = this.getLabels();
        console.log(labels);
        let count = this.countAnswers();
        console.log(count);
        this.chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Answers',
                    data: labels.map((label) => count[label]),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
        console.log(this.chartData);
    }
};

</script>