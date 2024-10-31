<template>
  <all-product :products="productList"></all-product>
</template>

<script setup>
import "@/assets/base.css";
import PRODUCT_DATA from "../../product.js";
const productList = PRODUCT_DATA;
import AllProduct from "../product/AllProduct.vue";
</script>
