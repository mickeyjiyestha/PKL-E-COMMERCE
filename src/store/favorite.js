import { ref } from "vue";

const favoriteProducts = ref([]);

const toggleFavorite = (product) => {
  const index = favoriteProducts.value.findIndex((p) => p.id === product.id);
  if (index === -1) {
    favoriteProducts.value.push(product);
  } else {
    favoriteProducts.value.splice(index, 1);
  }
};

export { favoriteProducts, toggleFavorite };
