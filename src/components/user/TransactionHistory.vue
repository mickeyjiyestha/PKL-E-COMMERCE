<template>
  <ul class="list-group">
    <li class="list-group-item">
      <div
        class="d-flex flex-sm-row flex-column justify-content-between align-items-sm-center"
      >
        <div class="mb-3 mb-sm-0">
          <p class="my-0 fs-4 fw-semibold">Transaction History</p>
          <p class="my-0 text-secondary">Your paid items will be listed here</p>
        </div>
      </div>
    </li>
    <li class="list-group-item">
      <p class="mt-2 mb-4 fs-5 fw-semibold">Paid Cart Items</p>
      <div class="row">
        <!-- Loop through paidCartItems and display each item -->
        <user-cart-card
          v-for="cartItem in paidCartItems"
          :key="cartItem.id"
          :cart-item="cartItem"
          :buttonName="['Delete']"
          @btnRemove="deleteCartItem(cartItem.id)"
        >
          <!-- Display created date in a readable format -->
          <p>{{ new Date(cartItem.createdAt).toDateString() }}</p>
        </user-cart-card>
        <!-- Show message if no paid items are found -->
        <p v-if="paidCartItems.length === 0" class="text-center text-secondary">
          No paid items found.
        </p>
      </div>
    </li>
  </ul>
</template>

<script setup>
import UserCartCard from "./UserCartCard.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

// Dispatch fetchPaidCartItems action on component mount to load paid items
onMounted(() => {
  console.log("User ID:", store.state.auth.userLogin.userId);
  store.dispatch("auth/fetchPaidCartItems").then(() => {
    console.log("Paid Cart Items:", store.state.auth.paidCartItems);
  });
});

// Computed property to access paidCartItems from Vuex store
const paidCartItems = computed(() => store.state.auth.paidCartItems);

// Method to delete a cart item
const deleteCartItem = async (id) => {
  try {
    await store.dispatch("cart/deleteCartItem", id); // Adjust the action name based on your Vuex store setup
  } catch (error) {
    console.error("Error deleting cart item:", error);
  }
};
</script>
