<template>
  <BaseLayout>
    <div class="shop-content">
      <div class="secondary">
        <ShopCategoriesComponent></ShopCategoriesComponent>
        <ShopFiltersComponent></ShopFiltersComponent>
        <ShopDealsComponent></ShopDealsComponent>
      </div>
      <div class="primary">
        <ShopProductsComponent></ShopProductsComponent>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import BaseLayout from "@/layouts/BaseLayout.vue";
import ShopCategoriesComponent from "@/components/ShopCategories/ShopCategoriesComponent.vue";
import ShopFiltersComponent from "@/components/ShopFilters/ShopFiltersComponent.vue";
import ShopDealsComponent from "@/components/ShopDeals/ShopDealsComponent.vue";
import ShopProductsComponent from "@/components/ShopProducts/ShopProductsComponent.vue";

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

.shop-content {
  background-color: #f7f7f7;
  padding: 64px 25px 40px 25px;
  display: flex;
  gap: 30px;

  & .primary {
    flex: 76;
    line-height: 1;
  }

  & .secondary {
    flex: 24;
    line-height: 2;
    word-break: break-word;
  }
}
</style>
