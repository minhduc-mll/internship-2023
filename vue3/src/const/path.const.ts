import type { RouteRecordRaw } from "vue-router";
import HomeViewVue from "@/views/home/HomeView.vue";
import LoginViewVue from "@/views/login/LoginView.vue";
import TodoViewVue from "@/views/todo/TodoView.vue";

export class PathConst {
  public static home: Route = {
    path: "/",
    name: "home",
    component: HomeViewVue,
    meta: {
      title: "title.home",
    },
  };

  public static login: Route = {
    path: "/login",
    name: "login",
    component: LoginViewVue,
    meta: {
      title: "Login",
    },
  };

  public static todo: Route = {
    path: "/todo",
    name: "todo",
    component: TodoViewVue,
    meta: {
      title: "TodoApp",
    },
  };
}

export type Route = RouteRecordRaw;
