<template>
  <web-header></web-header>
  <router-view></router-view>
  <web-footer></web-footer>
</template>

<script>
import HomePage from "./components/pages/HomePage.vue";
import WebHeader from "./components/header/WebHeader.vue";
import WebFooter from "./components/footer/WebFooter.vue";
export default {
  components: {
    HomePage,
    WebHeader,
    WebFooter,
  },
};
</script>
