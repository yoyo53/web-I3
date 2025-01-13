<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
</script>

<template>
  <HeaderComponent />
  <RouterView class="grow px-2"/>
  <FooterComponent />
</template>
