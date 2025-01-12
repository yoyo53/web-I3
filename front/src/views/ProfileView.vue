<template>
    <div class="flex space-x-4">
        <SideBarComponent />
        <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base/7 font-semibold text-gray-900">Personal Information</h2>
            <p class="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-3">
                    <label for="first-name" class="block text-sm/6 font-medium text-gray-900">First name</label>
                    <div class="mt-2">
                        <input disabled type="text" name="first-name" id="first-name" autocomplete="given-name" :placeholder="user.firstName"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="last-name" class="block text-sm/6 font-medium text-gray-900">Last name</label>
                    <div class="mt-2">
                        <input disabled type="text" name="last-name" id="last-name" autocomplete="family-name" :placeholder="user.lastName"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                    </div>
                </div>

                <div class="sm:col-span-4">
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input disabled id="email" name="email" type="email" autocomplete="email" :placeholder="user.email"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                    </div>
                </div>

                <div v-if="userState.userType !== 'Admin'" class="sm:col-span-4">
                    <label v-if="userState.userType === 'Teacher'" for="teacher-id" class="block text-sm/6 font-medium text-gray-900">Teacher ID</label>
                    <label v-else-if="userState.userType === 'Student'" for="student-id" class="block text-sm/6 font-medium text-gray-900">Student ID</label>
                    <div class="mt-2">
                        <input disabled id="email" name="email" type="email" autocomplete="email" :placeholder="user.id"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import SideBarComponent from '@/components/sidebar/SideBarComponent.vue';

export default {
    data() {
        return {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                id: null
            }
        }
    },
    inject: ['userState'],
    name: 'ProfileView',
    components: {
        SideBarComponent
    },
    methods: {
        async fetchUserData() {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_API_URL}user/data`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            this.user = await response.json();
        }
    },
    async beforeMount() {
        await this.fetchUserData();
    }
}

</script>