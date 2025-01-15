<script>
    import { useToast } from "vue-toastification";
    const toaster = useToast();

    export default {
        name: "LoginView",
        data() {
            return {
                email: "",
                password: "",
            };
        },
        methods: {
            async login() {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: this.email,
                            password: this.password,
                        }),
                    });

                    if (response.status === 400) {
                        toaster.error("Incorrect email or password");
                    } else if (!response.ok) {
                        throw new Error(response.statusText);
                    } else {
                        const data = await response.json();
                        localStorage.setItem("token", data.token);
                        toaster.success("Login successful");
                        if (data.type === "Admin") {
                            this.$router.push({ name: "admin" });
                        } else if (data.type === "Teacher") {
                            this.$router.push({ name: "teacher" });
                        } else {
                            this.$router.push({ name: "student" });
                        }
                    }
                } catch (error) {
                    console.error(error);
                    toaster.error("Something went wrong");
                }
            },
            forgotPassword() {
                toaster.info("That's sad 😭");
            },
        },
    };
</script>

<template>
    <div class="flex flex-col justify-center">
        <section>
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto h-20 w-auto" src="@/assets/icons/logo.svg" alt="TeachPoint Logo" />
                <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight">Sign in to your account</h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" @submit.prevent="login">
                    <div>
                        <label for="email" class="block text-sm/6 font-medium">Email address</label>
                        <div class="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                v-model="email"
                                autocomplete="email"
                                placeholder="john.doe@email.com"
                                required
                                class="block w-full rounded-md px-3 py-1.5 shadow-sm border border-gray-300 sm:text-sm/6 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700 placeholder-neutral-400"
                            />
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm/6 font-medium">Password</label>
                            <div class="text-sm">
                                <button
                                    type="button"
                                    @click.prevent="forgotPassword"
                                    class="font-semibold rounded-md focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
                                >
                                    Forgot password?
                                </button>
                            </div>
                        </div>
                        <div class="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                v-model="password"
                                autocomplete="current-password"
                                placeholder="********"
                                required
                                class="block w-full rounded-md px-3 py-1.5 shadow-sm border border-gray-300 sm:text-sm/6 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700 placeholder-neutral-400"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            class="w-full rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm bg-efrei-blue-500 hover:bg-efrei-blue-950 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>

<style></style>
