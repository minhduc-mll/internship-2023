<template>
  <div class="header-container">
    <div class="ast-above-header-wrap">
      <span>Summer Sale. up to 40% off.</span>
    </div>
    <div class="navbar">
      <div class="navbar-left site-header-section">
        <div class="searchbar">
          <form
            action=""
            class="search-form"
            :class="{ active: app.activeSearch.value }"
            @submit="app.handleSearchClick"
          >
            <input
              type="text"
              class="search-input"
              placeholder="Search ..."
              v-model="app.searchInput.value"
              @focusout="app.handleFocusOut"
              tabindex="-1"
              autofocus
            />
            <button class="search-submit" hidden>
              <i class="bi bi-search"></i>
            </button>
          </form>
          <button class="search-btn" @click.prevent="app.handleSearchClick">
            <i class="bi bi-search"></i>
          </button>
        </div>
        <ul class="navbar-menu-items">
          <li><RouterLink to="/shop" class="navbar-menu-items-1">Shop By Categories</RouterLink></li>
          <li><RouterLink to="/new-arrivals" class="navbar-menu-items-1">New Arrivals</RouterLink></li>
          <li><RouterLink to="/collections" class="navbar-menu-items-1">Collections</RouterLink></li>
        </ul>
      </div>
      <div class="nav-mid site-header-section">
        <RouterLink to="/"><img src="@/assets/img/site-logo.svg" /></RouterLink>
      </div>
      <div class="nav-right site-header-section">
        <div class="items-social">
          <router-link to="" class="link" @click="app.handleScrollToTop">
            <i class="bi bi-instagram"></i>
          </router-link>
          <router-link to="" class="link" @click="app.handleScrollToTop">
            <i class="bi bi-facebook"></i>
          </router-link>
          <router-link to="" class="link" @click="app.handleScrollToTop">
            <i class="bi bi-twitter"></i>
          </router-link>
          <router-link to="" class="link" @click="app.handleScrollToTop">
            <i class="bi bi-youtube"></i>
          </router-link>
        </div>
        <div class="items-cart" @click="app.handleCartClick">
          <span class="amount">
            <span class="currency-symbol">$</span>
            <span>{{ app.totalCartAmount.value.toFixed(2) }}</span>
          </span>
          <div class="cart">
            <i class="bi bi-basket3-fill"></i>
            <span>{{ app.totalProductsCart.value }}</span>
          </div>
        </div>
        <div class="items-infor">
          <i class="bi bi-person-fill"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import type { Page } from "./NavbarComponent";
import type { Ref } from "vue";
import { useProductsStore } from "@/stores/products.store";

const app = defineClassComponent(
  class Component extends BaseComponent {
    public productsStore = useProductsStore();
    public pages: Ref<Array<Page>> = this.ref([
      { id: 1, text: "Home", url: "/" },
      { id: 2, text: "Categories", url: "/categories" },
      { id: 3, text: "NewArrivals", url: "/newarrivals" },
      { id: 4, text: "Collections", url: "/collections" },
    ]);
    public activeSearch: Ref<boolean> = this.ref(false);
    public searchInput: Ref<string> = this.ref("");
    public totalProductsCart = this.computed(() => this.productsStore.getTotalProductsCart());
    public totalCartAmount = this.computed(() => this.productsStore.getTotalCartAmount());

    public constructor() {
      super();

      this.onBeforeMount(() => {
        this.productsStore.getShoppingCart();
      });
    }

    public handleSearchClick = () => {
      if (this.activeSearch.value && this.searchInput.value) {
        this.router.push({ path: `/search`, name: "Search", query: { s: this.searchInput.value } });
        this.activeSearch.value = false;
      } else {
        this.activeSearch.value = !this.activeSearch.value;
      }
    };

    public handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    public handleFocusOut = () => {
      this.activeSearch.value = false;
      console.log("Focus Out");
    };

    public handleCartClick = () => {
      this.productsStore.setActiveShoppingCart(true);
    };
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.header-container {
  width: 100%;

  & .ast-above-header-wrap {
    text-align: center;
    padding: 5px 0px 5px 0px;
    background-color: #f7f7f7;
    min-height: 40px;

    & span {
      font-family: "Montserrat", sans-serif;
      font-size: 13px;
    }
  }

  & .navbar {
    height: 104px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 35px;
    border-bottom: 1px solid #eaeaea;

    & .site-header-section {
      height: 100%;
      min-height: 0;
      align-items: center;
      flex-wrap: nowrap;
    }

    & .navbar-left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 20px;

      & .searchbar {
        position: relative;

        & .search-form {
          display: none;
          position: absolute;
          background-color: #fff;
          border: 1px solid #ddd;
          padding-left: 48px;
          z-index: 3;

          top: 50%;
          left: -10px;
          transform: translate(0, -50%);
          transition: all 0.2s;

          &.active {
            display: flex;
            align-items: center;
          }

          & .search-input {
            width: 235px;
            color: #757575;
            margin-left: 10px;
            padding: 12px;
            height: auto;
            background-color: inherit;
            box-shadow: none;
            outline: none;
            border: none;
            transition: all 0.2s linear;

            font-weight: 400;
            font-size: 16px;
            line-height: 26px;
          }

          & .search-submit {
            position: absolute;
            left: 10px;
            outline: none;
            border: none;
            background-color: inherit;
          }
        }

        & .search-btn {
          position: relative;
          outline: none;
          border: none;
          background-color: inherit;
          z-index: 4;
        }
      }

      & .navbar-menu-items {
        display: flex;
        align-items: center;
        list-style: none;
        height: 100%;

        & li {
          height: 100%;

          & .navbar-menu-items-1 {
            height: 100%;
            display: flex;
            align-items: center;
            color: #000;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            padding: 0 14px;
          }
        }
      }
    }

    & .nav-mid {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    & .nav-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 20px;

      & .items-social {
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 0 20px;

        & .link {
          display: flex;
          align-items: center;

          & i {
            font-size: 18px;
            cursor: pointer;
          }
        }
      }

      & .items-cart {
        height: 100%;
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 0 20px;
        cursor: pointer;

        &:hover {
          color: #6a5950;

          & .cart {
            & span {
              background-color: #6a5950;
            }
          }
        }

        & .amount {
          & span {
            font-size: 16px;
            font-weight: 600;
            line-height: 44px;
          }
        }

        & .cart {
          position: relative;

          & i {
            font-size: 24px;
          }

          & span {
            position: absolute;
            font-family: "Montserrat", sans-serif;
            font-size: 11px;
            font-weight: bold;
            font-style: normal;
            line-height: 17px;
            letter-spacing: -0.5px;
            box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.3);
            border-radius: 99px;
            top: -5px;
            right: -15px;
            height: 18px;
            min-width: 18px;
            text-align: center;
            z-index: 3;
            color: #fff;
            background-color: #312e39;
          }
        }
      }

      & .items-infor {
        cursor: pointer;

        & i {
          font-size: 24px;
        }
      }
    }
  }
}
</style>
