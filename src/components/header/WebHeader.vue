<template>
  <header class="container">
    <nav style="margin-top: -15px; margin-bottom: -15px">
      <div
        class="d-flex flex-column flex-md-row justify-content-between align-items-center"
      >
        <!-- Logo -->
        <router-link to="/">
          <img
            src="@/assets/images/aetheriaLogo.png"
            alt="logo"
            width="150px"
          />
        </router-link>

        <!-- Center Items -->
        <div
          class="d-flex align-items-center ms-4 mt-3 mt-md-0"
          style="flex-grow: 1"
        >
          <form class="d-flex me-3" role="search" style="flex-grow: 1">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style="flex-grow: 1"
            />
          </form>

          <!-- Conditional Rendering for Menu Components -->
          <menu-header v-if="!isAuthenticated" />
          <profile-menu v-else />
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import MenuHeader from "./MenuHeader.vue";
import ProfileMenu from "./ProfileMenu.vue";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    MenuHeader,
    ProfileMenu,
  },
  setup() {
    const store = useStore();
    const isAuthenticated = computed(() => !!store.state.auth.token);

    const menuComponent = ref("menu-header");

    const getToken = computed(() => store.state.auth.token);

    // Update menuComponent based on login status
    watch(
      getToken,
      (newValue) => {
        menuComponent.value = newValue ? "profile-menu" : "menu-header";
      },
      { immediate: true }
    );

    return {
      menuComponent,
      isAuthenticated,
    };
  },
};
</script>
