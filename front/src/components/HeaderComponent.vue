<template>
    <header>
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
            <div class="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
                <RouterLink :to="{ name: 'home' }" class="flex items-center">
                    <img src="@/assets/logo.svg" class="h-6 mr-3 sm:h-9" alt="TeachPoint Logo" />
                    <span class="self-center text-xl font-semibold whitespace-nowrap">TeachPoint</span>
                </RouterLink>
                <div class="flex items-center lg:order-2">
                    <RouterLink
                        :to="{ name: 'login' }"
                        class="text-white bg-primary-hover hover:bg-primary-hover focus:ring-4 focus:ring-primary-hover font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 :bg-primary-hover focus:outline-none :ring-primary-hover"
                    >
                        {{ loggedIn ? "Dashboard" : "Log in" }}
                    </RouterLink>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
    export default {
        name: "HeaderComponent",
        inject: ["userState"],
        data() {
            return {
                loggedIn: localStorage.getItem("token") !== null,
            };
        }
    };
</script>
