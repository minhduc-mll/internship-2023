<template>
  <div class="products">
    <div class="products-nav">Home / {{ productsNav }}</div>
    <div class="products-header">
      <h1 class="header-title">Shop</h1>
    </div>
    <div class="products-filter">
      <div class="filter-count">Showing {{ app.getResultCount() }} of {{ app.getTotalProducts() }} results</div>
      <form class="filter-ordering">
        <select name="orderby" class="orderby">
          <option value="menu_order" selected>Default sorting</option>
          <option value="popularity">Sort by popularity</option>
          <option value="rating">Sort by average rating</option>
          <option value="date">Sort by latest</option>
          <option value="price">Sort by price: low to high</option>
          <option value="price-desc">Sort by price: high to low</option>
        </select>
      </form>
    </div>
    <ul class="products-list">
      <li class="products-item" v-for="product of app.products.value" :key="product.id">
        <ProductCardComponent :product="product"></ProductCardComponent>
      </li>
    </ul>
    <div class="products-pagination">
      <ul class="page-numbers">
        <li>
          <button class="page-numbers active">1</button>
        </li>
        <li>
          <button class="page-numbers">2</button>
        </li>
        <li>
          <button class="next page-numbers">-></button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import ProductCardComponent from "@/components/ProductCard/ProductCardComponent.vue";
import type { Ref } from "vue";
import type { Product } from "@/models/base.model";
import { ApiConst } from "@/const/api.const";
import { PathConst } from "@/const/path.const";

const products = ApiConst.products;
const productsNav = PathConst.shop.name;

const app = defineClassComponent(
  class Component extends BaseComponent {
    public products: Ref<Array<Product>> = this.ref(products);
    public pageSize: Ref<number> = this.ref(18);
    public pageNumber: Ref<number> = this.ref(1);

    public constructor() {
      super();
    }

    public getTotalProducts = () => {
      return this.products.value.length;
    };

    public getResultCount = () => {
      const start = (this.pageNumber.value - 1) * app.pageSize.value + 1;
      const end = start + this.pageSize.value - 1;
      const total = this.getTotalProducts();
      return `${start}-${total > end ? end : total}`;
    };
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.products {
  background-color: #fff;
  width: 100%;
  padding: 80px 100px;

  & .products-nav {
    margin: 0 0 15px;
    padding: 0;
    font-size: 0.92em;
    color: #777;
  }
  & .products-header {
    margin-bottom: 136px;

    & .header-title {
      color: #6a5950;
      font-size: 136px;
      font-weight: 400;
    }
  }

  & .products-filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;

    & .filter-count {
      line-height: 1;
    }

    & .filter-ordering {
      & .orderby {
        background-color: transparent;
        color: #666;
        border: none;
        padding: 12px;
        box-shadow: none;
      }
    }
  }

  & .products-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    padding: 0;
    margin: 0;
    list-style-type: none;

    & .products-item {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;
    }
  }

  & .products-pagination {
    margin: 0;
    padding: 0;

    & .page-numbers {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 0;
      padding: 0;
      list-style-type: none;

      & li {
        border: 1px solid #6a5950;
        padding: 0;
        overflow: hidden;

        & .page-numbers {
          color: #6a5950;
          border: none;
          outline: none;
          margin: 0;
          padding: 12px;
          min-width: 40px;
          justify-content: center;
          cursor: pointer;
        }

        & .active {
          background-color: #6a5950;
          color: #26222f;
        }
      }
    }
  }
}
</style>
