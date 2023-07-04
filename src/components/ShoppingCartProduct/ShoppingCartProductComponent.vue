<template>
  <div class="product-cart">
    <div class="product-thumbnail">
      <router-link :to="app.product.value.url" class="product-link" @click="app.closeShoppingCart">
        <img width="300" height="400" :src="app.product.value.image" />
      </router-link>
    </div>
    <div class="product-detail">
      <div class="left">
        <router-link :to="app.product.value.url" class="product-link" @click="app.closeShoppingCart">
          <div class="product-title">{{ app.product.value.title }}</div>
        </router-link>
        <div class="product-desc">
          <span class="quantity">{{ app.product.value.quantity }}</span>
          <span> x </span>
          <span class="amount">
            <span class="currency-symbol">$</span>
            <span v-if="app.product.value.deals">{{ (app.product.value.price * 0.8).toFixed(2) }}</span>
            <span v-else>{{ app.product.value.price.toFixed(2) }}</span>
          </span>
        </div>
      </div>
      <button class="remove_from_cart_button" @click="app.handleRemoveFromCart">
        <i class="bi bi-x-circle"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import type { CartProductProps } from "./ShoppingCartProductComponent";
import { useShoppingCartStore } from "@/stores/shoppingCart.store";

const props = defineProps<CartProductProps>();

const app = defineClassComponent(
  class Component extends BaseComponent {
    public shoppingCartStore = useShoppingCartStore();
    public product = this.computed(() => props.cartProduct);

    public constructor() {
      super();
    }

    public handleRemoveFromCart = () => {
      this.shoppingCartStore.removeShoppingCart(this.product.value);
    };

    public closeShoppingCart = () => {
      this.shoppingCartStore.setActiveShoppingCart(false);
    };
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.product-cart {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 16px 0;
  border-bottom: 1px solid #ddd;

  & .product-thumbnail {
    & .product-link {
      & img {
        display: block;
        width: 60px;
        height: 60px;
        object-fit: cover;
      }
    }
  }

  & .product-detail {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    & .left {
      width: 100%;

      .product-title,
      .product-desc > span {
        color: #26222f;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
      }

      & .product-link {
        text-decoration: none;

        & .product-title {
          margin-bottom: 5px;
        }
      }
    }

    & .remove_from_cart_button {
      display: flex;
      width: 20px;
      height: 20px;
      color: #000;
      background-color: #fff;
      opacity: 0.7;
      border: none;
      outline: none;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
