<template>
  <router-link to="/user/cart" class="me-3">
    <div class="position-relative">
      <!-- Cart Icon -->
      <img src="@/assets/images/cart.png" alt="cart logo" width="50px" />

      <!-- Cart Item Count Badge -->
      <span
        v-if="cartItemCount > 0"
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        style="font-size: 0.8rem; padding: 0.3rem 0.6rem; color: white"
      >
        {{ cartItemCount }}
      </span>
    </div>
  </router-link>

  <router-link to="/" class="me-3">
    <img src="@/assets/images/likeLogo.png" alt="like logo" width="50px" />
  </router-link>

  <ul class="navbar-nav">
    <li class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
      >
        <img src="@/assets/images/userLogo.png" alt="" width="50px" />
      </a>
      <ul class="dropdown-menu">
        <router-link to="/user/personal-info" class="dropdown-item"
          ><i class="fa-regular fa-user"></i> Profile
        </router-link>
        <router-link to="" class="dropdown-item"
          ><i class="fa-solid fa-receipt"></i> Order
        </router-link>
        <li><hr class="dropdown-divider" /></li>
        <!-- Logout Button to Open Modal -->
        <li
          class="dropdown-item"
          @click="showLogoutModal = true"
          style="cursor: pointer"
        >
          <i class="fa-solid fa-right-from-bracket"></i>
          Logout
        </li>
      </ul>
    </li>
  </ul>

  <!-- Logout Confirmation Modal -->
  <div
    v-if="showLogoutModal"
    class="modal fade show"
    tabindex="-1"
    style="display: block; background: rgba(0, 0, 0, 0.5)"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Logout</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to logout from Aetheria?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Cancel
          </button>
          <button type="button" class="btn btn-danger" @click="confirmLogout">
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const router = useRouter();

// State for modal visibility
const showLogoutModal = ref(false);

// Close modal function
const closeModal = () => {
  showLogoutModal.value = false;
};

// Confirm logout function
const confirmLogout = () => {
  store.commit("auth/setUserLogout");
  router.push("/");
  closeModal();
};

// Computed property to get the cart item count from Vuex store
const cartItemCount = computed(() => store.state.product.cartItems.length);
</script>

<style scoped>
/* Custom spacing between icons */
.router-link {
  margin-right: 1.5rem; /* Adjust the spacing as desired */
}
</style>
