import Vue from "vue";
import Router from "vue-router";
import { Amz, Login } from "@/components";
// import Home from "@/views/Home.vue";
import store from "@/store/index.js";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "Amz",
    component: Amz,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/amz",
    name: "Dashboard",
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
      console.log("porcoddio");
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
