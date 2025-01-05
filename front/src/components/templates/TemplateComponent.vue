<template>
    <div class="flex min-w-0 gap-x-4">
        <div class="min-w-0 flex-auto">
            <p class="text-sm/6 font-semibold text-gray-900">
                {{ template.survey_templateID }} 
                {{ template.name }}
            </p>
        </div>
    </div>
    
</template>

<script>

    export default {
        props: {
            template: {
                type: Object,
                required: true,
            },
        },
    };
</script>
