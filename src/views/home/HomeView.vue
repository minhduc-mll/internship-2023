<template>
  <BaseLayout>
    <div class="home-content">
      <div class="wrapper">
        <div class="top-content">
          <h1 class="title">{{ app.t(`title.home`) }}</h1>
        </div>
        <div class="bottom-content">
          <div class="desc">Home Content</div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "@/layouts/BaseLayout.vue";
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";

const app = defineClassComponent(
  class Component extends BaseComponent {
    public msg = "Home";
    public constructor() {
      super();
    }
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.home-content {
  background-color: #f7f7f7;
  margin: 0;
  padding: 64px 75px;

  & .wrapper {
    background-color: #fff;
    text-align: center;
    margin: 0;
    padding: 85px 106px;

    & .top-content {
      margin-bottom: 24px;

      & .title {
        color: #6a5950;
        font-size: 136px;
        font-weight: 600;
        line-height: 1;
      }
    }

    & .bottom-content {
      & .desc {
        color: #312e39;
        font-size: 24px;
        font-weight: 700;
        line-height: 1;
        margin-bottom: 32px;
      }
    }
  }
}
</style>
