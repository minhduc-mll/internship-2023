<template>
  <p>Unit {{ props.msg }}</p>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import type { Props } from "./UnitTestComponent";

const props = defineProps<Props>();

defineClassComponent(
  class Component extends BaseComponent {
    public constructor() {
      super();

      this.commonStore.eventBus.on("click", (data) => {
        console.log(data);
      });
    }
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";
</style>
