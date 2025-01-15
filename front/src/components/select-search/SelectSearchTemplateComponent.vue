<script>
    import SelectSearchComponent from "@/components/select-search/SelectSearchComponent.vue";
    import { useToast } from "vue-toastification";
    const toaster = useToast();

    export default {
        name: "SelectSearchTemplateComponent",
        data() {
            return {
                templates: [],
            };
        },
        components: {
            SelectSearchComponent,
        },
        methods: {
            async getAllTemplates() {
                try {
                    const response = await fetch(import.meta.env.VITE_API_URL + "admin/templates", {
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
            this.getAllTemplates();
        },
    };
</script>

<template>
    <SelectSearchComponent
        :options="templates"
        placeholder="Select a template"
        @option-selected="(option) => this.$emit('template-selected', option)"
    />
</template>

<script></script>
