<template>
  <div class="products">
    <div class="products-nav">
      <router-link to="/" class="link">Home</router-link>
      <span> / </span>
      <router-link to="" class="link">{{ app.category.value }}</router-link>
    </div>
    <div class="products-header">
      <h1 class="header-title">{{ app.category.value }}</h1>
    </div>
    <div class="products-filter">
      <div class="filter-count">Showing {{ app.getResultCount() }} of {{ app.getTotalProducts() }} results</div>
      <form class="filter-ordering">
        <select name="orderby" class="orderby">
          <option value="menu_order" selected>Default sorting</option>
          <option value="popularity">Sort by popularity</option>
          <option value="rating">Sort by average rating</option>
          <option value="date">Sort by latest</option>
          <option value="price">Sort by price: low to high</option>
          <option value="price-desc">Sort by price: high to low</option>
        </select>
      </form>
    </div>
    <ul class="products-list">
      <li class="products-item" v-for="product of app.products.value" :key="product.id">
        <ProductCardComponent :product="product"></ProductCardComponent>
      </li>
    </ul>
    <div class="products-pagination">
      <ul class="page-numbers">
        <li v-if="app.pageNumber.value > 1">
          <button class="previous page-numbers" @click="app.pageNumber.value--">
            <i class="bi bi-arrow-left"></i>
          </button>
        </li>
        <li v-for="page in app.totalPage.value" :key="page">
          <button
            class="page-numbers"
            :class="{ active: app.pageNumber.value === page }"
            @click="app.pageNumber.value = page"
          >
            {{ page }}
          </button>
        </li>
        <li v-if="app.pageNumber.value < app.totalPage.value">
          <button class="next page-numbers" @click="app.pageNumber.value++">
            <i class="bi bi-arrow-right"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import ProductCardComponent from "@/components/ProductCard/ProductCardComponent.vue";
import type { ShopProductsProps } from "./ShopProductsComponent";
import type { Ref } from "vue";
import { useProductsStore } from "@/stores/products.store";

const props = defineProps<ShopProductsProps>();

const app = defineClassComponent(
  class Component extends BaseComponent {
    public productsStore = useProductsStore();
    public pageSize: Ref<number> = this.ref(18);
    public pageNumber: Ref<number> = this.ref(1);

    public constructor() {
      super();

      this.onBeforeMount(() => {
        this.productsStore.getProducts();
      });
    }

    public products = this.computed(() => {
      const allProducts = this.productsStore.products;
      const filterProducts = allProducts.filter((_, index) => {
        return index >= this.getStartPage() - 1 && index < this.getEndPage();
      });
      return filterProducts;
    });

    public category = this.computed(() => {
      this.productsStore.getProductsCategory(props.category);
      return props.category;
    });

    public totalPage = this.computed(() => {
      const totalPage = Math.ceil(this.getTotalProducts() / this.pageSize.value);
      return totalPage;
    });

    public getFilterProducts = () => {
      const allProducts = this.productsStore.products;
      const filterProducts = allProducts.filter((_, index) => {
        return index >= this.getStartPage() - 1 && index < this.getEndPage();
      });
      return filterProducts;
    };

    public getStartPage = () => {
      return (this.pageNumber.value - 1) * this.pageSize.value + 1;
    };

    public getEndPage = () => {
      return this.pageNumber.value * this.pageSize.value;
    };

    public getTotalProducts = () => {
      return this.productsStore.products.length || 0;
    };

    public getResultCount = () => {
      const start = this.getStartPage();
      const end = this.getEndPage();
      const total = this.getTotalProducts();
      return `${start}-${total > end ? end : total}`;
    };
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.products {
  background-color: #fff;
  width: 100%;
  padding: 80px 100px;

  & .products-nav {
    margin: 0 0 15px;
    padding: 0;
    font-size: 0.92em;
    color: #777;
  }
  & .products-header {
    margin-bottom: 136px;

    & .header-title {
      color: #6a5950;
      font-size: 136px;
      font-weight: 600;
    }
  }

  & .products-filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;

    & .filter-count {
      line-height: 1;
    }

    & .filter-ordering {
      & .orderby {
        background-color: transparent;
        color: #666;
        border: none;
        padding: 12px;
        box-shadow: none;
      }
    }
  }

  & .products-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    padding: 0;
    margin: 0;
    list-style-type: none;

    & .products-item {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;
    }
  }

  & .products-pagination {
    margin: 0;
    padding: 0;

    & .page-numbers {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 0;
      padding: 0;
      list-style-type: none;

      & li {
        border: 1px solid #6a5950;
        padding: 0;
        overflow: hidden;

        & .page-numbers {
          color: #6a5950;
          border: none;
          outline: none;
          margin: 0;
          padding: 12px;
          min-width: 40px;
          justify-content: center;
          cursor: pointer;
        }

        & .active {
          background-color: #6a5950;
          color: #26222f;
        }
      }
    }
  }
}
</style>
