<template>
  <BaseLayout>
    <div class="not-found-content">
      <div class="wrapper">
        <div class="top-content">
          <h1 class="title">This page doesn't seem to exist.</h1>
        </div>
        <div class="bottom-content">
          <div class="desc">It looks like the link pointing here was faulty. Maybe try searching?</div>
          <form action="" class="search-form">
            <input type="text" class="search-input" placeholder="Search ..." />
            <button class="search-btn"><i class="bi bi-search"></i></button>
          </form>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import BaseLayout from "@/layouts/BaseLayout.vue";

const app = defineClassComponent(class View extends BaseComponent {});
</script>

<style scoped lang="scss">
.not-found-content {
  background-color: #f7f7f7;
  margin: 0;
  padding: 64px 75px;

  & .wrapper {
    background-color: #fff;
    text-align: center;
    margin: 0;
    padding: 85px 106px;

    & .top-content {
      margin-bottom: 24px;

      & .title {
        color: #6a5950;
        font-size: 136px;
        font-weight: 600;
        line-height: 1;
      }
    }

    & .bottom-content {
      & .desc {
        color: #312e39;
        font-size: 24px;
        font-weight: 700;
        line-height: 1;
        margin-bottom: 32px;
      }

      & .search-form {
        position: relative;
        max-width: 370px;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fafafa;

        & .search-input {
          width: 100%;
          color: #666;
          margin: 0;
          padding: 16px 45px 16px 15px;
          height: auto;
          border: 1px solid #ddd;
          border-radius: 2px;
          background-color: inherit;
          box-shadow: none;
          transition: all 0.2s linear;

          font-weight: 400;
          font-size: 16px;
          line-height: 26px;
        }

        & .search-btn {
          position: absolute;
          padding: 15px;
          outline: none;
          border: none;
          right: 1px;
          background-color: inherit;
        }
      }
    }
  }
}
</style>
