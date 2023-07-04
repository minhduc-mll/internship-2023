import type { RouteRecordRaw } from "vue-router";
import HomeViewVue from "@/views/home/HomeView.vue";
import ShopViewVue from "@/views/Shop/ShopView.vue";
import ProductViewVue from "@/views/Product/ProductView.vue";
import NewArrivalsViewVue from "@/views/NewArrivals/NewArrivalsView.vue";
import CollectionsViewVue from "@/views/Collections/CollectionsView.vue";
import SearchResultsViewVue from "@/views/SearchResults/SearchResultsView.vue";
import CartViewVue from "@/views/Cart/CartView.vue";
import ComingSoonViewVue from "@/views/ComingSoon/ComingSoonView.vue";

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
      title: "title.shop",
    },
  };

  public static category: Route = {
    path: "/shop/:categoryName",
    name: "Category",
    component: ShopViewVue,
    props: true,
    meta: {
      title: "title.category",
    },
  };

  public static product: Route = {
    path: "/shop/:categoryName/:productTitle",
    name: "Product",
    component: ProductViewVue,
    props: true,
    meta: {
      title: "title.product",
    },
  };

  public static newArrivals: Route = {
    path: "/new-arrivals",
    name: "New Arrivals",
    component: NewArrivalsViewVue,
    meta: {
      title: "title.newArrivals",
    },
  };

  public static collections: Route = {
    path: "/collections",
    name: "Collections",
    component: CollectionsViewVue,
    meta: {
      title: "title.collections",
    },
  };

  public static search: Route = {
    path: "/search",
    name: "Search",
    component: SearchResultsViewVue,
    meta: {
      title: "title.search",
    },
  };

  public static cart: Route = {
    path: "/cart",
    name: "Cart",
    component: CartViewVue,
    meta: {
      title: "title.cart",
    },
  };

  public static checkout: Route = {
    path: "/checkout",
    name: "Checkout",
    component: ComingSoonViewVue,
    props: { title: "checkout", message: "Checkout Page" },
    meta: {
      title: "title.checkout",
    },
  };

  public static about: Route = {
    path: "/about",
    name: "About",
    component: ComingSoonViewVue,
    props: { title: "about", message: "About Page" },
    meta: {
      title: "title.about",
    },
  };

  public static contact: Route = {
    path: "/contact",
    name: "Contact",
    component: ComingSoonViewVue,
    props: { title: "contact", message: "Contact Page" },
    meta: {
      title: "title.contact",
    },
  };

  public static comingSoon: Route = {
    path: "/coming-soon",
    name: "Coming Soon",
    component: ComingSoonViewVue,
    props: { title: "comingSoon", message: "Coming Soon Page" },
    meta: {
      title: "title.comingSoon",
    },
  };
}

export type Route = RouteRecordRaw;
