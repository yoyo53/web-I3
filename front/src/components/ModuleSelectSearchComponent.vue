<script>
    import SelectSearchComponent from "@/components/SelectSearchComponent.vue";

    export default {
        name: "ModuleSelectSearchComponent",
        data() {
            return {
                modules: [],
            };
        },
        components: {
            SelectSearchComponent,
        },

        beforeMount() {
            this.getallModules();
        },
        methods: {
            async getallModules() {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}admin/modules`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                    const data = await response.json();
                    data.forEach((module) => {
                        module.name = `${module.subject} - ${module.group} - ${module.teacher_lastname}`;
                    });
                    this.modules = data;
                } catch (error) {
                    console.error(error);
                }
            },
        },
    };
</script>

<template>
    <SelectSearchComponent
        :options="modules"
        placeholder="Select a module"
        @option-selected="(option) => this.$emit('module-selected', option)"
    />
</template>

<script></script>
