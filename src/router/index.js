import { createRouter, createWebHistory } from "vue-router";

import store from "../store";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      authRequired: "no-user",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      authRequired: "no-user",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      authRequired: "no-user",
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      authRequired: "user-only",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authRequired = to.meta.authRequired;

  if (authRequired === "no-user") {
    if (!store.getters["auth/isLoggedIn"]) {
      next();
    } else {
      next("/dashboard");
    }
  } else if (authRequired === "user-only") {
    if (store.getters["auth/isLoggedIn"]) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
