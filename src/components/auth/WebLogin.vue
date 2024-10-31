<template>
  <div class="container d-flex justify-content-center align-items-center mb-6">
    <div
      class="form-container w-50"
      style="background-color: #00949d; color: white"
    >
      <h2 class="form-header">Login to Aetheria</h2>
      <p>Enter your details below</p>
      <form @submit.prevent="login">
        <div class="mb-3">
          <base-input
            type="text"
            identity="email"
            placeholder="Enter your email"
            label="Email"
            v-model="loginData.email"
          >
          </base-input>
        </div>
        <div class="mb-3">
          <base-input
            type="password"
            identity="password"
            placeholder="Enter your password"
            label="Password"
            v-model="loginData.password"
          >
          </base-input>
        </div>
        <base-button
          class="login w-100 my-3"
          style="background-color: #2bced8; color: white"
        >
          Login
        </base-button>
      </form>
    </div>
  </div>
</template>

<script setup>
import BaseButton from "../ui/BaseButton.vue";
import BaseInput from "../ui/BaseInput.vue";
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const login = async () => {
  await store.dispatch("auth/getLoginData", loginData);
  router.push("/");
};

const loginData = reactive({
  email: "",
  password: "",
  isLogin: true,
});
</script>
