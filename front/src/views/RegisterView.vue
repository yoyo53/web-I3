<script>
    import { useToast } from "vue-toastification";
    const toaster = useToast();

    export default {
        name: "CreateUserView",
        data() {
            return {
                email: "",
                firstName: "",
                lastName: "",
                accountNumber: "",
                accountType: "Student",
            };
        },
        methods: {
            async registerUser() {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}auth/register`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify({
                            email: this.email,
                            firstName: this.firstName,
                            lastName: this.lastName,
                            accountNumber: this.accountNumber,
                            accountType: this.accountType,
                        }),
                    });

                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }

                    toaster.success("Account created successfully");
                } catch (error) {
                    console.error(error);
                    toaster.error("Something went wrong");
                }
            },
            toggleAccountType() {
                this.accountType = this.accountType === "Student" ? "Teacher" : "Student";
            },
            validateAccountNumber() {
                this.accountNumber = this.accountNumber.replace(/\D/g, "");
            },
        },
    };
</script>

<template>
    <div class="flex flex-col justify-center">
        <section class="mx-auto w-full my-8 p-6 md:max-w-md">
            <form class="space-y-4 md:space-y-6" @submit.prevent="registerUser">
                <h1 class="text-center text-2xl/9 font-bold tracking-tight">Create an account</h1>
                <div>
                    <label for="email" class="block text-sm/6 font-medium">Email</label>
                    <input
                        type="email"
                        id="email"
                        v-model="email"
                        autocomplete="email"
                        placeholder="john.doe@email.com"
                        class="block w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700 placeholder-neutral-400"
                        required
                    />
                </div>
                <div>
                    <label for="first-name" class="block text-sm/6 font-medium">First Name</label>
                    <input
                        type="text"
                        id="first-name"
                        v-model="firstName"
                        autocomplete="given-name"
                        placeholder="John"
                        class="block w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700 placeholder-neutral-400"
                        required
                    />
                </div>
                <div>
                    <label for="last-name" class="block text-sm/6 font-medium">Last Name</label>
                    <input
                        type="text"
                        id="last-name"
                        v-model="lastName"
                        autocomplete="last-name"
                        placeholder="Doe"
                        class="block w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700 placeholder-neutral-400"
                        required
                    />
                </div>
                <div>
                    <label for="user-id" class="block text-sm/6 font-medium">{{ this.accountType }} Number</label>
                    <input
                        type="text"
                        id="user-id"
                        v-model="accountNumber"
                        @input="validateAccountNumber"
                        placeholder="123456"
                        class="block w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700 placeholder-neutral-400"
                        required
                    />
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-sm font-medium">Account Type</span>
                    <div class="flex p-0.5">
                        <div class="grow relative py-2 px-3">
                            <input
                                id="account-type-teacher"
                                name="account-type"
                                type="radio"
                                class="absolute top-0 end-0 size-full cursor-pointer before:absolute before:size-full before:rounded-lg before:bg-white checked:before:bg-efrei-blue-200"
                                :checked="accountType === 'Teacher'"
                                @click="toggleAccountType"
                            />
                            <label for="account-type-teacher" class="min-w-8 size-full relative text-sm cursor-pointer"
                                >Teacher</label
                            >
                        </div>
                        <div class="grow relative py-2 px-3">
                            <input
                                id="account-type-student"
                                name="account-type"
                                type="radio"
                                class="absolute top-0 end-0 size-full cursor-pointer before:absolute before:size-full before:rounded-lg before:bg-white checked:before:bg-efrei-blue-200"
                                :checked="accountType === 'Student'"
                                @click="toggleAccountType"
                            />
                            <label for="account-type-student" class="min-w-8 size-full relative text-sm">Student</label>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    class="w-full rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm bg-efrei-blue-500 hover:bg-efrei-blue-950 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
                >
                    Create an account
                </button>
            </form>
        </section>
    </div>
</template>

<style></style>
