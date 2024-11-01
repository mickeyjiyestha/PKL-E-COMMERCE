<template>
  <li class="list-group-item">
    <form class="container card p-3" @submit.prevent="addNewProduct">
      <div class="card-body">
        <p class="my-3 fs-5 fw-semibold">General Information</p>

        <div class="mb-3">
          <base-input
            type="text"
            identity="category"
            label="Identity"
            placeholder="Product category"
            v-model="productData.category"
          />
        </div>

        <div class="mb-3">
          <base-input
            type="text"
            identity="color"
            label="Color"
            placeholder="Product color"
            v-model="productData.color"
          />
        </div>

        <div class="mb-3">
          <base-input
            type="text"
            identity="description"
            label="Description"
            placeholder="Product description"
            v-model="productData.description"
          />
        </div>

        <div class="mb-3">
          <base-input
            type="file"
            identity="image"
            label="Choose Product Photo"
            @input="checkImage"
          >
          </base-input>
          <div>
            <img
              :src="productData.image"
              :alt="productData.name"
              class="image"
            />
          </div>
        </div>

        <div class="mb-3">
          <base-input
            type="text"
            identity="name"
            label="Name"
            placeholder="Product name"
            v-model="productData.name"
          />
        </div>

        <div class="mb-3">
          <base-input
            type="text"
            identity="price"
            label="Price"
            placeholder="Product price"
            v-model="productData.price"
          />
        </div>

        <div class="mb-3">
          <base-input
            type="text"
            identity="shipping"
            label="Shipping"
            v-model="productData.shipping"
          />
        </div>

        <div class="mb-3">
          <base-input
            type="text"
            identity="size"
            label="Size"
            placeholder="Product size"
            v-model="productData.size"
          />
        </div>

        <base-button class="btn btn-primary w-100 mt-3">Submit</base-button>
      </div>
    </form>
  </li>
</template>

<script setup>
import "@/assets/base.css";
import BaseButton from "../ui/BaseButton.vue";
import BaseInput from "../ui/BaseInput.vue";
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const productData = reactive({
  category: "",
  color: "",
  description: "",
  image: "",
  name: "",
  price: "",
  shipping: "",
  size: "",
});

const checkImage = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    productData.image = reader.result;
  };
  reader.readAsDataURL(file);
};

const store = useStore();
const router = useRouter();

const addNewProduct = async () => {
  const route = router.currentRoute.value;
  await store.dispatch("product/addNewProduct", productData);

  router.push("/");
};
</script>
