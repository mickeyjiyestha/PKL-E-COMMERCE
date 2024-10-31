<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      />
      <link rel="stylesheet" href="css/style.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
      />
      <title>Document</title>
    </head>
    <body>
      <div id="hero" class="row a justify-content-left" style="height: 100vh">
        <div class="col-sm-6 ms-5" style="margin-top: 400px">
          <div class="card w-50">
            <div class="card-body">
              <p class="card-title" style="font-size: 25px">
                Ready to declutter<br />you closet?
              </p>
              <a href="#" class="btn btnshopnow">Shop Now</a>
            </div>
          </div>
        </div>
      </div>

      <product-list
        :products="productList"
        v-if="productListStatus"
      ></product-list>
    </body>
  </html>
</template>

<script setup>
import "@/assets/base.css";
import ProductList from "../product/ProductList.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const productListStatus = ref(false);
const productList = ref();

onMounted(async () => {
  try {
    await store.dispatch("product/getProductData");
    productListStatus.value = true;
    productList.value = store.state.product.products;
  } catch (error) {
    console.log(error);
  }
});
</script>
