<template>
  <router-link to="/user/cart">
    <img src="@/assets/images/cart.png" alt="cart logo" width="80px" />
  </router-link>
  <router-link to="/">
    <img src="@/assets/images/likeLogo.png" alt="like logo" width="80px" />
  </router-link>
  <ul class="navbar-nav">
    <li class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
      >
        <img src="@/assets/images/userLogo.png" alt="" width="80px" />
      </a>
      <ul class="dropdown-menu">
        <router-link to="/user/personal-info  " class="dropdown-item"
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
</script>
