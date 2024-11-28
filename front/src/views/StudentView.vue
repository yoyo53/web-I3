<template>
    <ul class="divide-y divide-gray-100">
        <li v-for="person in people" :key="person.email" class="flex justify-between gap-x-6 py-5">
            <div class="flex min-w-0 gap-x-4">
                <img class="size-12 flex-none rounded-full bg-gray-50" :src="person.imageUrl" alt="" />
                <div class="min-w-0 flex-auto">
                    <p class="text-sm/6 font-semibold text-gray-900">{{ person.name }}</p>
                    <p class="mt-1 truncate text-xs/5 text-gray-500">{{ person.email }}</p>
                </div>
            </div>
            <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p class="text-sm/6 text-gray-900">{{ person.role }}</p>
                <p v-if="person.lastSeen" class="mt-1 text-xs/5 text-gray-500">
                    Last seen <time :datetime="person.lastSeenDateTime">{{ person.lastSeen }}</time>
                </p>
                <div v-else class="mt-1 flex items-center gap-x-1.5">
                    <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div class="size-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p class="text-xs/5 text-gray-500">Online</p>
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup>

</script>