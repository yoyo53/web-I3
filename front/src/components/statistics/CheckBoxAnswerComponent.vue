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
  
  Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  
  export default {
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
    inject: ['userState'],
    components: {
      Bar,
      TextAnswerComponent,
    },
    props: {
      question: {
        type: Object,
        required: true,
      },
    },
    methods: {
      countAnswers() {
        let count = {};
        this.question.answers.forEach((answer) => {
          if (count[answer.answer_text] === undefined) {
            count[answer.answer_text] = 1;
          } else {
            count[answer.answer_text]++;
          }
        });
        return count;
      },
      toggleDetails() {
        this.showDetails = !this.showDetails;
      },
    },
    beforeMount() {
      let count = this.countAnswers();
      this.chartData = {
        labels: this.question.options.map((label) => label.option_text),
        datasets: [
          {
            maxBarThickness: 80,
            minBarLength: 2,
            label: 'Answers',
            data: this.question.options.map((label) => count[label.option_text]),
            backgroundColor: this.question.options.map(
              (_) =>
                '#' +
                ((1 << 24) * Math.random() | 0)
                  .toString(16)
                  .padStart(6, '0')
            ),
            borderWidth: 1,
          },
        ],
      };
    },
  };
  </script>
  