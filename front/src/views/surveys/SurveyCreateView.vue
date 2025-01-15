<script>
    import SurveyCreateComponent from "@/components/surveys/SurveyCreateComponent.vue";

    export default {
        name: "SurveyCreateView",
        components: {
            SurveyCreateComponent,
        },
    };
</script>

<template>
    <div>
        <section class="my-6">
            <h1 class="my-6 text-center text-2xl font-semibold">Create Survey</h1>
            <SurveyCreateComponent />
        </section>
    </div>
</template>

<style></style>
