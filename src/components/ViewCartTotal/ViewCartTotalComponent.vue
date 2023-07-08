<template>
  <div class="cart-total">
    <div class="wrapper">
      <h2 class="cart-title">Cart totals</h2>
      <table class="cart-table">
        <tbody>
          <tr class="cart-subtotal">
            <th>Subtotal</th>
            <td>
              <span class="amount">
                <span class="currency-symbol">$</span>
                <span>{{ app.totalCartAmount.value }}</span>
              </span>
            </td>
          </tr>
          <tr class="cart-total">
            <th>Subtotal</th>
            <td>
              <span class="amount">
                <span class="currency-symbol">$</span>
                <span>{{ app.totalCartAmount.value }}</span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="cart-checkout">
        <button class="g-btn checkout-btn" @click="app.handleCheckout">Proceed To Checkout</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import { useShoppingCartStore } from "@/stores/shoppingCart.store";

const app = defineClassComponent(
  class Component extends BaseComponent {
    public shoppingCartStore = useShoppingCartStore();
    public totalCartAmount = this.computed(() => this.shoppingCartStore.getTotalCartAmount());

    public constructor() {
      super();
    }

    public handleCheckout = () => {
      this.router.push({ path: "/checkout", name: "Checkout" });
    };
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.cart-total {
  margin-bottom: 32px;

  & .wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 0;
    padding: 0 20px;

    & .cart-title {
      margin: 0 -20px 20px;
      padding: 14px 20px;
      background-color: #fbfbfb;
      border-bottom: 1px solid #ddd;
      font-size: 19px;
      font-weight: 700;
      line-height: 24px;
    }

    & .cart-table {
      width: 100%;
      border: none;
      margin: 0 0 6px;
      padding: 0;
      table-layout: fixed;
      text-align: left;

      & tr {
        border-bottom: 1px solid #ddd;

        & th,
        td {
          width: 40%;
          vertical-align: top;
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          padding: 12px 16px;
        }
      }
    }

    & .cart-checkout {
      width: 100%;
      padding: 16px 0;

      & .checkout-btn {
        width: 100%;
        padding: 18px !important;
        font-size: 18px !important;
        font-weight: 600 !important;
        line-height: 32px !important;
      }
    }
  }
}
</style>
