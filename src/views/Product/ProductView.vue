<template>
  <BaseLayout>
    <div class="product-content">
      <div class="product-container">
        <div class="product-gallery">
          <img :src="app.product.value.image" :alt="app.product.value.title" class="gallery-thumbnail" />
          <div class="gallery-onsale" v-if="app.product.value.deals">
            <span>Sale!</span>
          </div>
          <button class="gallery-trigger">
            <i class="bi bi-search"></i>
          </button>
        </div>
        <div class="product-summary">
          <router-link :to="'/' + app.product.value.category.toLowerCase()" class="link summary-category">
            {{ app.product.value.category }}
          </router-link>
          <h2 class="summary-title">{{ app.product.value.title }}</h2>
          <div class="summary-price" v-if="app.product.value.deals">
            <span class="amount-del">
              <span class="currency-symbol">$</span>
              <span>{{ app.product.value.price.toFixed(2) }}</span>
            </span>
            <span class="amount-ins">
              <span class="currency-symbol">$</span>
              <span>{{ (app.product.value.price * 0.8).toFixed(2) }}</span>
            </span>
          </div>
          <div class="summary-price" v-else>
            <span class="amount-ins">
              <span class="currency-symbol">$</span>
              <span>{{ app.product.value.price.toFixed(2) }}</span>
            </span>
          </div>
          <div class="summary-detail">
            <span>{{ app.product.value.desc }}</span>
          </div>
          <form action="" class="cart">
            <div class="quantity">
              <input type="number" class="quantity-input" />
            </div>
            <button class="g-btn add-to-card-button">Add to cart</button>
          </form>
          <div class="summary-meta">
            <span class="posted-in"
              >Category:
              <router-link :to="'/' + app.product.value.category.toLowerCase()" class="product-category">
                {{ app.product.value.category }}
              </router-link>
            </span>
          </div>
        </div>
        <div class="product-desc">
          <ul class="product-tabs">
            <li class="tab-description active">Description</li>
            <li class="tab-description">Reviews (0)</li>
          </ul>
          <div class="tab-panel-desc">
            <span>{{ app.product.value.desc }}</span>
          </div>
          <div class="tab-panel-review">
            <div class="comments">
              <span>There are no reviews yet.</span>
            </div>
            <div class="review-form"></div>
          </div>
        </div>
        <div class="product-related">
          <h2 class="related-title">Related products</h2>
          <ul class="related-list">
            <li class="related-item" v-for="product of app.products.value" :key="product.id">
              <ProductCardComponent :product="product"></ProductCardComponent>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "@/layouts/BaseLayout.vue";
import ProductCardComponent from "@/components/ProductCard/ProductCardComponent.vue";
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import type { Ref } from "vue";
import { ProductModel } from "@/models/product.model";
import { useProductsStore } from "@/stores/products.store";

const app = defineClassComponent(
  class Component extends BaseComponent {
    public productsStore = useProductsStore();
    public product: Ref<ProductModel> = this.ref(new ProductModel({}));
    public products: Ref<Array<ProductModel>> = this.ref([]);

    public constructor() {
      super();

      this.onBeforeMount(async () => {
        try {
          const productId = this.route.params.productId.toString();
          await this.productsStore.fetchProduct(productId);
          await this.productsStore.fetchAllProducts();
        } catch (error) {
          console.log(error);
        }
      });
    }

    public productWatch = this.watch(
      () => this.productsStore.product,
      (newProduct) => {
        this.product.value = newProduct;
      },
    );

    public relatedProductsWatch = this.watch(
      [() => this.productsStore.category, () => this.productsStore.products],
      ([category, products]) => {
        const productSCategory = this.productsStore.getProductsByCategory(products, category);
        const filterProducts = this.productsStore.getFilterProducts(productSCategory, 0, 8);
        this.products.value = filterProducts;
      },
    );
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.product-content {
  background-color: #f7f7f7;
  margin: 0;
  padding: 64px 75px;

  & .product-container {
    background-color: #fff;
    margin: 0;
    padding: 85px 106px;

    & .product-gallery {
      position: relative;
      width: 50%;
      float: left;
      margin-bottom: 32px;

      transition: all cubic-bezier(0.795, -0.035, 0, 1) 0.5s;
      margin: 0;
      padding: 0;
      overflow: hidden;

      & .gallery-thumbnail {
        display: block;
        width: 100%;
        max-width: 100%;
        height: auto;
        box-shadow: none;
      }

      & .gallery-onsale {
        position: absolute;
        top: 20px;
        left: 20px;
        transition: all 0.2s;
        z-index: 5;
        cursor: pointer;

        color: #312e39;
        background-color: #fff;
        border-radius: 20px;
        padding: 5px 10px;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);

        & span {
          font-size: 14px;
          font-weight: 400;
          line-height: normal;
          letter-spacing: normal;
        }
      }

      & .gallery-trigger {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 36px;
        height: 36px;
        color: #6a5950;
        background-color: #fff;
        border-radius: 100%;
        border: none;
        outline: none;
        z-index: 9;
      }
    }

    & .product-summary {
      width: 46%;
      float: right;
      margin-bottom: 32px;
      clear: none;

      & .summary-category {
        display: block;
        line-height: 1;
        margin-bottom: 16px;

        &.link {
          text-decoration: none;
          color: #6a5950;
          transition: all 0.2s linear;
        }
      }

      & .summary-title {
        font-size: 30px;
        font-weight: 600;
        line-height: 36px;
        margin-bottom: 15px;
        color: #26222f;
      }

      & .summary-price {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 5px;

        & .amount-del,
        .amount-ins {
          span {
            color: #312e39;
            font-size: 24px;
            font-weight: 700;
            line-height: 20px;
          }
        }

        & .amount-del {
          display: initial;
          opacity: 0.5;

          span {
            font-weight: 400;
            text-decoration: line-through;
          }
        }
      }
    }

    & .product-desc {
      display: block;
      padding-top: 32px;
      margin-bottom: 64px;
      width: 100%;
      clear: both;
    }

    & .product-related {
      & .related-title {
        color: #26222f;
        font-family: "Fahkwang", sans-serif;
        font-size: 56px;
        font-weight: 600;
        line-height: 70px;
        margin-bottom: 40px;
      }

      & .related-list {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 20px;
        padding: 0;
        margin: 0;
        list-style-type: none;

        & .related-item {
          display: flex;
          flex-direction: column;
          margin-bottom: 40px;
        }
      }
    }
  }
}
</style>
