<template>
  <div class="cart-page">
    <h1>Your Cart</h1>
    <div v-if="cartItems.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          <h2>{{ item.name }}</h2>
          <p>Price: {{ item.price }}</p>
          <p>Quantity: {{ item.quantity }}</p>
          <!-- Anda bisa menambahkan detail lain di sini -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

// Mengambil data cart dari state
const cartItems = computed(() => store.state.product.cartItems);

// Mengambil data cart saat komponen di-mount
onMounted(async () => {
  await store.dispatch("product/getCartData");
});
</script>

<style scoped>
.cart-page {
  padding: 20px;
}
</style>
