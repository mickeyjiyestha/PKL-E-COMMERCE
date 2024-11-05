import { compile } from "vue";
import HomePage from "./components/pages/HomePage.vue";
import LoginPage from "./components/pages/LoginPage.vue";
import NewProductPage from "./components/pages/NewProductPage.vue";
import ProductPage from "./components/pages/ProductPage.vue";
import SignupPage from "./components/pages/SignupPage.vue";
import UserPage from "./components/pages/UserPage.vue";
import ProductDetail from "./components/detail/ProductDetail.vue";
import EditProductPage from "./components/pages/EditProductPage.vue";
import Cookies from "js-cookie";
import { store } from "./store/index";
import CartPage from "./components/pages/CartPage.vue";

function checkAuth() {
  return store.state.auth.token && store.state.auth.isLogin;
}

export const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    beforeEnter: () => {
      checkAuth();
    },
  },
  {
    path: "/user/cart",
    name: "Cart",
    component: CartPage,
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
  {
    path: "/user/:component",
    name: "userPage",
    component: UserPage,
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "loginpage" });
    },
  },
  {
    path: "/product/:id",
    name: "productdetail",
    component: ProductDetail,
  },
  {
    path: "/product/edit/:id",
    name: "editProductPage",
    component: EditProductPage,
  },
];
