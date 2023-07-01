<template>
  <BaseLayout>
    <div class="new-arrivals-content">
      <div class="primary-widget">
        <div class="poster">
          <div class="background-overlay"></div>
          <img
            src="https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-template-new-arrival-header-img.jpg"
            alt=""
          />
          <div class="poster-section">
            <div class="poster-container">
              <h1 class="poster-title">New Arrivals</h1>
              <div class="poster-content">
                <div class="poster-desc">
                  <div class="divider"></div>
                  <div class="text-editor">
                    <span>In congue venenatis bibendum viverra sit augue elit sed viverra fames blandit.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="secondary-widget">
        <ul class="products-list">
          <li class="products-item" v-for="product of app.products.value" :key="product.id">
            <ProductCardComponent :product="product"></ProductCardComponent>
          </li>
        </ul>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import BaseLayout from "@/layouts/BaseLayout.vue";
import ProductCardComponent from "@/components/ProductCard/ProductCardComponent.vue";
import { useProductsStore } from "@/stores/products.store";
import type { Ref } from "vue";
import type { ProductModel } from "@/models/product.model";

const app = defineClassComponent(
  class Component extends BaseComponent {
    public productsStore = useProductsStore();
    public products: Ref<Array<ProductModel>> = this.ref([]);

    public constructor() {
      super();

      this.onBeforeMount(() => {
        this.productsStore.fetchAllProducts();
      });
    }

    public productsWatcher = this.watch(
      () => this.productsStore.products,
      (products) => {
        const productsNewArrivals = this.productsStore.getFilterProducts(products, 0, 20);
        this.products.value = productsNewArrivals;
      },
    );
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.new-arrivals-content {
  background-color: #f7f7f7;
  margin: 0;
  padding: 0;
  word-wrap: break-word;
  clear: both;

  & .primary-widget {
    padding: 0 40px;
    min-height: 480px;

    & .poster {
      position: relative;

      & .background-overlay {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #26222f;
        opacity: 0.4;
      }

      & img {
        width: 100%;
        height: 480px;
      }

      & .poster-section {
        width: 100%;
        align-content: center;
        align-items: center;
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);

        & .poster-container {
          display: flex;
          max-width: 1200px;
          margin: auto;

          & .poster-title {
            flex: 1;
            color: #fff;
            font-family: "Fahkwang", sans-serif;
            font-size: 136px;
            font-weight: 600;
            line-height: 1;
          }

          & .poster-content {
            flex: 1;
            display: flex;
            align-content: flex-end;
            align-items: flex-end;

            & .poster-desc {
              padding-left: 80px;

              & .divider {
                width: 80px;
                border-top: 2px solid #fff;
                padding-top: 32px;
                padding-bottom: 32px;
                margin-bottom: 20px;
              }

              & .text-editor {
                margin-bottom: 22px;
                padding: 0 120px 0 0;

                & span {
                  color: #fff;
                  font-size: 22px;
                  font-weight: 600;
                  line-height: 26px;
                }
              }
            }
          }
        }
      }
    }
  }

  & .secondary-widget {
    max-width: 1200px;
    margin: auto;
    padding: 96px 40px 40px 40px;

    & .products-list {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 20px;
      padding: 0;
      margin: 40px 36px;
      list-style-type: none;

      & .products-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 40px;
      }
    }
  }
}
</style>
