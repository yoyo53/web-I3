<script>
    export default {
        name: "SideBarComponent",
        inject: ["userState"],
        data() {
            return {
                show: false,
            };
        },
        computed: {
            getSurveyRoute() {
                if (this.userState.userType === "Admin") {
                    return { name: "admin" };
                } else if (this.userState.userType === "Teacher") {
                    return { name: "teacher" };
                } else {
                    return { name: "student" };
                }
            },
        },
        methods: {
            logout() {
                localStorage.removeItem("token");
            },
            toggle() {
                this.show = !this.show;
            },
        },
    };
</script>

<template>
    <div>
        <button
            @click="this.toggle"
            type="button"
            :class="this.show ? 'invisible' : 'visible'"
            class="p-2.5 rounded-full hover:bg-efrei-blue-50 focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-efrei-blue-700"
        >
            <img src="@/assets/menu.svg" alt="Settings" class="size-6" />
        </button>
        <div v-if="this.show" class="z-50 absolute top-0 start-0 h-dvh w-dvw"></div>
        <aside
            v-if="this.show"
            id="drawer-navigation"
            class="flex flex-col fixed top-0 start-0 z-50 w-64 h-dvh p-4 bg-efrei-blue-800"
        >
            <div class="flex items-center text-base font-semibold uppercase text-neutral-400">
                <img src="@/assets/logo.svg" class="h-9" alt="TeachPoint Logo" />
                <h5 class="ml-1">TeachPoint</h5>
            </div>
            <button
                @click="this.toggle"
                type="button"
                class="absolute top-2.5 end-2.5 p-2.5 rounded-lg hover:bg-efrei-blue-700 focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-efrei-blue-500"
            >
                <img src="@/assets/close.svg" alt="Close" class="size-4" />
            </button>
            <ul class="flex flex-col grow py-4 space-y-2 font-medium">
                <li>
                    <RouterLink
                        :to="{ name: 'profile' }"
                        class="flex items-center p-2 rounded-lg hover:bg-efrei-blue-700 focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-efrei-blue-500"
                    >
                        <img src="@/assets/profile.svg" class="size-7" />
                        <span class="ms-3 text-lg text-white">Profile</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink
                        :to="getSurveyRoute"
                        class="flex items-center p-2 rounded-lg hover:bg-efrei-blue-700 focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-efrei-blue-500"
                    >
                        <img src="@/assets/survey.svg" class="size-7" />
                        <span class="ms-3 text-lg text-white">Surveys</span>
                    </RouterLink>
                </li>
                <li v-if="userState.userType === 'Admin'">
                    <RouterLink
                        :to="{ name: 'templates' }"
                        class="flex items-center p-2 rounded-lg hover:bg-efrei-blue-700 focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-efrei-blue-500"
                    >
                        <img src="@/assets/template.svg" class="size-7" />
                        <span class="ms-3 text-lg text-white">Template</span>
                    </RouterLink>
                </li>
                <li class="!mt-auto">
                    <RouterLink
                        @click="this.logout"
                        :to="{ name: 'login' }"
                        class="flex items-center p-2 rounded-lg hover:bg-efrei-blue-700 focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-efrei-blue-500"
                    >
                        <img src="@/assets/logout.svg" class="size-7" />
                        <span class="ms-3 text-lg text-red-500 font-semibold">Logout</span>
                    </RouterLink>
                </li>
            </ul>
        </aside>
    </div>
</template>

<style></style>
