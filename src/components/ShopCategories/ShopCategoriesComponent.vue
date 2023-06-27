<template>
  <div class="categories">
    <h1 class="cat-title">Categories</h1>
    <ul class="cat-list">
      <li class="cat-item" v-for="category of app.categories.value" :key="category.id">
        <router-link :to="category.url" class="item-name">{{ category.name }}</router-link>
        <span class="count">({{ category.size }})</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import type { Category } from "@/models/base.model";
import type { Ref } from "vue";

const app = defineClassComponent(
  class Component extends BaseComponent {
    public categories: Ref<Array<Category>> = this.ref([
      { id: 1, name: "Accessories", size: 9, url: "/accessories" },
      { id: 2, name: "Bottoms", size: 2, url: "/bottoms" },
      { id: 3, name: "Dresses", size: 5, url: "/dresses" },
      { id: 4, name: "Footwear", size: 3, url: "/footwear" },
      { id: 5, name: "Tops", size: 5, url: "/tops" },
    ]);

    public constructor() {
      super();
    }
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
        color: #6a5950;
        text-decoration: none;
      }
    }
  }
}
</style>
