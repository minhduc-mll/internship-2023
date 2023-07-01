<template>
  <BaseLayout>
    <div class="internal-error-content">
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
.internal-error-content {
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
