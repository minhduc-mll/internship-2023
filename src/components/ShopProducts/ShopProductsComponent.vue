<template>
  <div class="products">
    <div class="products-nav">
      <router-link to="/" class="link">Home</router-link>
      <span> / </span>
      <router-link to="/shop" class="link" @click="app.setCategory('')">Shop</router-link>
      <template v-if="app.category.value.id">
        <span> / </span>
        <router-link to="" class="link" @click="app.setCategory()">{{ app.category.value.name }}</router-link>
      </template>
    </div>
    <div class="products-header">
      <h1 class="header-title">{{ app.category.value.name }}</h1>
    </div>
    <div class="products-filter">
      <div class="filter-count">Showing {{ app.getResultCount() }} of {{ app.totalProducts.value }} results</div>
      <select name="orderby" class="orderby" v-model="app.sortedBy.value">
        <template v-for="option of app.sortedOptions" :key="option.id">
          <option
            :value="option.value"
            :selected="app.sortedBy.value === option.value"
            @click="app.handleSortClick(option.value)"
          >
            {{ option.title }}
          </option>
        </template>
      </select>
    </div>
    <ul class="products-list">
      <li class="products-item" v-for="product of app.filterProducts.value" :key="product.id">
        <ProductCardComponent :product="product"></ProductCardComponent>
      </li>
    </ul>
    <div class="products-pagination">
      <ul class="page-numbers">
        <li v-if="app.pageNumber.value > 1">
          <button class="previous page-numbers" @click="app.handlePageChange(app.pageNumber.value - 1)">
            <i class="bi bi-arrow-left"></i>
          </button>
        </li>
        <li v-for="page in app.totalPage.value" :key="page">
          <button
            class="page-numbers"
            :class="{ active: app.pageNumber.value === page }"
            @click="app.handlePageChange(page)"
          >
            {{ page }}
          </button>
        </li>
        <li v-if="app.pageNumber.value < app.totalPage.value">
          <button class="next page-numbers" @click="app.handlePageChange(app.pageNumber.value + 1)">
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
import type { Ref } from "vue";
import { useProductsStore } from "@/stores/products.store";
import type { ProductModel } from "@/models/product.model";

const app = defineClassComponent(
  class Component extends BaseComponent {
    public productsStore = useProductsStore();
    public sortedOptions = [
      { id: 1, value: "default", title: "Default sorting" },
      { id: 2, value: "popularity", title: "Sort by popularity" },
      { id: 3, value: "rating", title: "Sort by average rating" },
      { id: 4, value: "lastest", title: "Sort by latest" },
      { id: 5, value: "price-asc", title: "Sort by price: low to high" },
      { id: 6, value: "price-desc", title: "Sort by price: high to low" },
    ];
    public products: Ref<Array<ProductModel>> = this.ref([]);
    public pageSize: Ref<number> = this.ref(18);
    public pageNumber: Ref<number> = this.ref(1);
    public sortedBy: Ref<string> = this.ref(this.sortedOptions[0].value);

    public constructor() {
      super();
    }

    public category = this.computed(() => {
      return this.productsStore.category;
    });

    public filterProducts = this.computed(() => {
      let products = this.products.value;
      if (this.sortedBy.value === "default") {
        products = this.productsStore.getSortedProducts(products, "id");
      } else if (this.sortedBy.value === "popularity") {
        // products = this.getSortedProducts(products, "");
      } else if (this.sortedBy.value === "rating") {
        products = this.productsStore.getSortedProducts(products, "star", "desc");
      } else if (this.sortedBy.value === "lastest") {
        // products = this.getSortedProducts(products, "createAt");
      } else if (this.sortedBy.value === "price-asc") {
        products = this.productsStore.getSortedProducts(products, "price");
      } else if (this.sortedBy.value === "price-desc") {
        products = this.productsStore.getSortedProducts(products, "price", "desc");
      } else {
        products = this.productsStore.getSortedProducts(products, "title");
      }
      return this.productsStore.getFilterProducts(products, this.getStartProduct() - 1, this.pageSize.value);
    });

    public totalProducts = this.computed(() => {
      return this.products.value.length || 0;
    });

    public totalPage = this.computed(() => {
      const totalPage = Math.ceil(this.totalProducts.value / this.pageSize.value);
      return totalPage;
    });

    public productsWatcher = this.watch(
      [() => this.productsStore.category, () => this.productsStore.products],
      ([category]) => {
        const productsCategory = this.productsStore.getProductsByCategory(category.name);
        this.products.value = productsCategory;
        this.pageNumber.value = 1;
        this.sortedBy.value = this.sortedOptions[0].value;
      },
    );

    public getStartProduct = () => {
      return (this.pageNumber.value - 1) * this.pageSize.value + 1;
    };

    public getEndProduct = () => {
      return this.pageNumber.value * this.pageSize.value;
    };

    public getResultCount = () => {
      const start = this.getStartProduct();
      const end = this.getEndProduct();
      const total = this.totalProducts.value;
      return `${start}-${total > end ? end : total}`;
    };

    public setCategory = (categoryName?: string) => {
      if (categoryName != null && categoryName != undefined) {
        this.productsStore.setCategoryByName(categoryName);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    public handleSortClick = (sort: string) => {
      this.sortedBy.value = sort;
      this.pageNumber.value = 1;
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    public handlePageChange = (page: number) => {
      this.pageNumber.value = page;
      window.scrollTo({ top: 0, behavior: "smooth" });
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

    & .orderby {
      background-color: transparent;
      color: #666;
      border: none;
      padding: 12px;
      box-shadow: none;
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
