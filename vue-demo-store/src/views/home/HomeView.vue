<template>
  <BaseLayout>
    <UnitTestComponent msg="Hello world" />
    <EventBus msg="Event Bus" />
    <button @click="app.onClickA">Change to A</button>
    <button @click="app.onClickB">Change to B</button>
    <button @click="app.onClickC">Event Bus</button>
  </BaseLayout>
</template>

<script setup lang="ts">
import EventBus from "@/components/EventBus.vue";
import UnitTestComponent from "@/components/UnitTestComponent.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";

const app = defineClassComponent(
  class Component extends BaseComponent {
    public constructor() {
      super();

      this.searchParams.onStateChange((params) => {
        console.log("Hehe from Home", params);
      });
    }

    public onClickA = () => {
      this.searchParams.changeParams({ a: "thang", b: "" });
    };

    public onClickB = () => {
      this.searchParams.changeParams({ a: "", b: "thang" });
    };

    public onClickC = () => {
      this.commonStore.eventBus.emit("click", { hello: "world" });
    };
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";
</style>
