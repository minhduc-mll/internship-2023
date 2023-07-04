<template>
  <div class="categories">
    <h1 class="cat-title">Categories</h1>
    <ul class="cat-list">
      <li class="cat-item" v-for="category of app.productsStore.categories" :key="category.id">
        <router-link :to="category.url" class="item-name" @click="app.setCategory(category.name)">
          {{ category.name }}
        </router-link>
        <span class="count">({{ category.size }})</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import { useProductsStore } from "@/stores/products.store";

const app = defineClassComponent(
  class Component extends BaseComponent {
    public productsStore = useProductsStore();

    public constructor() {
      super();
    }

    public setCategory = (categoryName: string) => {
      this.productsStore.setCategoryByName(categoryName);
    };
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.categories {
  background-color: #fff;
  width: 100%;
  padding: 32px;
  margin-bottom: 32px;

  & .cat-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  & .cat-list {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 0;
    margin: 0;
    list-style-type: none;

    & .cat-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2px 0;

      & .item-name {
        cursor: pointer;
      }
    }
  }
}
</style>
