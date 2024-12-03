<template>
    <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div class="h-full px-3 py-8 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul class="space-y-4 font-medium h-full flex flex-col">
                <TabComponent :img="ProfileSVG" text="Profile" :to="{ name: 'profile' }"/>
                <TabComponent :img="surveySVG" text="Surveys" :to="getSurveyRoute"/>
                <TabComponent v-if="userState.userType === 'Admin'" :img="templateSVG" text="Template" :to="{ name: 'AdminTemplate' }"/>
                <TabComponent :img="logoutSVG" text="Logout" :to="{ name: 'login'}" textStyle="text-red-500 font-semibold" class="!mt-auto"/>
            </ul>
        </div>
    </aside>
</template>

<script>
import TabComponent from '@/components/sidebar/TabComponent.vue';
import ProfileSVG from '@/assets/profile.svg';
import surveySVG from '@/assets/survey.svg';
import templateSVG from '@/assets/template.svg';
import logoutSVG from '@/assets/logout.svg';

export default {
    inject: ['userState'],
    name: 'SideBarComponent',
    components: {
        TabComponent
    },
    data(){
        return {
            ProfileSVG,
            surveySVG,
            templateSVG,
            logoutSVG
        }
    },
    computed: {
        getSurveyRoute() {
            if (this.userState.userType === 'Admin') {
                return { name: 'admin' };
            } else if (this.userState.userType === 'Teacher') {
                return { name: 'teacher' };
            } else {
                return { name: 'StudentSurvey' };
            }
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('userType');
        }
    }
}
</script>