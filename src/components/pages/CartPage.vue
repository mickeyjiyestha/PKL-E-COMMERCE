<template>
  <cart-description :products="productList"></cart-description>
</template>

<script setup>
import CartDescription from "../cart/CartDescription.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const productList = ref([]);
const route = useRoute();

onMounted(async () => {
  try {
    await store.dispatch("product/getProductData");
    await store.dispatch("product/getProductDetail", route.params.id);
    productList.value = store.state.product.products;   
    console.log(productList.value); 
  } catch (error) {
    console.log(error);
  }
});
</script>
