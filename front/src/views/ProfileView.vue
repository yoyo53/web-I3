<script>
    import { useToast } from "vue-toastification";
    const toaster = useToast();

    export default {
        name: "ProfileView",
        inject: ["userState"],
        data() {
            return {
                user: {
                    firstname: "",
                    lastname: "",
                    email: "",
                    id: null,
                },
            };
        },
        methods: {
            async fetchUserData() {
                try {
                    const response = await fetch(import.meta.env.VITE_API_URL + "user/data", {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                    this.user = await response.json();
                } catch (error) {
                    console.error(error);
                    toaster.error("Something went wrong");
                }
            },
        },
        async beforeMount() {
            await this.fetchUserData();
        },
    };
</script>

<template>
    <div class="flex items-center justify-center">
        <section class="my-12">
            <h2 class="text-2xl font-semibold">Personal Information</h2>
            <p class="mt-1 text-sm/6 text-neutral-500">Basic info, like your name and email address</p>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-3">
                    <label for="first-name" class="block text-sm/6 font-medium">First name</label>
                    <div class="mt-2">
                        <input
                            disabled
                            type="text"
                            name="first-name"
                            id="first-name"
                            autocomplete="given-name"
                            :placeholder="user.firstname"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-sm/6 border border-neutral-300 placeholder-neutral-400 cursor-not-allowed"
                        />
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="last-name" class="block text-sm/6 font-medium">Last name</label>
                    <div class="mt-2">
                        <input
                            disabled
                            type="text"
                            name="last-name"
                            id="last-name"
                            autocomplete="family-name"
                            :placeholder="user.lastname"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-sm/6 border border-neutral-300 placeholder-neutral-400 cursor-not-allowed"
                        />
                    </div>
                </div>

                <div class="sm:col-span-4">
                    <label for="email" class="block text-sm/6 font-medium">Email address</label>
                    <div class="mt-2">
                        <input
                            disabled
                            id="email"
                            name="email"
                            type="email"
                            autocomplete="email"
                            :placeholder="user.email"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-sm/6 border border-neutral-300 placeholder-neutral-400 cursor-not-allowed"
                        />
                    </div>
                </div>

                <div v-if="userState.userType !== 'Admin'" class="sm:col-span-4">
                    <label v-if="userState.userType === 'Teacher'" for="user-id" class="block text-sm/6 font-medium"
                        >Teacher ID</label
                    >
                    <label v-else for="user-id" class="block text-sm/6 font-medium">Student ID</label>
                    <div class="mt-2">
                        <input
                            disabled
                            id="user-id"
                            name="user-id"
                            type="text"
                            autocomplete="off"
                            :placeholder="user.id"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-sm/6 border border-neutral-300 placeholder-neutral-400 cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style></style>
