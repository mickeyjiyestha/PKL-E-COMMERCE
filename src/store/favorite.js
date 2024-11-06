// favorite.js
import { ref } from "vue";

const favoriteProducts = ref([]);

// Fungsi untuk menambahkan atau menghapus favorit
const toggleFavorite = (product) => {
  const index = favoriteProducts.value.findIndex((p) => p.id === product.id);
  if (index === -1) {
    favoriteProducts.value.push(product); // Tambahkan jika belum ada
  } else {
    favoriteProducts.value.splice(index, 1); // Hapus jika sudah ada
  }
};

export { favoriteProducts, toggleFavorite };
