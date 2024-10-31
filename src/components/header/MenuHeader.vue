<template>
  <router-link to="/login" class="btn btnlogin-signup me-2">Login</router-link>
  <router-link to="/signup">
    <button type="button" class="btn btnlogin-signup me-2">Sign Up</button>
  </router-link>
  <div class="dropdown">
    <a
      class="btn btnlogin-signup dropdown-toggle"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      EN
    </a>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Action</a></li>
      <li><a class="dropdown-item" href="#">Another action</a></li>
      <li><a class="dropdown-item" href="#">Something else here</a></li>
    </ul>
  </div>
</template>

<script setup>
import "@/assets/base.css";
</script>
