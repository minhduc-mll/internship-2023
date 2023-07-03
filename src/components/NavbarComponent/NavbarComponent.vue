<template>
  <div class="header-container">
    <div class="ast-above-header-wrap">
      <span>Summer Sale. up to 40% off.</span>
    </div>
    <div class="navbar">
      <div class="navbar-left">
        <div class="searchbar">
          <form action="" class="search-form">
            <label>
              <button class="search-submit ast-search-submit" @click.prevent="">
                <span hidden>Search</span>
                <i class="bi bi-search"></i>
              </button>
            </label>
          </form>
        </div>
        <ul class="navbar-menu-items">
          <li><RouterLink to="/shop" class="navbar-menu-items-1">Shop By Categories</RouterLink></li>
          <li><RouterLink to="/new-arrivals" class="navbar-menu-items-1">New Arrivals</RouterLink></li>
          <li><RouterLink to="/collections" class="navbar-menu-items-1">Collections</RouterLink></li>
        </ul>
      </div>
      <div class="nav-mid">
        <RouterLink to="/"><img src="@/assets/img/site-logo.svg" /></RouterLink>
      </div>
      <div class="nav-right">
        <div class="items-social">
          <i class="bi bi-instagram"></i>
          <i class="bi bi-facebook"></i>
          <i class="bi bi-twitter"></i>
          <i class="bi bi-youtube"></i>
        </div>
        <div class="items-cart">
          <span>$0.00</span>
          <i class="bi bi-basket3-fill"></i>
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

const app = defineClassComponent(
  class Component extends BaseComponent {
    public pages: Ref<Array<Page>> = this.ref([
      { id: 1, text: "Home", url: "/" },
      { id: 2, text: "Categories", url: "/categories" },
      { id: 3, text: "NewArrivals", url: "/newarrivals" },
      { id: 4, text: "Collections", url: "/collections" },
    ]);
    public constructor() {
      super();
    }
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

    & .navbar-left {
      display: flex;
      align-items: center;
      gap: 20px;

      & .searchbar {
        & .search-submit {
          border: none;
          background-color: white;
        }
      }

      & .navbar-menu-items {
        display: flex;
        align-items: center;
        list-style: none;

        & .navbar-menu-items-1 {
          text-decoration: none;
          color: black;
          font-family: "Montserrat", sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 0 14px;
        }
      }
    }

    & .nav-right {
      display: flex;
      align-items: center;

      & .items-social {
        display: flex;
        gap: 20px;
        padding-left: 130px;
        padding-right: 25px;

        & i {
          font-size: 18px;
          cursor: pointer;
        }
      }

      & .items-cart {
        display: flex;
        align-items: center;
        gap: 15px;
        padding-left: 25px;
        padding-right: 30px;
        cursor: pointer;

        &:hover {
          color: #6a5950;
        }

        & span {
          font-size: 16px;
          font-weight: 600;
          line-height: 44px;
        }

        & i {
          font-size: 24px;
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
