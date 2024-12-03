<template>
    <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div class="h-full px-3 py-8 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul class="space-y-4 font-medium">
                <TabComponent :img=ProfileSVG text="Profile"/>
                <TabComponent :img=survey text="Surveys"/>
                <TabComponent :img=template text="Template"/>
            </ul>
        </div>
    </aside>
</template>

<script>
import TabComponent from '@/components/sidebar/TabComponent.vue';
import ProfileSVG from '@/assets/profile.svg';
import survey from '@/assets/survey.svg';
import template from '@/assets/template.svg';

export default {
    name: 'SideBarComponent',
    components: {
        TabComponent
    },
    data(){
        return {
            ProfileSVG,
            survey,
            template
        }
    }
}
</script>