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
            <div class="row p-0 m-0">
              <div class="col-6 p-0 m-0">
                <h1 class="poster-title">New Arrivals</h1>
              </div>
              <div class="col-6 p-0 m-0 poster-content">
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
import type { Product } from "@/models/base.model";
import type { Ref } from "vue";
import { ApiConst } from "@/const/api.const";

const products = ApiConst.products;

const app = defineClassComponent(
  class Component extends BaseComponent {
    public products: Ref<Array<Product>> = this.ref(products);

    public constructor() {
      super();
    }
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.new-arrivals-content {
  background-color: #f7f7f7;
  margin: 0;
  padding: 0;

  & .primary-widget {
    padding: 0 40px;

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
        height: 100%;
      }

      & .poster-section {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        margin: 0 36px;

        & .poster-title {
          color: #fff;
          font-family: "Fahkwang", sans-serif;
          font-size: 136px;
          font-weight: 600;
          line-height: 1;
        }

        & .poster-content {
          display: flex;
          align-content: flex-end;
          align-items: flex-end;

          & .poster-desc {
            padding-left: 80px;

            & .divider {
              width: 80px;
              border-top: 2px solid #fff;
              padding: 32px 0;
              margin-bottom: 20px;
            }

            & .text-editor {
              margin-bottom: 22px;
              padding: 0 120px 0 0;

              & span {
                color: #fff;
                font-size: 22px;
                font-weight: 600;
              }
            }
          }
        }
      }
    }
  }

  & .secondary-widget {
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
