<script>
    import CreateTemplateComponent from "@/components/templates/CreateTemplateComponent.vue";

    export default {
        name: "CreateTemplateView",
        components: {
            CreateTemplateComponent,
        },
    };
</script>

<template>
    <div>
        <section class="my-6">
            <h1 class="my-6 text-center text-2xl font-semibold">Create Template</h1>
            <CreateTemplateComponent />
        </section>
    </div>
</template>

<style></style>
