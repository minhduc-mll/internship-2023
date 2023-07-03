<template>
  <div id="base-layout">
    <NavbarComponent></NavbarComponent>
    <slot></slot>
    <FooterComponent></FooterComponent>
  </div>
  <ShoppingCart></ShoppingCart>
</template>
<script setup lang="ts">
import NavbarComponent from "@/components/NavbarComponent/NavbarComponent.vue";
import FooterComponent from "@/components/FooterComponent/FooterComponent.vue";
import ShoppingCart from "@/components/ShoppingCart/ShoppingCart.vue";
</script>

<style>
#base-layout {
  height: 100%;
  width: 100%;
}
</style>
