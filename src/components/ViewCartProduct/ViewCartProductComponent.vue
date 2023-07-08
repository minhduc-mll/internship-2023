<template>
  <div class="cart-product">
    <table class="cart-table">
      <thead>
        <tr>
          <th class="product-remove"></th>
          <th class="product-thumbnail"></th>
          <th class="product-name">Product</th>
          <th class="product-price">Price</th>
          <th class="product-quantity">Quantity</th>
          <th class="product-subtotal">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr class="cart-item" v-for="product of app.shoppingCartStore.productsCart" :key="product.id">
          <td class="product-remove">
            <button class="remove_from_cart_button" @click="app.handleRemoveFromCart(product)">
              <i class="bi bi-x-circle"></i>
            </button>
          </td>
          <td class="product-thumbnail">
            <router-link :to="product.url"><img :src="product.image" :alt="product.title" /></router-link>
          </td>
          <td class="product-name">
            <router-link :to="product.url">{{ product.title }}</router-link>
          </td>
          <td class="product-price">
            <span class="amount">
              <span class="currency-symbol">$</span>
              <span v-if="product.deals">{{ (product.price * 0.8).toFixed(2) }}</span>
              <span v-else>{{ product.price.toFixed(2) }}</span>
            </span>
          </td>
          <td class="product-quantity">
            <div class="quantity">
              <input type="number" :value="product.quantity" />
            </div>
          </td>
          <td class="product-subtotal">
            <span class="amount">
              <span class="currency-symbol">$</span>
              <span v-if="product.deals">{{ (product.price * 0.8 * product.quantity).toFixed(2) }}</span>
              <span v-else>{{ (product.price * product.quantity).toFixed(2) }}</span>
            </span>
          </td>
        </tr>
        <tr class="cart-footer">
          <td colspan="6" class="actions">
            <div class="coupon">
              <input type="text" placeholder="Coupon code" />
              <button class="g-btn">Apply Coupon</button>
            </div>
            <button class="g-btn update-btn" :class="{ disabled: false }" @click="app.handleUpdateCart">
              Update Cart
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import { useShoppingCartStore } from "@/stores/shoppingCart.store";

const app = defineClassComponent(
  class Component extends BaseComponent {
    public shoppingCartStore = useShoppingCartStore();
    public totalProductsCart = this.computed(() => this.shoppingCartStore.getTotalProductsCart());
    public totalCartAmount = this.computed(() => this.shoppingCartStore.getTotalCartAmount());

    public constructor() {
      super();
    }

    public handleRemoveFromCart = (product: any) => {
      this.shoppingCartStore.removeShoppingCart(product);
      this.shoppingCartStore.showMessage.value = true;
      this.shoppingCartStore.showMessage.message = `"${product.title}" removed. Undo?`;
    };

    public handleUpdateCart = () => {
      this.shoppingCartStore.showMessage.value = !this.shoppingCartStore.showMessage.value;
      this.shoppingCartStore.showMessage.message = "Cart updated.";
    };
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.cart-product {
  margin-bottom: 24px;

  & .cart-table {
    width: 100%;
    text-align: left;
    border: 1px solid #ddd;
    border-radius: 0;
    border-collapse: separate;
    border-spacing: 0;

    & th,
    td {
      padding: 12px 16px;
      border-bottom: 1px solid #ddd !important;
      font-size: 16px;
      line-height: 26px;
      vertical-align: middle;
    }

    & thead {
      background-color: #fbfbfb;

      & th {
        font-weight: 700;
      }
    }

    & tbody {
      background-color: #fff;

      & td {
        min-height: 52px;
        vertical-align: middle;
      }

      & .product-remove {
        text-align: center;

        & .remove_from_cart_button {
          display: flex;
          width: 20px;
          height: 20px;
          color: #000;
          background-color: #fff;
          opacity: 0.7;
          margin: auto;
          padding: 0;
          border: none;
          outline: none;

          & i {
            font-size: 20px;
          }

          &:hover {
            opacity: 1;
          }
        }
      }

      & img {
        max-width: 70px;
        width: auto;
        height: auto;
      }

      & input {
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 0;
        box-shadow: none;
      }

      & .quantity {
        & input {
          width: 56px;
          padding: 5px;
          text-align: center;
          min-height: 35px;
          margin: 0;
          vertical-align: middle;
          line-height: 1;
        }
      }

      & .actions {
        text-align: right;
        border: 0 !important;

        & .coupon {
          float: left;
          display: flex;
          align-items: center;
          gap: 10px;

          & input {
            width: auto;
            max-height: 35px;
            padding: 8px 12px;
          }
        }

        & .update-btn {
          &.disabled {
            cursor: not-allowed;
            opacity: 0.5;
          }
        }
      }
    }
  }
}
</style>
