<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3 settings-menu">
        <p class="settings-title">Settings</p>
        <ul class="list-group">
          <li
            class="list-group-item"
            style="
              border: none;
              background-color: transparent;
              white-space: nowrap;
              cursor: pointer;
            "
            @click="menuClicked('personal-info')"
          >
            Profile Details
          </li>
          <li
            class="list-group-item"
            style="
              border: none;
              background-color: transparent;
              white-space: nowrap;
              cursor: pointer;
            "
            @click="menuClicked('password-info')"
          >
            Change Password
          </li>
          <li
            class="list-group-item"
            style="
              border: none;
              background-color: transparent;
              white-space: nowrap;
              cursor: pointer;
            "
            @click="menuClicked('personal-info')"
          >
            Transaction History
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const userData = computed(() => store.state.auth.userLogin);

const emit = defineEmits(["changeComponent"]);

const menuClicked = (option) => {
  emit("changeComponent", option);
};
</script>
