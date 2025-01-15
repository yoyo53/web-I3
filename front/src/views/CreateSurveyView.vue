<script>
    import CreateSurveyComponent from "@/components/surveys/CreateSurveyComponent.vue";

    export default {
        name: "CreateSurveyView",
        components: {
            CreateSurveyComponent,
        },
    };
</script>

<template>
    <div>
        <section class="my-6">
            <h1 class="my-6 text-center text-2xl font-semibold">Create Survey</h1>
            <CreateSurveyComponent />
        </section>
    </div>
</template>

<style></style>