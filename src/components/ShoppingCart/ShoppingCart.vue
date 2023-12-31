<template>
  <div :class="['cart-overlay', { active: app.shoppingCartStore.isActive }]" @click="app.closeShoppingCart"></div>
  <div :class="['shopping-card', { active: app.shoppingCartStore.isActive }]">
    <div class="cart-header">
      <div class="header-title">Shopping Cart</div>
      <button class="close-btn" @click="app.closeShoppingCart"><i class="bi bi-x"></i></button>
    </div>
    <div class="cart-content" v-if="app.totalProductsCart.value">
      <ul class="cart-list">
        <li class="cart-item" v-for="product of app.shoppingCartStore.productsCart" :key="product.id">
          <ShoppingCartProductComponent :cartProduct="product"></ShoppingCartProductComponent>
        </li>
      </ul>
      <div class="cart-total">
        <span>Subtotal:</span>
        <span class="amount">
          <span class="currency-symbol">$</span>
          <span>{{ app.totalCartAmount.value }}</span>
        </span>
      </div>
      <div class="cart-buttons">
        <button class="g-btn view-btn" @click="app.handleViewCart">View Cart</button>
        <button class="g-btn checkout-btn" @click="app.handleCheckout">Checkout</button>
      </div>
    </div>
    <div class="cart-content" v-else>
      <div class="cart-message">
        <span>No products in the cart.</span>
      </div>
      <div class="cart-buttons">
        <button class="g-btn view-btn" @click="app.handleContinueShopping">Continue Shopping</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import ShoppingCartProductComponent from "@/components/ShoppingCartProduct/ShoppingCartProductComponent.vue";
import { useShoppingCartStore } from "@/stores/shoppingCart.store";

const app = defineClassComponent(
  class Component extends BaseComponent {
    public shoppingCartStore = useShoppingCartStore();
    public totalProductsCart = this.computed(() => this.shoppingCartStore.getTotalProductsCart());
    public totalCartAmount = this.computed(() => this.shoppingCartStore.getTotalCartAmount());

    public constructor() {
      super();

      this.onBeforeMount(() => {
        this.shoppingCartStore.getShoppingCart();
      });

      this.onBeforeUpdate(() => {
        this.shoppingCartStore.getShoppingCart();
      });
    }

    public closeShoppingCart = () => {
      this.shoppingCartStore.setActiveShoppingCart(false);
    };

    public handleViewCart = () => {
      this.router.push({ path: "/cart", name: "Cart" });
      this.closeShoppingCart();
    };

    public handleCheckout = () => {
      this.router.push({ path: "/checkout", name: "Checkout" });
      this.closeShoppingCart();
    };

    public handleContinueShopping = () => {
      this.router.push({ path: "/shop", name: "Shop" });
      this.closeShoppingCart();
    };
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.cart-overlay {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease-in-out;

  &.active {
    opacity: 1;
    visibility: visible;
    z-index: 998;
    cursor: pointer;
  }
}

.shopping-card {
  position: fixed;
  display: block;
  background-color: #fff;
  border: 1px solid #ddd;
  width: 35%;
  height: 100%;
  left: 100%;
  top: 0px;
  opacity: 0;
  visibility: hidden;
  overflow: auto;
  will-change: transform;
  transition: 0.25s ease;

  &.active {
    opacity: 1;
    visibility: visible;
    z-index: 999;
    transform: translate3d(-100%, 0, 0);
  }

  & .cart-header {
    position: absolute;
    width: 100%;
    max-height: 56px;
    text-align: left;
    text-transform: inherit;
    font-weight: 400;
    line-height: 1;
    border-bottom: 1px solid #ddd;
    z-index: 1;

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
      padding: 21px !important;
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

    & .cart-message {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      & span {
        color: #312e39;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
        margin: 10px 0 16px;
      }
    }
  }
}
</style>
