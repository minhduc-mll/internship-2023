<template>
  <div class="product">
    <div class="product-thumbnail">
      <router-link :to="app.product.url" class="product-link">
        <img width="300" height="400" :src="app.product.image" />
      </router-link>
    </div>
    <div class="product-detail">
      <router-link :to="app.product.url" class="product-link">
        <div class="product-title">{{ app.product.title }}</div>
      </router-link>
      <div class="product-star">
        <span v-for="index in 5" :key="index">
          <i class="bi bi-star"></i>
        </span>
      </div>
      <div class="product-price" v-if="app.product.deals">
        <span class="amount-del">
          <span class="currency-symbol">$</span>
          <span>{{ app.product.price.toFixed(2) }}</span>
        </span>
        <span class="amount-ins">
          <span class="currency-symbol">$</span>
          <span>{{ (app.product.price * 0.8).toFixed(2) }}</span>
        </span>
      </div>
      <div class="product-price" v-else>
        <span class="amount-ins">
          <span class="currency-symbol">$</span>
          <span>{{ app.product.price.toFixed(2) }}</span>
        </span>
      </div>
    </div>
    <div class="product-onsale" v-if="app.product.deals">
      <span>Sale!</span>
    </div>
    <div class="add_to_cart">
      <span class="tooltip"> Add to card </span>
      <button class="add_to_cart_button">
        <i class="bi bi-handbag-fill"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import type { ProductProps } from "./ProductCardComponent";
import type { ProductModel } from "@/models/product.model";

const props = defineProps<ProductProps>();

const app = defineClassComponent(
  class Component extends BaseComponent {
    public product: ProductModel = this.reactive(props.product);

    public constructor() {
      super();
    }
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.product {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;

  & .product-thumbnail {
    & .product-link {
      text-decoration: none;

      & img {
        display: block;
        width: 100%;
        max-width: 100%;
        height: auto;
        margin-bottom: 8px;
      }
    }
  }

  & .product-detail {
    display: flex;
    flex-direction: column;
    justify-content: center;

    & .product-link {
      text-decoration: none;

      & .product-title {
        margin-bottom: 8px;
        font-family: "Fahkwang", sans-serif;
        font-weight: 600;
        line-height: 20px;
        color: black;
      }
    }

    & .product-star {
      margin: 0 auto 7px 0;
      color: #312e39;
    }

    & .product-price {
      display: flex;
      align-items: center;
      gap: 6px;

      & .amount-del {
        display: initial;
        opacity: 0.5;
        text-decoration: line-through;
      }

      & .amount-del,
      .amount-ins {
        span {
          font-size: 0.9em;
          font-weight: 700;
          line-height: 20px;
        }
      }
    }
  }

  & .product-onsale {
    position: absolute;
    top: 20px;
    left: 20px;
    transition: all 0.2s;
    z-index: 5;
    cursor: pointer;

    color: #312e39;
    background-color: #fff;
    border-radius: 20px;
    padding: 5px 10px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);

    & span {
      font-size: 14px;
      font-weight: 400;
      line-height: normal;
      letter-spacing: normal;
    }
  }

  & .add_to_cart {
    position: absolute;
    top: 20px;
    right: 20px;
    visibility: hidden;
    opacity: 0;
    transition: all 0.2s;
    z-index: 5;
    cursor: pointer;

    & .tooltip {
      position: absolute;
      color: #fff;
      background-color: #26222f;
      pointer-events: none;
      white-space: nowrap;
      padding: 10px;
      margin-right: 10px;
      border-radius: 3px;
      font-size: 14px;
      line-height: 1;
      right: 100%;
      top: auto;
      visibility: hidden;
      opacity: 0;
      z-index: 5;
      transition: all 0.2s;
    }

    & button {
      width: 32px;
      height: 32px;
      color: #000;
      background-color: #fff;
      opacity: 0.7;
      border: none;
      outline: none;
      border-radius: 100%;
      padding: 0px;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);

      & i {
        font-size: 20px;
      }
    }

    &:hover {
      visibility: visible;
      opacity: 1;

      & .tooltip {
        visibility: visible;
        opacity: 1;
      }

      & button {
        opacity: 1;
      }
    }
  }

  &:hover {
    & .add_to_cart {
      visibility: visible;
      opacity: 1;
    }
  }
}
</style>
