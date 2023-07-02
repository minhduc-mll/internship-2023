<template>
  <BaseLayout>
    <div class="coming-soon-content">
      <div class="wrapper">
        <div class="top-content">
          <h1 class="title">{{ app.t(`title.${props.title}`) }}</h1>
        </div>
        <div class="bottom-content">
          <div class="desc">{{ props.message }}</div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import BaseLayout from "@/layouts/BaseLayout.vue";
import type { Props } from "./ComingSoonView";

const props = defineProps<Props>();

const app = defineClassComponent(
  class Component extends BaseComponent {
    public constructor() {
      super();
    }
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.coming-soon-content {
  background-color: #f7f7f7;
  margin: 0;
  padding: 64px 75px;

  & .wrapper {
    & .top-content {
      background-color: #eee;
      margin: 0;
      padding: 80px 106px 55px 106px;

      & .title {
        color: #6a5950;
        line-height: 1;
        font-size: 45px;
        font-weight: 600;
        margin-bottom: 4px;
      }
    }

    & .bottom-content {
      background-color: #fff;
      margin: 0;
      padding: 85px 106px;

      & .desc {
        margin-bottom: 16px;
      }
    }
  }
}
</style>
