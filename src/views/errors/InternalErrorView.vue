<template>
  <BaseLayout>
    <div class="not-found-content">
      <div class="wrapper">
        <div class="top-content">
          <h1 class="title">500</h1>
        </div>
        <div class="bottom-content">
          <div class="desc">{{ app.t("title.internalError") }}</div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import BaseLayout from "@/layouts/BaseLayout.vue";

const app = defineClassComponent(
  class View extends BaseComponent {
    public constructor() {
      super();
      document.title = this.t("title.internalError");
    }
  },
);
</script>

<style scoped lang="scss">
.not-found-content {
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
