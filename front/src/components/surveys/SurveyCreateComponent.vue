<script>
    import RadioAnswerComponent from "@/components/answers/RadioAnswerComponent.vue";
    import CheckboxAnswerComponent from "@/components/answers/CheckboxAnswerComponent.vue";
    import SelectSearchTemplateComponent from "@/components/select-search/SelectSearchTemplateComponent.vue";
    import SelectSearchModuleComponent from "@/components/select-search/SelectSearchModuleComponent.vue";
    import { useToast } from "vue-toastification";
    const toaster = useToast();

    export default {
        name: "SurveyCreateComponent",
        data() {
            return {
                editable: false,
                templateID: null,
                moduleID: null,
                templateName: "",
                templateQuestions: [],
                questions: [],
            };
        },
        components: {
            RadioAnswerComponent,
            CheckboxAnswerComponent,
            SelectSearchModuleComponent,
            SelectSearchTemplateComponent,
        },
        methods: {
            modifyForm() {
                this.editable = !this.editable;
            },
            addQuestion() {
                this.questions.push({ question_text: "", question_type: "text", options: [] });
            },
            removeQuestion(index) {
                this.questions.splice(index, 1);
            },
            updateOptions(question, options) {
                question.options = options;
            },
            handleTemplateSelected(template) {
                this.editable = false;
                this.templateID = template.templateID;
                this.getTemplate(template.templateID);
            },
            handleModuleSelected(module) {
                this.moduleID = module.moduleID;
            },
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

                    const data = await response.json();
                    this.questions = data.questions;
                    this.templateQuestions = JSON.parse(JSON.stringify(data.questions));
                } catch (error) {
                    console.error(error);
                    toaster.error("Something went wrong");
                }
            },
            async postSurvey() {
                try {
                    if (JSON.stringify(this.templateQuestions) === JSON.stringify(this.questions)) {
                        const response = await fetch(import.meta.env.VITE_API_URL + "admin/surveys/create", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                            body: JSON.stringify({
                                templateID: this.templateID,
                                moduleID: this.moduleID,
                            }),
                        });

                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }

                        toaster.success("Survey created successfully");
                        this.$router.push({ name: "admin" });
                    } else {
                        const response = await fetch(import.meta.env.VITE_API_URL + "admin/surveys/create/custom", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                            body: JSON.stringify({
                                name: this.templateName,
                                questions: this.questions,
                                moduleID: this.moduleID,
                            }),
                        });

                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }

                        toaster.success("Survey created successfully");
                        this.$router.push({ name: "admin" });
                    }
                } catch (error) {
                    console.error(error);
                    toaster.error("Something went wrong");
                }
            },
        },
    };
</script>

<template>
    <div class="p-6 max-w-3xl rounded-lg shadow-md mx-auto">
        <form @submit.prevent="postSurvey">
            <div class="mb-6">
                <div class="flex flex-wrap justify-between items-center gap-4">
                    <SelectSearchTemplateComponent class="grow" @template-selected="handleTemplateSelected" />
                    <SelectSearchModuleComponent class="grow" @module-selected="handleModuleSelected" />
                    <button
                        v-if="templateID"
                        type="button"
                        @click="modifyForm"
                        class="grow py-2 px-4 bg-efrei-blue-500 font-semibold text-white rounded-md shadow-md hover:bg-efrei-blue-950 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
                    >
                        {{ editable ? "Cancel" : "Edit Form" }}
                    </button>
                </div>
                <div v-if="editable">
                    <label for="template-name" class="block mb-2 text-sm"> Template Name </label>
                    <input
                        type="text"
                        id="template-name"
                        v-model="templateName"
                        required
                        class="block w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
                        placeholder="Enter template name"
                    />
                </div>
            </div>
            <div
                v-for="(question, index) in questions"
                :key="index"
                class="mb-4 p-4 border-2 border-dashed border-neutral-200 rounded-lg"
            >
                <div class="flex text-sm justify-between items-center mb-2">
                    <label class="block">Question {{ index + 1 }}</label>
                    <button
                        v-if="editable"
                        type="button"
                        @click="removeQuestion(index)"
                        class="text-red-400 hover:text-red-500 font-semibold rounded-lg focus:outline-none focus:ring-offset-4 focus:ring-2 focus:ring-red-700"
                    >
                        Remove
                    </button>
                </div>

                <input
                    type="text"
                    v-model="question.question_text"
                    :disabled="!editable"
                    required
                    class="block w-full mb-2 px-4 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
                    placeholder="Enter question"
                />

                <label class="block text-sm mb-2">Response Type</label>
                <select
                    v-model="question.question_type"
                    :disabled="!editable"
                    required
                    class="block w-full px-4 py-2 bg-transparent border border-neutral-300 rounded-md focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700 disabled:bg-neutral-100"
                >
                    <option value="text">Text Input</option>
                    <option value="score">Star Rating (1-5)</option>
                    <option value="radio">Radio Buttons</option>
                    <option value="checkbox">Checkbox</option>
                </select>

                <RadioAnswerComponent
                    v-if="question.question_type === 'radio'"
                    :question="question"
                    :editable="editable"
                    :answerable="false"
                    @update-options="updateOptions"
                    class="my-4"
                />

                <CheckboxAnswerComponent
                    v-if="question.question_type === 'checkbox'"
                    :question="question"
                    :editable="editable"
                    :answerable="false"
                    @update-options="updateOptions"
                    class="my-4"
                />
            </div>

            <button
                v-if="editable"
                type="button"
                @click="addQuestion"
                class="w-full py-2 px-4 bg-efrei-blue-500 font-semibold text-white rounded-md shadow-md hover:bg-efrei-blue-950 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
            >
                Add Question
            </button>

            <button
                type="submit"
                class="mt-4 w-full py-2 px-4 bg-efrei-blue-100 font-semibold rounded-md hover:bg-efrei-blue-200 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
            >
                Publish Survey
            </button>
        </form>
    </div>
</template>

<style></style>
