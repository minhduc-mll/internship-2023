<template>
  <BaseLayout>
    <div class="search-results-content">
      <div class="top-content">
        <h1 class="title">Search Results for: {{ app.searchInput }}</h1>
      </div>
      <div class="bottom-content">
        <div class="desc">
          Sorry, but nothing matched your search terms. Please try again with some different keywords.
        </div>
        <form action="" class="search-form">
          <input type="text" class="search-input" placeholder="Search ..." />
          <button class="g-btn search-btn">Search</button>
        </form>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import BaseLayout from "@/layouts/BaseLayout.vue";

const app = defineClassComponent(
  class Component extends BaseComponent {
    public searchInput: string = "";

    public constructor() {
      super();

      this.searchInput = this.searchParams.get("s") || "";
    }
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.search-results-content {
  background-color: #f7f7f7;
  margin: 0;
  padding: 64px 75px;

  & .top-content {
    background-color: #eee;
    margin: 0;
    padding: 80px 106px 55px 106px;

    & .title {
      color: #6a5950;
      line-height: 1;
      font-size: 45px;
      font-weight: 600;
      margin-bottom: 4px;
    }
  }

  & .bottom-content {
    background-color: #fff;
    margin: 0;
    padding: 85px 106px;

    & .desc {
      margin-bottom: 16px;
    }

    & .search-form {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 48px;

      & .search-input {
        color: #666;
        margin: 0;
        padding: 12px;
        height: auto;
        border: 1px solid #ddd;
        border-radius: 2px;
        background: #fafafa;
        box-shadow: none;
        transition: all 0.2s linear;

        font-weight: 400;
        font-size: 16px;
        line-height: 26px;
      }

      & .search-btn {
        color: #26222f;
        background-color: transparent;
        padding: 10px 15px;
        border-radius: 2px;
        line-height: 24px;
        border: none;
        font-size: 13px;
        text-transform: uppercase;

        &:hover {
          color: #fff;
          background-color: #26222f;
        }
      }
    }
  }
}
</style>
