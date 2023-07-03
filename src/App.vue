<template>
  <InternalErrorView v-if="app.isError.value" />
  <RouterView v-else />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { AppConst } from "./const/app.const";
import { BaseComponent, defineClassComponent } from "./plugins/component.plugin";
import { GblobalEvent } from "./plugins/event.plugin";
import InternalErrorView from "@/views/errors/InternalErrorView.vue";
import { useProductsStore } from "./stores/products.store";

const app = defineClassComponent(
  class App extends BaseComponent {
    public productsStore = useProductsStore();
    public isError = this.ref(false);

    public constructor() {
      super();

      this.onBeforeMount(async () => {
        try {
          await this.productsStore.fetchAllProducts();
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

      this.searchParams.onStateChange((params) => {
        console.log(params);
      });
    }
  },
);
</script>

<style lang="scss"></style>
