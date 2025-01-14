<template>
    <div class="flex flex-col gap-y-4 ml-4">
        <h1 class="text-2xl font-semibold text-gray-900">Templates</h1>
        <div v-if="templates.length === 0" class="text-gray-500 text-sm">
            No templates yet
        </div>
        <button
        @click="goToAddTemplate"
        class="w-full max-w-xs py-2 px-4 bg-gray-300 text-gray-800 rounded-sm transition-all duration-300 ease-in-out hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
        Add a Template
        </button>
        <TemplateListComponent :templates="templates" @removeTemplate="removeTemplate"/>
    </div>
</template>


<script>
    import TemplateListComponent from '@/components/templates/TemplateListComponent.vue';

    export default{
        data(){
            return {
                templates: [],
            };
        },
        components: {
            TemplateListComponent,
        },
        methods: {
            async fetchAllTemplates(){
                const response = await fetch(`${import.meta.env.VITE_API_URL}admin/templates`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                this.templates = await response.json();
                console.log(this.templates);
            },
            goToAddTemplate(){
                this.$router.push({ path: '/admin/templates/create' });
            },
            removeTemplate(templateID){
                this.templates = this.templates.filter(template => template.templateID !== templateID);
            }
        },
        beforeMount(){
            this.fetchAllTemplates();
            
        }
    }
</script>