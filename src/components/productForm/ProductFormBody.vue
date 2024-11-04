<template>
  <li class="list-group-item">
    <form class="container card p-3" @submit.prevent="addNewProduct">
      <div class="card-body">
        <p class="my-3 fs-5 fw-semibold">General Information</p>

        <div class="mb-3">
          <base-input
            type="text"
            identity="category"
            label="Category"
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
            placeholder="Product shippping"
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

        <div class="mb-3">
          <base-input
            type="text"
            identity="city"
            label="City"
            placeholder="City"
            v-model="productData.city"
          />
        </div>

        <div class="mb-3">
          <base-input
            type="text"
            identity="condition"
            label="Condition"
            placeholder="Product Condition"
            v-model="productData.condition"
          />
        </div>

        <div class="mb-3">
          <base-input
            type="text"
            identity="quantity"
            label="Quantity"
            placeholder="Product quantity"
            v-model="productData.quantity"
          />
        </div>

        <div class="mb-3">
          <base-input
            type="text"
            identity="like"
            label="Like"
            placeholder="Product like"
            v-model="productData.like"
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
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const productData = ref({
  category: "",
  color: "",
  description: "",
  image: "",
  name: "",
  price: "",
  shipping: "",
  size: "",
  city: "",
  condition: "",
  quantity: "",
  like: "",
});

const checkImage = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    productData.value.image = reader.result;
  };
  reader.readAsDataURL(file);
};

const store = useStore();
const router = useRouter();

const addNewProduct = async () => {
  const route = router.currentRoute.value;

  if (props.isEdit) {
    await store.dispatch("product/updateProduct", {
      id: route.params.id,
      newProduct: productData.value,
    });
  } else {
    await store.dispatch("product/addNewProduct", productData.value);
  }

  router.push("/user/user-product");
};

const props = defineProps({
  isEdit: { type: Boolean, default: false },
});

onMounted(() => {
  if (props.isEdit) {
    productData.value = store.state.product.productDetail;
  }
});
</script>
