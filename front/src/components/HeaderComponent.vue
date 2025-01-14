<script>
    import SideBarComponent from "./sidebar/SideBarComponent.vue";

    export default {
        name: "HeaderComponent",
        inject: ["userState"],
        components: {
            SideBarComponent,
        },
        computed: {
            getDashboardRoute() {
                if (this.userState.userType === "Admin") {
                    return { name: "admin" };
                } else if (this.userState.userType === "Teacher") {
                    return { name: "teacher" };
                } else {
                    return { name: "student" };
                }
            },
        },
    };
</script>

<template>
    <header>
        <nav class="flex items-center px-4 py-2.5">
            <SideBarComponent v-if="userState.userType !== null" />
            <RouterLink
                :to="{ name: 'home' }"
                class="flex items-center ml-2 rounded-lg focus:outline-none focus:ring-offset-4 focus:ring-2 focus:ring-efrei-blue-700"
            >
                <img src="@/assets/logo.svg" class="h-9" alt="TeachPoint Logo" />
                <span class="ml-1 text-xl font-semibold">TeachPoint</span>
            </RouterLink>
            <RouterLink
                v-if="userState.userType !== null"
                :to="getDashboardRoute"
                class="text-base font-medium ml-auto px-4 py-2 rounded-lg text-white bg-efrei-blue-500 hover:bg-efrei-blue-950 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
            >
                Dashboard
            </RouterLink>
            <RouterLink
                v-else
                :to="{ name: 'login' }"
                class="text-base font-medium ml-auto px-4 py-2 rounded-lg text-white bg-efrei-blue-500 hover:bg-efrei-blue-950 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
            >
                Log in
            </RouterLink>
        </nav>
    </header>
</template>

<style></style>
