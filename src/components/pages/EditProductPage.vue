<template>
  <main>
    <div class="container-md my-5 py-5">
      <product-form
        v-if="detailData && !isLoading"
        :productData="detailData"
        :isEdit="true"
      />
    </div>
  </main>
</template>

<script setup>
import ProductForm from "../productForm/ProductForm.vue";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();
const detailData = ref({});
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  const productId = route.params.id;

  await store.dispatch("product/getProductDetail", productId);

  detailData.value = store.state.product.productDetail;
  isLoading.value = false;
});
</script>
