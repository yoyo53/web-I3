<template>
    <div class="flex flex-col gap-y-4">
        <h1 class="text-2xl font-semibold text-gray-900">Templates</h1>
        <div v-if="templates.length === 0" class="text-gray-500 text-sm">
            No templates yet
        </div>
        <TemplateListComponent :templates="templates"/>
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
                console.log('Fetching templates');
                const response = await fetch('http://localhost:3000/admin/templates');
                this.templates = await response.json();
                console.log(this.templates);
            }
        },
        beforeMount(){
            this.fetchAllTemplates();
            
        }
    }
</script>