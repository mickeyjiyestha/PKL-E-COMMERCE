<template>
  <div class="confirmation-order-description container">
    <div v-if="cartItems.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div class="confirmation-content">
      <div class="order-summary-container">
        <div class="order-items-card">
          <p>Order Items</p>
          <ul class="confirmation-items-list">
            <li
              v-for="item in cartItems"
              :key="item.id"
              class="confirmation-item"
            >
              <div class="item-image-container">
                <img :src="item.image" alt="Product image" class="item-image" />
              </div>
              <div class="item-details">
                <p class="item-name">
                  <b>{{ item.name }}</b>
                </p>
                <p class="item-quantity-size">
                  {{ getOrderQuantity(item.id) }} | {{ item.size }}
                </p>
                <p class="item-price">Rp {{ item.price }}</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="order-summary-card">
          <div class="card-header">
            <h3>Order Summary</h3>
          </div>
          <div class="card-body">
            <div class="summary-item">
              <span>Order</span>
              <span>Rp {{ totalPrice }}</span>
            </div>
            <div class="summary-item">
              <span>Protection Fee</span>
              <span>Rp 500000</span>
              <!-- Adjust this value as needed -->
            </div>
            <div class="summary-item">
              <span>Shipping</span>
              <span>Rp 200000</span>
              <!-- Adjust this value as needed -->
            </div>
          </div>
          <div class="card-footer">
            <div class="total-to-pay">
              <span>Total to Pay</span>
              <span>Rp {{ totalPrice }}</span>
            </div>
            <button class="order-now-button" @click="handleOrderNow">
              Order Now
            </button>
          </div>
        </div>
      </div>

      <div v-if="isModalVisible" class="modal-overlay">
        <div class="modal-content">
          <p>
            Thank you for shopping at Vintage. You can track your order in the
            Transaction History menu.
          </p>
          <button @click="continueShopping" class="btn-continue-shopping">
            Continue Shopping
          </button>
          <button
            @click="goToTransactionHistory"
            class="btn-transaction-history"
          >
            Go to Transaction History
          </button>
        </div>
      </div>

      <!-- New Cards for Location, Shipping Method, and Payment Method -->
      <div class="additional-cards">
        <div class="info-card location-card">
          <h5>PT. Timedoor Indonesia</h5>
          <p>
            Jl. Tukad Yeh Aya IX No.46, Renon, Denpasar Selatan, Kota Denpasar,
            Bali 80226
          </p>
        </div>
        <div class="info-card shipping-method-card" style="color: grey">
          <h5 style="color: black">Fedex Express Shipping</h5>
          <p>Rp20.000</p>
          <p>Standard Shipping (3-5 days)</p>
        </div>
        <div class="info-card payment-method-card">
          <h5>Payment Method</h5>
          <p>Credit Card (Visa)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/assets/cartconfirmation.css";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps({
  cartItems: Array,
});

const orderQuantities = ref({});
const isModalVisible = ref(false);

// Calculate total items
const totalItems = computed(() => {
  return Object.values(orderQuantities.value).reduce(
    (total, qty) => total + qty,
    0
  );
});

// Calculate total price
const totalPrice = computed(() => {
  return props.cartItems.reduce((total, item) => {
    const quantity = orderQuantities.value[item.id] || 1;
    const price = parseInt(item.price.replace(/\./g, "").replace(/Rp /g, ""));
    return total + (isNaN(price) ? 0 : price * quantity);
  }, 0);
});

// Get order quantity for an item
const getOrderQuantity = (itemId) => {
  return orderQuantities.value[itemId] || 1;
};

// Initialize quantities based on cart items
onMounted(() => {
  props.cartItems.forEach((item) => {
    orderQuantities.value[item.id] = 1; // Default quantity is 1
  });
});

const handleOrderNow = async () => {
  isModalVisible.value = true;

  // Call the namespaced Vuex action to update the status to "Paid"
  await store.dispatch("product/updateCartStatusToPaid");

  // Show the modal or perform other actions after the update
  console.log("Status updated to 'paid' for all items in cart");
};

const continueShopping = () => {
  isModalVisible.value = false;
  router.push("/");
};

const goToTransactionHistory = () => {
  // Logika navigasi ke halaman riwayat transaksi
  console.log("Navigasi ke Riwayat Transaksi");
};
</script>
