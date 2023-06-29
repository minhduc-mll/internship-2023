<template>
  <div id="base-layout">
    <NavbarComponent></NavbarComponent>
    <FooterComponent></FooterComponent>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import NavbarComponent from "@/components/NavbarComponent/NavbarComponent.vue";
import FooterComponent from "@/components/FooterComponent/FooterComponent.vue";
</script>

<style>
#page-layout {
  height: 100%;
  width: 100%;
}
</style>
