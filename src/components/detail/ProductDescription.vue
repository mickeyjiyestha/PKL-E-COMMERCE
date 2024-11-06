<template>
  <div class="container mt-5">
    <div class="row">
      <!-- Bagian Kiri: Card Gambar Produk -->
      <div class="col-md-6">
        <div class="card mb-3">
          <img
            :src="productDetail.image"
            class="card-img-top"
            alt="Main image"
          />
        </div>
      </div>

      <!-- Bagian Kanan: Card Detail Produk -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="d-flex">
              <h2 class="card-title fs-2">IDR {{ productDetail.price }}</h2>
              <i class="fa-regular fa-heart ms-auto"></i>
            </div>
            <h6 class="card-subtitle mb-2 text-muted">
              {{ productDetail.name }}
            </h6>
            <ul class="d-flex card-text me-5 p-0">
              <li type="none" class="me-4">
                {{ productDetail.quantity }} / {{ productDetail.size }}
              </li>
              <li class="me-4">{{ productDetail.condition }}</li>
              <li>{{ productDetail.city }}</li>
            </ul>
            <hr />
            <h2 class="card-text">Item Description</h2>
            <p>
              {{ productDetail.description }}
            </p>
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <td>Category</td>
                  <td>{{ productDetail.category }}</td>
                </tr>
                <tr>
                  <td>Size</td>
                  <td>{{ productDetail.quantity }}/{{ productDetail.size }}</td>
                </tr>
                <tr>
                  <td>Condition</td>
                  <td>{{ productDetail.condition }}</td>
                </tr>
                <tr>
                  <td>Color</td>
                  <td>{{ productDetail.color }}</td>
                </tr>
                <tr>
                  <td>Uploaded</td>
                  <td>5 hours ago</td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td>{{ productDetail.shipping }}</td>
                </tr>
              </tbody>
            </table>
            <div class="card-footer">
              <button class="btn btnBuyDetail w-100 mb-2" @click="addToCart">
                Buy Now
              </button>
              <button class="btn btnBuyDetail w-100" @click="addToCart">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container my-5">
    <h5>Other Product</h5>
    <div class="row row-cols-2 row-cols-md-6 g-3">
      <div class="col" v-for="(product, index) in products" :key="product.id">
        <router-link
          :to="`/product/${product.id}`"
          style="text-decoration: none"
        >
          <div class="card h-100" style="color: black">
            <img
              :src="product.image"
              class="card-img-top"
              alt="Product Image"
            />
            <div class="card-body">
              <p class="card-title">{{ product.price }}</p>
              <p class="card-text">{{ product.name }}</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">
                {{ product.size }} / {{ product.color }} ♥ {{ product.like }}
              </small>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useStore } from "vuex";

const store = useStore();

const productDetail = computed(() => {
  return store.state.product.productDetail;
});

defineProps({
  products: Array,
});

// Fungsi untuk menambahkan produk ke cart
const addToCart = async () => {
  await store.dispatch("product/addToCart", {
    id: productDetail.value.id, // Tambahkan ID produk
    image: productDetail.value.image, // Tambahkan URL gambar produk
    name: productDetail.value.name,
    price: productDetail.value.price,
    size: productDetail.value.size,
    quantity: productDetail.value.quantity,
    color: productDetail.value.color,
    condition: productDetail.value.condition,
    city: productDetail.value.city,
    description: productDetail.value.description, // Tambahkan deskripsi produk
  });
  alert("Product added to cart!");
};
</script>
