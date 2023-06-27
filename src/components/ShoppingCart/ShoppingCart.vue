<template>
  <button class="g-btn" @click="app.handleShoppingCart">{{ app.isActive.value ? `Close` : `Open` }} Cart</button>
  <div class="shopping-card" :class="{ active: app.isActive.value }">
    <div class="cart-header">
      <div class="header-title">Shopping Cart</div>
      <button class="close-btn" @click="app.closeShoppingCart"><i class="bi bi-x"></i></button>
    </div>
    <div class="cart-content">
      <ul class="cart-list">
        <li class="cart-item" v-for="product of app.products.value" :key="product.id">
          <ShoppingCartProductComponent :cartProduct="product"></ShoppingCartProductComponent>
        </li>
      </ul>
      <div class="cart-total">
        <span>Subtotal:</span>
        <span class="amount">
          <span class="currency-symbol">$</span>
          <span>{{ app.getTotalCartAmount() }}</span>
        </span>
      </div>
      <div class="cart-buttons">
        <button class="g-btn view-btn">View Cart</button>
        <button class="g-btn checkout-btn">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import ShoppingCartProductComponent from "@/components/ShoppingCartProduct/ShoppingCartProductComponent.vue";
import type { Ref } from "vue";
import type { CartProduct } from "@/models/base.model";
import { ApiConst } from "@/const/api.const";

const products = ApiConst.cartProducts;

const app = defineClassComponent(
  class Component extends BaseComponent {
    public products: Ref<Array<CartProduct>> = this.ref(products);
    public isActive: Ref<boolean> = this.ref(false);

    public constructor() {
      super();
    }

    public getTotalCartAmount = () => {
      let total = 0;
      products.map((product) => {
        total += product.quantity * product.price;
      });
      return total;
    };

    public closeShoppingCart = () => {
      this.isActive.value = false;
    };

    public handleShoppingCart = () => {
      this.isActive.value = !this.isActive.value;
    };
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.shopping-card {
  position: fixed;
  display: block;
  background-color: #fff;
  border: 1px solid #ddd;
  width: 35%;
  height: 100%;
  left: 100%;
  top: 0px;
  opacity: 1;
  z-index: 999;
  overflow: auto;
  will-change: transform;
  transition: 0.25s ease;

  &.active {
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  & .cart-header {
    position: absolute;
    width: 100%;
    text-align: left;
    text-transform: inherit;
    font-weight: 500;
    border-bottom: 1px solid #ddd;
    line-height: 1;
    z-index: 1;
    max-height: 56px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    & .header-title {
      width: 50%;
      color: #26222f;
      margin: 22px;
    }

    & .close-btn {
      color: #26222f;
      background-color: #fff;
      border: none;
      outline: none;
      margin-right: 12px;
      padding: 0;

      & i {
        font-size: 28px;
        font-weight: 700;
      }
    }
  }

  & .cart-content {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding-top: 56px;
    height: 100%;

    & .cart-list {
      position: relative;
      padding: 21px;
      flex: 1;
      overflow: auto;
      margin: 0;

      & .cart-item {
        display: flex;
        align-items: center;
      }
    }

    & .cart-total {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 22px;
      margin-bottom: 0;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
    }

    & .cart-buttons {
      text-align: center;
      padding: 22px;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 15px;

      & button {
        font-size: 13px;
        font-weight: 600;
        line-height: 1;
        letter-spacing: 1px;
        text-transform: uppercase;
      }
    }
  }
}
</style>
