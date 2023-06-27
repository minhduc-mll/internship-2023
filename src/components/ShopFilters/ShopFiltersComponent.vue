<template>
  <div class="filters">
    <h1 class="filters-title">Filter by price</h1>
    <div class="filters-price">
      <div class="range-input-wrapper">
        <div class="range-input-progress" style="--low: -0.5%; --height: 100.5%"></div>
        <input
          type="range"
          class="range-input"
          step="1"
          min="40"
          max="200"
          tabindex="0"
          v-model="app.amountStart.value"
          style="z-index: 20"
        />
        <input
          type="range"
          class="range-input"
          step="1"
          min="40"
          max="200"
          tabindex="0"
          v-model="app.amountEnd.value"
          style="z-index: 20"
        />
      </div>
      <div class="range-text">
        <span class="amount">
          <span class="currency-symbol">$</span>
          <span>{{ app.amountStart.value }}</span>
        </span>
        <span class="amount">
          <span class="currency-symbol">$</span>
          <span>{{ app.amountEnd.value }}</span>
        </span>
      </div>
      <div class="actions">
        <button class="g-btn reset-btn">RESET</button>
        <button class="g-btn apply-btn">APPLY</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
import type { Ref } from "vue";

const app = defineClassComponent(
  class Component extends BaseComponent {
    public amountStart: Ref<number> = this.ref(40);
    public amountEnd: Ref<number> = this.ref(200);

    public constructor() {
      super();
    }
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";

.filters {
  background-color: #fff;
  width: 100%;
  padding: 32px;
  margin-bottom: 32px;

  & .filters-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  & .filters-price {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    & .range-input-wrapper {
      position: relative;
      padding: 0;
      margin: 15px 0;
      border: 0;
      border-radius: 4px;
      height: 3px;
      box-shadow: none;
      background-color: #ededed;

      & .range-input-progress {
        left: 0;
        position: absolute;
        width: 100%;
        height: 3px;
        --range-color: #ddd1c1;
        top: -1px;
      }

      & .range-input {
        display: block;
        position: absolute;
        width: 100%;
        height: 0;
        margin: 0;
        border: 0;
        left: 0;
        top: 0;
      }
    }

    & .range-text {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px 0;

      & .amount {
        & span {
          font-size: 0.875em;
          font-weight: 700;
        }
      }
    }

    & .actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    & .reset-btn,
    .apply-btn {
      line-height: 1;
      padding: 15px;
    }
  }
}
</style>
