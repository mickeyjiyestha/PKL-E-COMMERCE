import "./assets/main.css";
import { createApp } from "vue";
import { store } from "./store/index"; 
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "@/assets/base.css";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./route";

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

const app = createApp(App);
app.use(store); 
app.use(router);
app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
