<!-- This is the where we are : /admin/template/:id -->
<!-- id is the id of the template -->

<template>
    <!-- Survey Name -->
    <div v-if="!template" class="mb-6">
        <p class="text-2xl font-semibold text-[primary] mb-4 p-6 w-full max-w-3xl">Loading template details...</p>
    </div>
    <div v-else class="mb-6">
        <h1 class="text-2xl font-semibold text-[primary] mb-4 p-6 w-full max-w-3xl">{{ template.name }}</h1>
        <!-- Dynamic Questions -->
        <div v-for="(question, index) in template.questions" :key="index"
            class="mb-4 p-4 border-2 border-dashed border-transparent-hover rounded-lg">
            <label class="block text-sm font-medium text-gray-700 mb-2">Question {{ index + 1 }}</label>
            <input type="text" v-model="question.question_text" disabled
                class="block w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2 font-semibold"/>
            <label class="block text-sm font-medium text-gray-700 mb-2">Response Type</label>
            <select v-model="question.question_type" disabled
                class="block w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100">
                <option value="text">Text Input</option>
                <option value="score">Star Rating (1-5)</option>
                <option value="radio">Radio Buttons</option>
                <option value="checkbox">Checkbox</option>
            </select>

            <RadioButton v-if="question.question_type === 'radio'" :question="question"
                :isEditable="false"/>

            <CheckBox v-if="question.question_type === 'checkbox'" :question="question"
                :isEditable="false" />
        </div>
    </div>

</template>


<script>
import RadioButton from '@/components/TypesAnswers/RadioButton.vue';
import CheckBox from '@/components/TypesAnswers/CheckBox.vue';

export default {
    components: {
        RadioButton,
        CheckBox,
    },
    name: 'DetailedSurveysComponent',
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            template: null,
        };
    },

    async mounted() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}admin/templates/${this.id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            this.template = await response.json();
            console.log(this.template);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    },

};
</script>