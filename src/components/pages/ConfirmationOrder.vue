<!-- ConfirmationOrder.vue -->
<template>
  <div class="confirmation-order">
    <ConfirmationOrderDescription :cartItems="cartItems" />
  </div>
</template>

<script setup>
import ConfirmationOrderDescription from "../cart/ConfirmOrderDescription.vue";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const cartItems = computed(() => store.state.product.cartItems);
</script>

<style scoped>
.confirmation-order {
  padding: 20px;
}
.back-button {
  display: inline-block;
  margin-top: 20px;
  text-decoration: none;
}
</style>
