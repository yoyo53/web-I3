<script>
    import SelectSearchComponent from "@/components/SelectSearchComponent.vue";

    export default {
        name: "TemplateSelectSearchComponent",
        data() {
            return {
                templates: [],
            };
        },
        components: {
            SelectSearchComponent,
        },

        beforeMount() {
            this.getAllTemplates();
        },
        methods: {
            async getAllTemplates() {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}admin/templates`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                    const data = await response.json();
                    this.templates = data;
                } catch (error) {
                    console.error(error);
                }
            },
        },
    };
</script>

<template>
    <SelectSearchComponent
        :options="templates"
        placeholder="Sélectionner un template"
        @option-selected="(option) => this.$emit('template-selected', option)"
    />
</template>

<script></script>
