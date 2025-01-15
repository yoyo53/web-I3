<script setup>
    import { RouterView } from "vue-router";
    import HeaderComponent from "@/components/HeaderComponent.vue";
    import FooterComponent from "@/components/FooterComponent.vue";
</script>

<template>
    <HeaderComponent />
    <main class="flex flex-col grow">
        <RouterView class="grow px-2" />
    </main>
    <FooterComponent />
</template>
