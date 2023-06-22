<template>
  <div id="page-layout">
    <NavbarComponent />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import NavbarComponent from "@/components/navbar/NavbarComponent.vue";
</script>

<style>
#page-layout {
  height: 100%;
  width: 100%;
}
</style>
