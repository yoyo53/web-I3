<template>
    <header>
        <nav class="bg-white border-gray-200 px-4 py-2.5">
            <div class="flex flex-wrap items-center mx-auto">
                <SideBarComponent v-if="userState.userType !== null" />
                <RouterLink :to="{ name: 'home' }" class="flex items-center">
                    <img src="@/assets/logo.svg" class="h-6 mr-3 sm:h-9" alt="TeachPoint Logo" />
                    <span class="self-center text-xl font-semibold whitespace-nowrap">TeachPoint</span>
                </RouterLink>
                <div class="flex items-center ml-auto">
                    <RouterLink
                        :to="{
                            name:
                                userState.userType === 'Admin'
                                    ? 'admin'
                                    : userState.userType === 'Teacher'
                                      ? 'teacher'
                                      : userState.userType === 'Student'
                                        ? 'student'
                                        : 'login',
                        }"
                        class="text-white bg-primary-hover hover:bg-primary-hover focus:ring-4 focus:ring-primary-hover font-medium rounded-lg text-sm px-4 py-2 mr-2 :bg-primary-hover focus:outline-none :ring-primary-hover"
                    >
                        {{ userState.userType !== null ? "Dashboard" : "Log in" }}
                    </RouterLink>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import SideBarComponent from './sidebar/SideBarComponent.vue';

    export default {
        name: "HeaderComponent",
        inject: ["userState"],
        components: {
            SideBarComponent,
        },
    };
</script>
