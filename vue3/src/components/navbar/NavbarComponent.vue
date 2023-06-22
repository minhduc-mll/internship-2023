<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Vue</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-for="page of app.pages.value" :key="page.id">
            <a :class="['nav-link', { active: app.isActive.value === page.id }]" aria-current="page" :href="page.url" @click="app.setIsActive(page.id)">{{
              page.text
            }}</a>
          </li>
        </ul>
        <form class="d-flex">
          <button type="button" class="btn btn-outline-light">
            <a class="nav-link" href="/login">LOGIN</a>
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";
// import type { Props } from "./NavbarComponent";
import type { Page } from "./NavbarComponent";
import type { Ref } from "vue";

// const props = defineProps<Props>();
const app = defineClassComponent(
  class Component extends BaseComponent {
    public isActive: Ref<number> = this.ref(1);
    public pages: Ref<Array<Page>> = this.ref([
      { id: 1, text: "Home", url: "/" },
      { id: 2, text: "Todo", url: "/todo" },
    ]);

    public constructor() {
      super();
    }

    public setIsActive = (id: number) => {
      this.isActive.value = id;
      console.log(this.isActive.value);
    };
  },
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";
</style>
