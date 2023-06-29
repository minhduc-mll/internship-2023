<template>
  <div class="deals">
    <h1 class="deals-title">Hottest Deals</h1>
    <ul class="deals-list">
      <li class="deals-item" v-for="product of app.products.value" :key="product.id">
        <router-link :to="product.url" class="product-link">
          <img width="300" height="400" :src="product.image" class="product-thumbnail" />
          <div class="product-title">{{ product.title }}</div>
        </router-link>
        <div class="product-onsale">
          <span>Sale</span>
        </div>
        <div class="product-price">
          <span class="amount-del">
            <span class="currency-symbol">$</span>
            <span>{{ product.price.toFixed(2) }}</span>
          </span>
          <span class="amount-ins">
            <span class="currency-symbol">$</span>
            <span>{{ (product.price * 0.8).toFixed(2) }}</span>
          </span>
        </div>
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

    public products = this.computed(() => this.productsStore.dealsProducts);
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.deals {
  background-color: #fff;
  width: 100%;
  padding: 32px;

  & .deals-title {
    font-size: 18px;
    margin-bottom: 16px;
  }

  & .deals-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style-type: none;

    & .deals-item {
      position: relative;
      display: flex;
      flex-direction: column;
      margin: 0 8px 20px 8px;

      & .product-link {
        text-decoration: none;

        & img {
          display: block;
          max-width: 100%;
          height: auto;
          margin-bottom: 12px;
        }

        & .product-title {
          line-height: 1;
          margin-bottom: 8px;
          color: #6a5950;
        }
      }

      & .product-onsale {
        position: absolute;
        min-width: 36px;
        min-height: 36px;
        line-height: 36px;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        border-radius: 100%;
        z-index: 9;
        top: 10px;
        right: 10px;
        background-color: #ddd1c1;
        color: black;
        border: 1px solid #43454b;
      }

      & .product-price {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 8px;

        & span {
          line-height: 1;
        }

        & .amount-del {
          display: initial;
          opacity: 0.5;
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>
