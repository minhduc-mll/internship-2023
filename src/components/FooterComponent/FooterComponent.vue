<template>
  <div class="footer-container">
    <div class="above-footer">
      <div class="above-wrapper">
        <div class="logo">
          <img src="@/assets/img/site-logo-white.svg" />
          <span>Pulvinar aenean dignissim porttitor sed risus urna, pretium quis non id.</span>
          <div class="contact">
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
        </div>
        <div class="infor">
          <span class="title">Information</span>
          <div class="title-items">
            <router-link to="/about" class="link" @click="app.handleScrollToTop">
              <span>About me</span>
            </router-link>
            <router-link to="/#" class="link" @click="app.handleScrollToTop">
              <span>My story</span>
            </router-link>
            <router-link to="/#" class="link" @click="app.handleScrollToTop">
              <span>Awards & achievement</span>
            </router-link>
            <router-link to="/contact" class="link" @click="app.handleScrollToTop">
              <span>Contact</span>
            </router-link>
          </div>
        </div>
        <div class="discover">
          <span class="title">Discover</span>
          <div class="title-items">
            <router-link
              :to="category.url"
              class="link"
              v-for="category of app.categoriesDiscover.value"
              :key="category.id"
              @click="app.handleScrollToTop"
            >
              <span>{{ category.name }}</span>
            </router-link>
          </div>
        </div>
        <div class="locate-us">
          <span class="title">Locate Us</span>
          <div class="title-items">
            <span>CIC Tower, No. 2, 219 Trung Kinh, Yen Hoa, Cau Giay, Hanoi</span>
            <span>Viet Nam</span>
            <span>+84 123-456-7890</span>
            <span>mail@bglobalcorp.com</span>
          </div>
        </div>
      </div>
    </div>
    <div class="below-footer">
      <div class="below-wrapper">
        <div class="below-footer-section-1">
          <span>© 2023 bGlobal Internship. Powered by Truong Minh Duc and Dao Trung Kien</span>
        </div>
        <div class="below-footer-section-2">
          <img src="@/assets/img/fashion-designer-cc-visa-icon.svg" />
          <img src="@/assets/img/fashion-designer-cc-mastercard-icon.svg" />
          <img src="@/assets/img/fashion-designer-cc-discover-icon.svg" />
          <img src="@/assets/img/fashion-designer-cc-apple-pay-icon.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PrimitiveHelper } from "@/helpers/primitive.helper";
import type { CategoryModel } from "@/models/category.model";
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import { useProductsStore } from "@/stores/products.store";

const app = defineClassComponent(
  class Component extends BaseComponent {
    public productsStore = useProductsStore();
    public categoriesDiscover = this.computed(() => this.getRandomCategories(this.productsStore.categories));

    public constructor() {
      super();
    }

    public getRandomCategories = (categories: Array<CategoryModel>) => {
      if (categories.length) {
        const discover: Array<CategoryModel> = [];
        const randomSet: Set<number> = new Set();
        for (let index = 0; index < 4; index++) {
          let categoriesIndex = PrimitiveHelper.getRandomInRange(0, categories.length - 1, 0);
          while (randomSet.has(categoriesIndex)) {
            categoriesIndex++;
            if (categoriesIndex >= categories.length) {
              categoriesIndex = 0;
            }
          }
          randomSet.add(categoriesIndex);
        }
        randomSet.forEach((value) => {
          discover.push(categories[value]);
        });
        return discover;
      }
      return [];
    };

    public handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.footer-container {
  width: 100%;
  display: block;
  background-color: #26222f;

  & .above-footer {
    padding: 80px 40px 48px 40px;
    margin: 0 35.5px;

    & .above-wrapper {
      display: flex;
      align-items: center;
      column-gap: 50px;
      max-width: 1200px;
      margin: auto;

      & .logo {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        gap: 15px;
        flex: 1;

        & span {
          color: #d9d9d9;
          font-family: "Montserrat", sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 25.6px;
        }

        & .contact {
          display: flex;
          flex-wrap: wrap;
          margin-top: 5px;
          text-align: center;
          width: 100%;

          & i {
            color: white;
            margin-right: 24px;
            cursor: pointer;
          }
        }
      }

      & .infor,
      .discover,
      .locate-us {
        flex: 1;
        display: block;
      }

      & .title {
        color: white;
        font-size: 20px;
        font-weight: 600;
        font-family: "Fahkwang", sans-serif;
      }

      & .title-items {
        display: flex;
        align-items: flex-start;
        justify-content: left;
        flex-direction: column;
        margin-top: 30px;

        & span {
          color: #d9d9d9;
          font-family: "Montserrat", sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 25.6px;
        }

        & .link {
          & span {
            cursor: pointer;

            &:hover {
              color: #f7f7f7;
            }
          }
        }
      }
    }
  }

  & .below-footer {
    padding-top: 20px;
    padding-bottom: 20px;
    border-top: 1px solid #4c455f;
    padding-left: 74.5px;
    padding-right: 74.5px;

    & .below-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1200px;
      margin: auto;

      & .below-footer-section-1 {
        & span {
          color: #d9d9d9;
          text-align: left;
          font-size: 13px;
          font-family: "Montserrat", sans-serif;
          font-weight: 300;
        }
      }

      & .below-footer-section-2 {
        display: flex;
        gap: 10px;
      }
    }
  }
}
</style>
