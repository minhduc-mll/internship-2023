<template>
  <BaseLayout>
    <div class="product-content">
      <div class="product-container">
        <div class="product-gallery">
          <img :src="product.image" :alt="product.title" class="gallery-thumbnail" />
          <div class="gallery-onsale" v-if="app.product.deals > 0">
            <span>Sale!</span>
          </div>
          <button class="gallery-trigger">
            <i class="bi bi-search"></i>
          </button>
        </div>
        <div class="product-summary">
          <router-link to="" class="link summary-category">Accessories</router-link>
          <h2 class="summary-title">{{ app.product.title }}</h2>
          <div class="summary-price" v-if="app.product.deals > 0">
            <span class="amount-del">
              <span class="currency-symbol">$</span>
              <span>{{ app.product.price.toFixed(2) }}</span>
            </span>
            <span class="amount-ins">
              <span class="currency-symbol">$</span>
              <span>{{ app.product.deals.toFixed(2) }}</span>
            </span>
          </div>
          <div class="summary-price" v-else>
            <span class="amount-ins">
              <span class="currency-symbol">$</span>
              <span>{{ app.product.price.toFixed(2) }}</span>
            </span>
          </div>
          <div class="summary-detail">
            Cras in blandit semper eget interdum lacus ultrices ultricies malesuada magna nullam velit, elit scelerisque
            imperdiet natoque mi velit volutpat quis nibh sagittis orci sem orci sit feugiat mauris, auctor mauris
            malesuada lectus ut dictum massa turpis a quis tellus aliquam amet malesuada enim ac orci leo arcu justo
            blandit.
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
              <router-link to="" class="product-category">Accessories</router-link>
            </span>
          </div>
        </div>
        <div class="product-desc">
          <ul class="product-tabs">
            <li class="tab-description active">Description</li>
            <li class="tab-description">Reviews (0)</li>
          </ul>
          <div class="tab-panel-desc">
            <span>
              Cras in blandit semper eget interdum lacus, enim aliquet ut quam tincidunt volutpat congue mauris nibh
              justo, magnis amet velit nam mauris sociis amet neque mauris interdum ultrices nisi phasellus libero nunc.
            </span>
            <span>
              Ut ultrices ultricies malesuada magna nullam velit, elit scelerisque imperdiet natoque mi velit volutpat
              quis nibh sagittis orci sem orci sit feugiat mauris, auctor mauris malesuada lectus ut dictum massa turpis
              a quis tellus aliquam amet malesuada enim ac orci leo arcu justo blandit ut eu ornare cras. Orci risus
              magna est vitae enim sit turpis sed gravida dignissim cras dictum in metus id.
            </span>
            <span>
              Venenatis sed tristique etiam risus odio sem scelerisque interdum non a tellus, fermentum cras luctus
              felis.
            </span>
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
import type { Product } from "@/models/base.model";
import type { Ref } from "vue";
import { ApiConst } from "@/const/api.const";

const product = ApiConst.product;
const products = ApiConst.products;

const app = defineClassComponent(
  class Component extends BaseComponent {
    public product: Product = this.reactive(product);
    public products: Ref<Array<Product>> = this.ref(products);

    public constructor() {
      super();
    }
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
        width: 720px;
        height: 960px;
        border: none;
        max-width: none;
        max-height: none;
        object-fit: cover;
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
