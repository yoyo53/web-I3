<script>
    import RadioButton from "@/components/TypesAnswers/RadioButton.vue";
    import CheckBox from "@/components/TypesAnswers/CheckBox.vue";
    import { useToast } from "vue-toastification";
    const toaster = useToast();

    export default {
        name: "TemplateView",
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
        components: {
            RadioButton,
            CheckBox,
        },
        methods: {
            async getTemplate(templateID) {
                try {
                    const response = await fetch(import.meta.env.VITE_API_URL + "admin/templates/" + templateID, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }

                    this.template = await response.json();
                } catch (error) {
                    console.error(error);
                    toaster.error("Something went wrong");
                }
            },
            async deleteTemplate(templateID) {
                try {
                    const response = await fetch(import.meta.env.VITE_API_URL + "admin/template/" + templateID, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }

                    toaster.success("Template deleted successfully");
                    this.$router.push({ name: "templates" });
                } catch (error) {
                    console.error(error);
                    toaster.error("Something went wrong");
                }
            },
        },
        async beforeMount() {
            this.getTemplate(this.id);
        },
    };
</script>

<template>
    <div class="flex justify-center items-center">
        <section v-if="!template">
            <p class="text-2xl font-semibold">Loading template details...</p>
        </section>
        <section v-else class="w-full max-w-7xl mx-auto">
            <h1 class="mb-4 text-2xl font-semibold text-center">{{ template.name }}</h1>
            <div
                v-for="(question, index) in template.questions"
                :key="index"
                class="mb-4 p-4 border-2 border-dashed border-neutral-200 rounded-lg"
            >
                <label class="block mb-2 text-sm">Question {{ index + 1 }}</label>
                <input
                    type="text"
                    v-model="question.question_text"
                    disabled
                    class="block w-full mb-2 px-4 py-2 border border-neutral-300 rounded-md"
                />
                <label class="mb-2 block text-sm">Response Type</label>
                <select
                    v-model="question.question_type"
                    disabled
                    class="block w-full px-4 py-2 bg-transparent border border-neutral-300 rounded-md focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700 disabled:bg-neutral-100"
                >
                    <option value="text">Text Input</option>
                    <option value="score">Star Rating (1-5)</option>
                    <option value="radio">Radio Buttons</option>
                    <option value="checkbox">Checkbox</option>
                </select>

                <RadioButton
                    v-if="question.question_type === 'radio'"
                    :question="question"
                    :editable="false"
                    :answerable="false"
                    class="my-4"
                />

                <CheckBox
                    v-if="question.question_type === 'checkbox'"
                    :question="question"
                    :editable="false"
                    :answerable="false"
                    class="my-4"
                />
            </div>

            <div class="flex justify-center mt-4">
                <button
                    @click="deleteTemplate(id)"
                    class="block py-2.5 px-6 text-sm rounded-lg bg-red-50 text-red-500 cursor-pointer font-semibold text-center hover:bg-red-100 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-red-700"
                >
                    Delete Template
                </button>
            </div>
        </section>
    </div>
</template>

<style></style>
