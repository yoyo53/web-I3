<template>
    <div>
        <button
            @click="this.toggle"
            type="button"
            :class="this.show ? 'invisible' : 'visible'"
            class="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Settings"
        >
            <img src="@/assets/menu.svg" alt="Settings" class="h-6" />
        </button>
    </div>
    <div v-if="this.show" class="z-50 absolute top-0 start-0 h-dvh w-dvw"></div>
    <aside
        v-if="this.show"
        id="drawer-navigation"
        class="flex flex-col fixed top-0 start-0 z-50 w-64 h-dvh p-4 overflow-y-auto transition-transform bg-primary-hover"
        tabindex="-1"
        aria-labelledby="drawer-navigation-label"
    >
        <div id="drawer-navigation-label" class="flex text-base font-semibold uppercase text-neutral-400">
            <img src="@/assets/logo.svg" class="h-6 mr-3 sm:h-9" alt="TeachPoint Logo" />
            <h5 class="self-center">TeachPoint</h5>
        </div>
        <button
            @click="this.toggle"
            type="button"
            class="p-2.5 min-w-[40px] absolute top-2.5 end-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg hover:bg-primary focus:outline-none focus:bg-primary disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Close"
        >
            <img src="@/assets/close.svg" alt="Close" class="h-4" />
        </button>
        <div class="flex flex-col grow py-4 overflow-y-auto">
            <ul class="flex flex-col grow space-y-2 font-medium">
                <TabComponent :img="ProfileSVG" text="Profile" :to="{ name: 'profile' }" />
                <TabComponent :img="surveySVG" text="Surveys" :to="getSurveyRoute" />
                <TabComponent
                    v-if="userState.userType === 'Admin'"
                    :img="templateSVG"
                    text="Template"
                    :to="{ name: 'templates' }"
                />
                <TabComponent
                    :img="logoutSVG"
                    text="Logout"
                    :to="{ name: 'login' }"
                    textStyle="text-red-500 font-semibold"
                    class="!mt-auto"
                    :click="logout"
                />
            </ul>
        </div>
    </aside>
</template>

<script>
    import TabComponent from "@/components/sidebar/TabComponent.vue";
    import ProfileSVG from "@/assets/profile.svg";
    import surveySVG from "@/assets/survey.svg";
    import templateSVG from "@/assets/template.svg";
    import logoutSVG from "@/assets/logout.svg";

    export default {
        inject: ["userState"],
        name: "SideBarComponent",
        components: {
            TabComponent,
        },
        data() {
            return {
                show: false,
                ProfileSVG,
                surveySVG,
                templateSVG,
                logoutSVG,
            };
        },
        computed: {
            getSurveyRoute() {
                if (this.userState.userType === "Admin") {
                    return { name: "admin" };
                } else if (this.userState.userType === "Teacher") {
                    return { name: "teacher" };
                } else {
                    return { name: "teacher" };
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
