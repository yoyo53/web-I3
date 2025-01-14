<template>
    <div class="space-y-8"> 
      <div>
        <Bar :data="chartData" :options="chartOptions" class="!h-96" />
      </div>
      <div v-if="userState.userType === 'Admin'" class="flex flex-col items-center">
        <div class="w-48 flex justify-center">
            <button
                @click="toggleDetails"
                class="w-36 text-white bg-primary-hover hover:bg-primary-hover focus:ring-4 focus:ring-primary-hover font-medium rounded-lg text-sm px-4 py-2 mr-2 focus:outline-none"
            >
                {{ showDetails ? 'Close Details' : 'View Details' }}
            </button>
        </div>
  
        <div v-if="showDetails" class="mt-8 w-full max-w-3xl mx-auto">
          <TextAnswerComponent :question="question" />
        </div>
      </div>
    </div>
  </template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import TextAnswerComponent from '@/components/statistics/TextAnswerComponent.vue';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
    data() {
        return {
            mean: 0,
            chartData: {},
            showDetails: false,
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            },
        };
    },
    inject: ['userState'],
    components: {
        Bar,
        TextAnswerComponent,
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
        },
        toggleDetails(){
            this.showDetails = !this.showDetails;
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