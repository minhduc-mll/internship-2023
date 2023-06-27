import type { RouteRecordRaw } from "vue-router";
import HomeViewVue from "@/views/Home/HomeView.vue";
import ShopViewVue from "@/views/Shop/ShopView.vue";
import NewArrivalsViewVue from "@/views/NewArrivals/NewArrivalsView.vue";
import CollectionsViewVue from "@/views/Collections/CollectionsView.vue";
import SearchResultsViewVue from "@/views/SearchResults/SearchResultsView.vue";
import ProductViewVue from "@/views/Product/ProductView.vue";
import TestViewVue from "@/components/ShoppingCart/ShoppingCart.vue";
import { SearchParams } from "@/plugins/params.plugin";

export class PathConst {
  public static home: Route = {
    path: "/",
    name: "Home",
    component: HomeViewVue,
    meta: {
      title: "title.home",
    },
  };

  public static shop: Route = {
    path: "/shop",
    name: "Shop",
    component: ShopViewVue,
    meta: {
      title: "Shop",
    },
  };

  public static newArrivals: Route = {
    path: "/new-arrivals",
    name: "New Arrivals",
    component: NewArrivalsViewVue,
    meta: {
      title: "New Arrivals",
    },
  };

  public static collections: Route = {
    path: "/collections",
    name: "Collections",
    component: CollectionsViewVue,
    meta: {
      title: "Collections",
    },
  };

  public static search: Route = {
    path: "/search",
    name: "Search",
    component: SearchResultsViewVue,
    meta: {
      title: `You Search For ${new SearchParams().get("s")}`,
    },
  };

  public static product: Route = {
    path: "/product",
    name: "Product",
    component: ProductViewVue,
    meta: {
      title: "Product",
    },
  };

  public static test: Route = {
    path: "/test",
    name: "test",
    component: TestViewVue,
    meta: {
      title: "Test",
    },
  };
}

export type Route = RouteRecordRaw;
