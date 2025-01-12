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
    },
    beforeMount(){
        let count = this.countAnswers();
        this.chartData = {
            labels: this.question.options.map((label) => label.option_text),
            datasets: [
                {
                    label: 'Answers',
                    data: this.question.options.map((label) => count[label.option_text]),
                    backgroundColor: this.question.options.map(_ => "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")),
                    borderWidth: 1,
                },
            ],
        };
    }
};

</script>