<template>
  <div class="container my-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5>Popular items</h5>
      <a href="products.html" class="text-decoration-none">See all</a>
    </div>
    <div class="row row-cols-2 row-cols-md-6 g-3">
      <div
        class="col"
        v-for="(product, index) in products.slice(0, 5)"
        :key="product.id"
      >
        <div class="card h-100">
          <img :src="product.image" class="card-img-top" alt="Product Image" />
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
      </div>

      <!-- SEE ALL PRODUCT 1 -->
      <div v-if="products.length >= 5" class="col">
        <div class="card h-100 card-background">
          <div
            class="card-body d-flex justify-content-center align-items-center"
          >
            <router-link to="/products" class="text-decoration-none">
              <a
                href="products.html"
                class="text-decoration-none color-primary"
              >
                See All<br />
                New Product
              </a>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- SHOP BY BRAND SECTION -->
    <div class="my-4">
      <h5>Shop by brand</h5>
      <div class="d-flex flex-wrap brand-list">
        <button class="btn btn-outline-secondary">Vans</button>
        <button class="btn btn-outline-secondary">Bohoo</button>
        <button class="btn btn-outline-secondary">Mango</button>
        <button class="btn btn-outline-secondary">Reebok</button>
        <button class="btn btn-outline-secondary">Converse</button>
        <button class="btn btn-outline-secondary">Sandro</button>
        <button class="btn btn-outline-secondary">Nike</button>
        <button class="btn btn-outline-secondary">Adidas</button>
        <button class="btn btn-outline-secondary">Dior</button>
        <button class="btn btn-outline-secondary">Puma</button>
        <button class="btn btn-outline-secondary">Zara</button>
        <button class="btn btn-outline-secondary">Bershka</button>
        <button class="btn btn-outline-secondary">American Eagle</button>
      </div>
    </div>

    <!-- DISPLAY PRODUCT FROM INDEX 6 - 10 -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5>New Product</h5>
      <a href="products.html" class="text-decoration-none">See all</a>
    </div>
    <div class="row row-cols-2 row-cols-md-6 g-3">
      <div
        class="col"
        v-for="(product, index) in products.slice(5, 10)"
        :key="product.id"
      >
        <div class="card h-100">
          <img :src="product.image" class="card-img-top" alt="Product Image" />
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
      </div>

      <!-- SEE ALL PRODUCT -->
      <div v-if="products.length >= 10" class="col">
        <div class="card h-100 card-background">
          <div
            class="card-body d-flex justify-content-center align-items-center"
          >
            <router-link to="/products" class="text-decoration-none">
              <a
                href="products.html"
                class="text-decoration-none color-primary"
              >
                See All<br />
                New Product
              </a>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  products: Array,
});
</script>
