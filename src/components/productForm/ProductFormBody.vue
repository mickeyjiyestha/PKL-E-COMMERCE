<template>
  <li class="list-group-item">
    <form class="container">
      <div>
        <p class="my-3 fs-5 fw-semibold">General Information</p>
        <div>
          <div class="mb-3">
            <base-input
              type="text"
              identity="category"
              label="Identity"
              placeholder="Product category"
            >
            </base-input>
          </div>

          <div class="mb-3">
            <base-input
              type="text"
              identity="color"
              label="Color"
              placeholder="Product color"
            >
            </base-input>
          </div>

          <div class="mb-3">
            <base-input
              type="text"
              identity="decription"
              label="Description"
              placeholder="Product description"
            >
            </base-input>
          </div>

          <div class="mb-3">
            <base-input
              type="file"
              identity="productImage"
              label="Choose Product Image"
            >
            </base-input>
          </div>

          <div class="mb-3">
            <base-input
              type="text"
              identity="name"
              label="Name"
              placeholder="Product name"
            >
            </base-input>
          </div>

          <div class="mb-">
            <base-input
              type="text"
              identity="price"
              label="Price"
              placeholder="Product price"
            >
            </base-input>
          </div>

          <div class="mb-3">
            <base-input type="text" identity="shipping" label="Shipping">
            </base-input>
          </div>

          <div class="mb-3">
            <base-input
              type="text"
              identity="size"
              label="Size"
              placeholder="Product size"
            >
            </base-input>
          </div>

          <base-button class="submit-recipe-btn px-3 py-2 ms-1">
            Submit
          </base-button>
        </div>
      </div>
    </form>
  </li>
</template>

<script setup>
import "@/assets/base.css";
import BaseButton from "../ui/BaseButton.vue";
import BaseInput from "../ui/BaseInput.vue";
</script>
