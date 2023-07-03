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
import { useProductsStore } from "@/stores/products.store";
import { PrimitiveHelper } from "@/helpers/primitive.helper";
import type { ShopProps } from "./ShopView";

const shopProps = defineProps<ShopProps>();

const app = defineClassComponent(
  class Component extends BaseComponent {
    public productsStore = useProductsStore();
    public categoryName = this.computed(() => {
      if (shopProps.categoryName) {
        return PrimitiveHelper.convertKebabToName(shopProps.categoryName);
      }
      return "";
    });

    public constructor() {
      super();

      this.onBeforeMount(() => {
        this.setCategory(this.categoryName.value);
      });
    }

    public categoryNameWatcher = this.watch(
      [() => this.categoryName.value, () => this.productsStore.categories],
      ([categoryName]) => {
        this.setCategory(categoryName);
      },
    );

    public setCategory = (categoryName: string) => {
      if (categoryName) {
        this.productsStore.setCategoryByName(categoryName);
        document.title = this.t("title.category", { categoryName: categoryName });
      } else {
        this.productsStore.setCategoryByName("");
      }
    };
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
