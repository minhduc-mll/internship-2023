<template>
  <BaseLayout>
    <div class="collections-content">
      <div class="top-content">
        <div class="widget-wrap">
          <h1 class="heading-title">Collections</h1>
          <div class="heading-images">
            <div class="row m-0 p-0">
              <div class="col-4 m-0 p-0">
                <img
                  src="https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-featured-collection-4.jpg"
                  alt=""
                />
              </div>
              <div class="col-4 m-0 p-0">
                <img
                  src="https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-featured-collection-3.jpg"
                  alt=""
                />
              </div>
              <div class="col-4 m-0 p-0">
                <div class="row-6 m-0 p-0">
                  <img
                    src="https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-featured-collection-2.jpg"
                    alt=""
                  />
                </div>
                <div class="row-6 m-0 p-0">
                  <img
                    src="https://websitedemos.net/fashion-designer-boutique-02/wp-content/uploads/sites/917/2021/07/fashion-designer-featured-collection-1.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="heading-content">
            <div class="row m-0 p-0">
              <div class="col-4 m-0 p-0">
                <h2 class="title">Pre Fall 2021</h2>
              </div>
              <div class="col-8 m-0 p-0">
                <div class="desc">
                  <div class="divider">
                    <div class="divider-separator"></div>
                  </div>
                  <div class="text-editor">
                    <span>
                      Faucibus parturient dignissim nisi, magna ullamcorper facilisi tincidunt nulla et morbi sed in
                      risus vestibulum consectetur arcu id eu pulvinar quis turpis luctus congue vitae ipsum egestas
                      nunc, ornare massa commodo.
                    </span>
                  </div>
                  <button class="g-btn">Discover More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import BaseLayout from "@/layouts/BaseLayout.vue";

const app = defineClassComponent(
  class Component extends BaseComponent {
    public constructor() {
      super();
    }
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.collections-content {
  background-color: #f7f7f7;
  margin: 0;
  padding: 0;

  & .top-content {
    padding: 40px 40px 104px 40px;
  }

  & .widget-wrap {
    margin: 0 36px;

    & .heading-title {
      color: #26222f;
      font-size: 136px;
      font-weight: 600;
      line-height: 1;
      font-family: "Fahkwang", sans-serif;
      margin-bottom: 20px;
    }

    & .heading-images {
      margin-top: 40px;

      & img {
        width: 100%;
        max-width: 100%;
        height: auto;
      }
    }

    & .heading-content {
      & .title {
        font-family: "Fahkwang", sans-serif;
        font-size: 56px;
        font-weight: 600;
        line-height: 70px;
      }
    }

    & .desc {
      padding-right: 80px;

      & .divider {
        width: 100%;
        padding: 40px 0;
        margin-bottom: 20px;

        & .divider-separator {
          width: 80px;
          border-top: 2px solid #000;
        }
      }

      & .text-editor {
        margin-bottom: 20px;

        & span {
          word-wrap: break-word;
        }
      }
    }
  }
}
</style>
