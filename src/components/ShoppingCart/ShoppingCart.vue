<template>
  <button class="g-btn" @click="app.handleShoppingCart">Cart</button>
  <div class="cart-overlay" :class="{ active: app.isActive.value }" @click="app.handleShoppingCart"></div>
  <div class="shopping-card" :class="{ active: app.isActive.value }">
    <div class="cart-header">
      <div class="header-title">Shopping Cart</div>
      <button class="close-btn" @click="app.closeShoppingCart"><i class="bi bi-x"></i></button>
    </div>
    <div class="cart-content" v-if="app.products.value.length">
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
import type { Ref } from "vue";
import { useProductsStore } from "@/stores/products.store";

const app = defineClassComponent(
  class Component extends BaseComponent {
    public productsStore = useProductsStore();
    public products: Ref<Array<any>> = this.ref([]);
    public isActive: Ref<boolean> = this.ref(false);

    public constructor() {
      super();

      this.onBeforeMount(() => {
        this.productsStore.getShoppingCart();
      });
    }

    public productsCartWatcher = this.watch(
      () => this.productsStore.productsCart,
      (products) => {
        this.products.value = products;
      },
    );

    public getTotalCartAmount = () => {
      let total = 0;
      this.products.value.map((product) => {
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

    public handleViewCart = () => {
      this.router.push({ path: "/cart", name: "Cart" });
    };

    public handleCheckout = () => {
      this.router.push({ path: "/checkout", name: "Checkout" });
    };

    public handleContinueShopping = () => {
      this.router.push({ path: "/shop", name: "Shop" });
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
