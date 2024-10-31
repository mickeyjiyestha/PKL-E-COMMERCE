<template>
  <div class="container my-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5>Popular items</h5>
      <a href="products.html" class="text-decoration-none">See all</a>
    </div>
    <div class="row row-cols-2 row-cols-md-6 g-3">
      <div class="col" v-for="(product, index) in products" :key="product.id">
        <div class="card h-100">
          <img :src="product.image" class="card-img-top" alt="Product Image" />
          <div class="card-body">
            <p class="card-title">{{ product.price }}</p>
            <p class="card-text">{{ product.name }}</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">
              {{ product.size }} / {{ product.color }} ♥ {{ product.like }}
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex"; // Import useStore untuk mengakses Vuex

const store = useStore(); // Mengakses store
const products = ref([]); // Referensi reaktif untuk menyimpan produk

onMounted(async () => {
  await store.dispatch("product/getProductData"); // Memanggil action untuk mendapatkan data produk
  products.value = store.state.product.products; // Menyimpan data produk dari store ke referensi
});
</script>
