<template>
  <div class="cart-page container">
    <!-- <h1>Your Cart</h1> -->
    <div v-if="cartItems.length === 0" class="empty-cart">
      <div class="container align-items-center">
        <img src="@/assets/images/cartLogo.png" alt="" width="200px" />
        <H1>Your cart still empty.</H1>
        <p>
          Find your favorite items and add to cart<br />
          before check out.
        </p>
        <button class="checkout-button" style="background-color: #0d6a6e">
          Find Products
        </button>
      </div>
    </div>
    <div v-else class="cart-container">
      <div class="cart-items">
        <ul>
          <li v-for="item in cartItems" :key="item.id" class="cart-item">
            <div class="item-image-container">
              <img :src="item.image" alt="Product image" class="item-image" />
              <button
                class="btn btn-danger remove-button"
                @click="removeItem(item.id)"
              >
                Remove
              </button>
            </div>
            <div class="item-details">
              <p>
                <b>{{ item.name }}</b>
              </p>
              <p>{{ item.quantity }}/{{ item.size }}</p>
              <p>Rp {{ item.price }}</p>
              <div class="quantity-selector">
                <button @click="decreaseQuantity(item)">-</button>
                <span>{{ getOrderQuantity(item.id) }}</span>
                <button @click="increaseQuantity(item)">+</button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="cart-summary">
        <div class="card-body">
          <div class="summary-row">
            <div class="summary-left">
              <p>Order Summary</p>
              <p>{{ totalItems }} items</p>
              <p class="shipping-note">Not include shipping fee</p>
            </div>
            <div class="summary-right">
              <p>
                <b>{{ totalPrice }}</b>
              </p>
            </div>
          </div>
          <hr />
        </div>
        <div class="card-footer">
          <button class="checkout-button" @click="goToConfirmationOrder">
            Checkout ({{ totalItems }})
          </button>
        </div>
      </div>
    </div>

    <div class="container my-5">
      <h5 class="mb-5">Other Product</h5>
      <div class="row row-cols-2 row-cols-md-6 g-3">
        <div
          class="col"
          v-for="(product, index) in products.slice(0, 15)"
          :key="product.id"
        > 
          <div class="card h-100">
            <img
              :src="product.image"
              class="card-img-top"
              alt="Product Image"
            />
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
  </div>
</template>

<script setup>
import "@/assets/cart.css";
import { onMounted, computed, ref, resolveComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const cartItems = computed(() => store.state.product.cartItems);

defineProps({
  products: Array,
});

const removeItem = (itemId) => {
  store.dispatch("product/removeItemFromCart", itemId);
};

const orderQuantities = ref({});

const totalItems = computed(() => {
  return Object.values(orderQuantities.value).reduce(
    (total, qty) => total + qty,
    0
  );
});

const goToConfirmationOrder = () => {
  // Assuming you are using Vue Router
  router.push({ name: "ConfirmationOrder" }); // Ensure you have a route named ConfirmationOrder
};

const formatCurrency = (value) => {
  return "Rp " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const totalPrice = computed(() => {
  const total = cartItems.value.reduce((total, item) => {
    const quantity = orderQuantities.value[item.id] || 1;
    const price = parseInt(item.price.replace(/\./g, "").replace(/Rp /g, ""));
    if (isNaN(price)) {
      return total;
    }
    return total + price * quantity;
  }, 0);

  return formatCurrency(total);
});

const getOrderQuantity = (itemId) => {
  return orderQuantities.value[itemId] || 1;
};

const increaseQuantity = (item) => {
  const currentQuantity = orderQuantities.value[item.id] || 1;
  if (currentQuantity < item.quantity) {
    orderQuantities.value[item.id] = currentQuantity + 1;
  }
};

const decreaseQuantity = (item) => {
  const currentQuantity = orderQuantities.value[item.id] || 1;
  if (currentQuantity > 1) {
    orderQuantities.value[item.id] = currentQuantity - 1;
  }
};

onMounted(async () => {
  await store.dispatch("product/getCartData");
  cartItems.value.forEach((item) => {
    orderQuantities.value[item.id] = 1;
  });
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  padding: 20px;
}

h1,
p,
.checkout-button {
  text-align: center;
  margin: 10px 0;
}

.checkout-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

.checkout-button:hover {
  background-color: #45a049;
}
</style>
