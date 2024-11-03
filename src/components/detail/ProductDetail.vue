<template>
  <div v-if="productListStatus">
    <product-description :products="productList"></product-description>
  </div>
  <div v-else></div>
</template>

<script setup>
import ProductDescription from "./ProductDescription.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const productListStatus = ref(false);
const productList = ref();
const route = useRoute();

onMounted(async () => {
  try {
    await store.dispatch("product/getProductData");
    await store.dispatch("product/getProductDetail", route.params.id);
    productList.value = store.state.product.products;
    productListStatus.value = true;
  } catch (error) {
    console.log(error);
  }
});
</script>
