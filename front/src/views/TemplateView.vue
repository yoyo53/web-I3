<script>
    import TemplateListComponent from '@/components/templates/TemplateListComponent.vue';
    import { useToast } from "vue-toastification";
    const toaster = useToast();

    export default {
        name: "TemplatesListView",
        inject: ["userState"],
        data() {
            return {
                templates: [],
            };
        },
        components: {
            TemplateListComponent,
        },
        methods: {
            async fetchAllTemplates() {
                try {
                    const response = await fetch(import.meta.env.VITE_API_URL + 'admin/templates', {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }

                    this.templates = await response.json();
                } catch (error) {
                    console.error(error);
                    toaster.error("Something went wrong");
                }
            },
        },

        beforeMount() {
            this.fetchAllTemplates();
        },
    };
</script>

<template>
    <div>
        <section class="my-12">
            <h1 class="my-6 text-3xl font-semibold text-center">Templates</h1>
            <RouterLink
                :to="{ name: 'createTemplate' }"
                class="block w-full max-w-7xl mx-auto rounded-md text-center my-4 px-4 py-2 text-sm/6 font-semibold text-white shadow-sm bg-efrei-blue-500 hover:bg-efrei-blue-950 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
                >
                Create a Template
            </RouterLink>
            <div v-if="templates.length === 0" class="text-gray-500 text-sm text-center">No templates yet</div>
            <TemplateListComponent v-else class="max-w-7xl mx-auto" :templates="templates" @removeTemplate="fetchAllTemplates" />
        </section>
    </div>
</template>

<style></style>
