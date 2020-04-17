import Vue from "vue";
import Router from "vue-router";
import { Login } from "@/components";
import { Amz, Items, Price, Main, Parametri } from "@/views";
import store from "@/store/index.js";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "Amz",
    component: Amz,
    meta: {
      title: "Homepage",
      requiresAuth: true,
      metaTags: [
        {
          name: "description",
          content: "Homepage",
        },
      ],
    },
  },
  {
    path: "/amz",
    name: "Dashboard",
    component: Amz,
    meta: {
      requiresAuth: true,
      title: "Homepage",
      metaTags: [
        {
          name: "description",
          content: "Homepage",
        },
      ],
    },
  },
  {
    path: "/items",
    name: "Items",
    component: Items,
    meta: {
      requiresAuth: true,
      title: "Items",
      metaTags: [
        {
          name: "items",
          content: "Items Dashboard",
        },
      ],
    },
  },
  {
    path: "/price",
    name: "Price",
    component: Price,
    meta: {
      requiresAuth: true,
      title: "Price",
      metaTags: [
        {
          name: "Price",
          content: "Price Dashboard",
        },
      ],
    },
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
    meta: {
      requiresAuth: true,
      title: "Main",
      metaTags: [
        {
          name: "Main",
          content: "Main Dashboard",
        },
      ],
    },
  },
  {
    path: "/parametri",
    name: "Parametri",
    component: Parametri,
    meta: {
      requiresAuth: true,
      title: "Parametri",
      metaTags: [
        {
          name: "Parametri",
          content: "Lista Parametri",
        },
      ],
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
      metaTags: [
        {
          name: "description",
          content: "Reevo dashboard login page",
        },
      ],
    },
  },
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = "Reevo |" + " " + to.meta.title;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
