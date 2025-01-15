<script>
    import PopupComponent from "@/components/popup/PopupComponent.vue";
    import { useToast } from "vue-toastification";
    const toaster = useToast();

    export default {
        name: "TemplatesListComponent",
        props: {
            templates: {
                type: Array,
                required: true,
            },
        },
        data() {
            return {
                showPopup: false,
                selectedTemplate: null,
            };
        },
        components: {
            PopupComponent,
        },
        methods: {
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

                    this.$emit("removeTemplate");
                    toaster.success("Template deleted successfully");
                } catch (error) {
                    console.error(error);
                    toaster.error("Something went wrong");
                }
            },
            openModal(template) {
                this.selectedTemplate = template;
                this.showPopup = true;
            },
            closeModal() {
                this.showPopup = false;
            },
        },
    };
</script>

<template>
    <div>
        <ul class="space-y-4">
            <li v-for="(template, index) in templates" :key="index">
                <RouterLink
                    :to="{ name: 'adminTemplateView', params: { id: template.survey_templateID } }"
                    class="p-4 block border border-neutral-300 rounded-lg bg-neutral-50 cursor-pointer transition-transform duration-200 ease-in-out hover:bg-neutral-100 hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
                >
                    <button
                        type="button"
                        @click.prevent="openModal(template)"
                        class="text-red-400 hover:text-red-500 font-semibold rounded-lg focus:outline-none focus:ring-offset-4 focus:ring-2 focus:ring-red-700"
                    >
                        Remove
                    </button>
                    <div class="flex min-w-0 gap-x-4">
                        <div class="min-w-0 flex-auto">
                            <p class="text-sm/6 font-semibold">
                                {{ template.survey_templateID }}
                                {{ template.name }}
                            </p>
                        </div>
                    </div>
                </RouterLink>
            </li>
        </ul>
        <PopupComponent
            :isOpen="showPopup"
            popUpText="Are you sure you want to delete this template ? This will also delete all associated surveys and answers"
            @close-modal="closeModal"
            @confirm-action="deleteTemplate(selectedTemplate.survey_templateID)"
        />
    </div>
</template>

<style></style>
