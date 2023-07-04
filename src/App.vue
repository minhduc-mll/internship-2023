<template>
  <InternalErrorView v-if="app.isError.value" />
  <RouterView v-else />
</template>

<script setup lang="ts">
import InternalErrorView from "@/views/errors/InternalErrorView.vue";
import { RouterView } from "vue-router";
import { AppConst } from "./const/app.const";
import { BaseComponent, defineClassComponent } from "./plugins/component.plugin";
import { GblobalEvent } from "./plugins/event.plugin";
import { useProductsStore } from "./stores/products.store";
import { useShoppingCartStore } from "./stores/shoppingCart.store";

const app = defineClassComponent(
  class App extends BaseComponent {
    public productsStore = useProductsStore();
    public shoppingCartStore = useShoppingCartStore();
    public isError = this.ref(false);

    public constructor() {
      super();

      this.onBeforeMount(async () => {
        try {
          await this.productsStore.fetchAllProducts();
          await this.shoppingCartStore.getShoppingCart();
        } catch (error) {
          console.log(error);
        }
      });

      this.watch(
        () => this.route.fullPath,
        () => {
          this.isError.value = false;
        },
      );

      GblobalEvent.on(AppConst.EVENTS.internalError, () => {
        this.isError.value = true;
      });
    }
  },
);
</script>

<style lang="scss"></style>
