<template>
    <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div class="h-full px-3 py-8 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul class="space-y-4 font-medium">
                <TabComponent :img=ProfileSVG text="Profile" link="/profile"/>
                <TabComponent :img=surveySVG text="Surveys" :link="userState.userType === 'Admin' ? '/admin/survey' : userState.userType === 'Teacher' ? '/teacher/survey' : '/student/survey'"/>
                <TabComponent v-if="userState.userType === 'Admin'" :img=templateSVG text="Template" link="/admin/template"/>
            </ul>
        </div>
    </aside>
</template>

<script>
import TabComponent from '@/components/sidebar/TabComponent.vue';
import ProfileSVG from '@/assets/profile.svg';
import surveySVG from '@/assets/survey.svg';
import templateSVG from '@/assets/template.svg';

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
        }
    }
}
</script>