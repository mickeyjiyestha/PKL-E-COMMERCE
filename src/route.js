import HomePage from "./components/pages/HomePage.vue";
import LoginPage from "./components/pages/LoginPage.vue";
import NewProductPage from "./components/pages/NewProductPage.vue";
import ProductPage from "./components/pages/ProductPage.vue";
import SignupPage from "./components/pages/SignupPage.vue";

export const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/login",
    name: "loginpage",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "signuppage",
    component: SignupPage,
  },
  {
    path: "/products",
    name: "productpage",
    component: ProductPage,
  },
  {
    path: "/new-product",
    name: "newProductPage",
    component: NewProductPage,
  },
];
