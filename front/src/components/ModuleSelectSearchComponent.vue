<script>
    import SelectSearchComponent from "@/components/SelectSearchComponent.vue";
    import { useToast } from "vue-toastification";
    const toaster = useToast();

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
        methods: {
            async getallModules() {
                try {
                    const response = await fetch(import.meta.env.VITE_API_URL + 'admin/modules', {
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
                    data.forEach((module) => {
                        module.name = `${module.subject} - ${module.group} - ${module.teacher_lastname}`;
                    });
                    this.modules = data;
                } catch (error) {
                    console.error(error);
                    toaster.error("Something went wrong");
                }
            },
        },
        beforeMount() {
            this.getallModules();
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
