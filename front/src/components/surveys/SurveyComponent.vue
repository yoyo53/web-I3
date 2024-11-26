<template>
    <div class="flex min-w-0 gap-x-4">
        <div class="min-w-0 flex-auto">
            <p class="text-sm/6 font-semibold text-gray-900">
                {{ survey.firstname }} {{ survey.lastname }}
            </p>
            <p class="mt-1 truncate text-xs/5 text-gray-500">
                Subject: {{ survey.subject }}
            </p>
        </div>
    </div>
    <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p class="text-sm/6 text-gray-900">Group</p>
        <p class="mt-1 text-xs/5 text-gray-500">{{ survey.group }}</p>
    </div>
</template>
<script>
export default {
    props: {
        survey: {
            type: Object,
            required: true,
        },
    },
};
</script>
