import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/DashboardProperties.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  // Rutas que requieren Autorizacion
  {
    path: "/logout",
    name: "Logout",
    meta: { requiresAuth: true },
    component: () => import("../views/Logout.vue"),
  },
  {
    path: "/myproperties",
    name: "MyProperties",
    meta: { requiresAuth: true },
    component: () => import("../views/PropertiesForUser.vue"),
  },
  {
    path: "/addproperty",
    name: "AddProperty",
    meta: { requiresAuth: true },
    component: () => import("../views/AddProperty.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let isLoggin = store.getters.token_authorized;
  if (!isLoggin && localStorage.getItem("access_token")) {
    store.dispatch("currentUser");
  }
  //console.log("Token-router: ", isLoggin);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggin) {
      next({
        name: "Login",
      });
    } else {
      next();
    }
  } else {
    // check if user is successfully logged in
    let { name } = to;
    if (isLoggin && name === "Login") {
      next({ name: "Home" });
    } else {
      next(); // make sure to always call next()!
    }
  }
});

export default router;
