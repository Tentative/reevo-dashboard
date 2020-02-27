import Vue from "vue";
import Router from "vue-router";
import Amz from "../views/Amz.vue";
import Login from "@/components/Login.vue";
import store from "@/store/index.js";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Amz,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
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
