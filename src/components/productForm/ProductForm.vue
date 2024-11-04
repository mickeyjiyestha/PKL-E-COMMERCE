<template>
  <ul class="list-group">
    <product-form-body
      :isEdit="isEdit"
      :productData="productData"
    ></product-form-body>
  </ul>
</template>

<script setup>
import ProductFormBody from "./ProductFormBody.vue";
import { defineProps } from "vue";

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  productData: {
    type: Object,
    required: true,
  },
});
</script>
