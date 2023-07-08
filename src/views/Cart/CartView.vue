<template>
  <BaseLayout>
    <div class="cart-content">
      <div class="wrapper">
        <h1 class="title">Cart</h1>
        <div class="cart-message" v-if="app.shoppingCartStore.showMessage.value">
          <div class="message">
            <i class="bi bi-check-circle"></i>
            <span>{{ app.shoppingCartStore.showMessage.message }}</span>
          </div>
        </div>
        <div class="cart-empty" v-if="app.totalProductsCart.value === 0">
          <div class="cart-empty-message">
            <div class="empty-message">
              <i class="bi bi-bag"></i>
              <span>Your cart is currently empty.</span>
            </div>
          </div>
          <button class="g-btn return-btn" @click="app.handleReturnToShop">Return To Shop</button>
        </div>
        <div class="cart-detail" v-else>
          <ViewCartProductComponent></ViewCartProductComponent>
          <ViewCartTotalComponent class="total"></ViewCartTotalComponent>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import BaseLayout from "@/layouts/BaseLayout.vue";
import ViewCartProductComponent from "@/components/ViewCartProduct/ViewCartProductComponent.vue";
import ViewCartTotalComponent from "@/components/ViewCartTotal/ViewCartTotalComponent.vue";
import { useShoppingCartStore } from "@/stores/shoppingCart.store";

const app = defineClassComponent(
  class Component extends BaseComponent {
    public shoppingCartStore = useShoppingCartStore();
    public totalProductsCart = this.computed(() => this.shoppingCartStore.getTotalProductsCart());

    public constructor() {
      super();

      this.onBeforeMount(() => {
        this.shoppingCartStore.showMessage.value = false;
      });
    }

    public handleReturnToShop = () => {
      this.router.push({ path: "/shop", name: "Shop" });
    };
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.cart-content {
  background-color: #f7f7f7;
  margin: 0;
  padding: 64px 75px;

  & .wrapper {
    background-color: #fff;
    max-width: 1200px;
    margin: auto;
    padding: 85px 106px;

    & .title {
      color: #26222f;
      font-size: 30px;
      font-weight: 600;
      line-height: 36px;
      margin-bottom: 30px;
    }

    & .cart-message {
      position: relative;
      border-top: 3px solid #6a5950;
      margin-bottom: 32px;
      padding: 16px 32px 16px 54px;
      background-color: #f7f6f7;
      color: #515151;

      & .message {
        display: flex;
        align-items: center;

        & i {
          position: absolute;
          left: 24px;
          color: #6a5950;
        }

        & span {
          font-size: 16px;
          font-weight: 400;
          line-height: 26px;
          color: #6a5950;
        }
      }
    }

    & .cart-empty {
      & .cart-empty-message {
        position: relative;
        border-top: 3px solid #6a5950;
        margin-bottom: 16px;
        padding: 16px 32px 16px 54px;
        background-color: #f7f6f7;
        color: #515151;

        & .empty-message {
          display: flex;
          align-items: center;

          & i {
            position: absolute;
            left: 24px;
            color: #6a5950;
          }

          & span {
            font-size: 16px;
            font-weight: 400;
            line-height: 26px;
            color: #6a5950;
          }
        }
      }
    }

    & .total {
      width: 50%;
    }
  }
}
</style>
