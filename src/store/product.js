import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      products: [],
      productDetail: {},
      cartItems: [],
    };
  },
  getters: {},
  mutations: {
    setProductData(state, payload) {
      state.products = payload;
    },
    setNewProduct(state, payload) {
      state.products.push.payload;
    },
    setProductDetail(state, payload) {
      state.productDetail = payload;
    },
    setCartData(state, payload) {
      state.cartItems = payload;
    },
    removeItemFromCart(state, itemId) {
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
  },
  actions: {
    async getProductData({ commit }) {
      try {
        const { data } = await axios.get(
          "https://final-vue-test-default-rtdb.firebaseio.com/products.json"
        );
        const arr = [];
        for (let key in data) {
          arr.push({ id: key, ...data[key] });
        }
        commit("setProductData", arr);
      } catch (err) {
        console.log(err);
      }
    },
    async addNewProduct({ commit, rootState }, payload) {
      const newData = {
        ...payload,
        username: rootState.auth.userLogin.username,
        createdAt: Date.now(),
        likes: ["null"],
        userId: rootState.auth.userLogin.userId,
      };
      try {
        const { data } = await axios.post(
          `https://final-vue-test-default-rtdb.firebaseio.com/products.json?auth=${rootState.auth.token}`,
          newData
        );
        commit("setNewProduct", { id: data.name, ...newData });
      } catch (err) {
        console.log(err);
      }
    },
    async addToCart({ rootState }, productDetail) {
      // Buat objek cartItem dengan semua detail produk yang diperlukan
      const cartItem = {
        id: productDetail.id, // Menyimpan ID produk
        image: productDetail.image, // Menyimpan URL gambar
        name: productDetail.name, // Menyimpan nama produk
        price: productDetail.price, // Menyimpan harga produk
        size: productDetail.size, // Menyimpan ukuran produk
        quantity: productDetail.quantity, // Menyimpan jumlah produk
        condition: productDetail.condition, // Menyimpan kondisi produk
        city: productDetail.city, // Menyimpan kota produk
        description: productDetail.description, // Menyimpan deskripsi produk
        status: "no paid", // Status cart
        userId: rootState.auth.userLogin.userId, // ID pengguna yang menambah ke cart
        createdAt: Date.now(), // Waktu penambahan
      };

      try {
        // Kirim cartItem ke Firebase
        await axios.post(
          `https://final-vue-test-default-rtdb.firebaseio.com/carts.json?auth=${rootState.auth.token}`,
          cartItem
        );
        console.log("Item added to cart:", cartItem);
      } catch (err) {
        console.log("Error adding item to cart:", err);
      }
    },
    async getProductDetail({ commit }, payload) {
      try {
        const { data } = await axios.get(
          `https://final-vue-test-default-rtdb.firebaseio.com/products/${payload}.json`
        );
        commit("setProductDetail", data);
      } catch (err) {}
    },
    async deleteProduct({ dispatch, rootState }, payload) {
      try {
        const { data } = await axios.delete(
          `https://final-vue-test-default-rtdb.firebaseio.com/products/${payload}.json?auth=${rootState.auth.token}`
        );
        await dispatch("getProductData");
      } catch (err) {
        console.log(err);
      }
    },
    async updateProduct({ dispatch, rootState }, { id, newProduct }) {
      try {
        const { data } = await axios.put(
          `https://final-vue-test-default-rtdb.firebaseio.com/products/${id}.json?auth=${rootState.auth.token}`,
          newProduct
        );
        await dispatch("getProductData");
      } catch (error) {
        console.log(error);
      }
    },
    async updateUser({ commit, state }, payload) {
      try {
        await axios.put(
          `https://final-vue-test-default-rtdb.firebaseio.com/user/${state.userLogin.userId}.json?auth=${state.token}`,
          payload
        );
        commit("setUserLogin", { userData: payload, loginStatus: true });
      } catch (err) {
        console.log(err);
      }
    },
    async getCartData({ commit, rootState }) {
      try {
        const { data } = await axios.get(
          `https://final-vue-test-default-rtdb.firebaseio.com/carts.json?auth=${rootState.auth.token}`
        );
        const cartItems = [];
        for (let key in data) {
          // Memfilter cartItems berdasarkan userId
          if (
            data[key].status === "no paid" &&
            data[key].userId === rootState.auth.userLogin.userId
          ) {
            cartItems.push({ id: key, ...data[key] });
          }
        }
        commit("setCartData", cartItems);
      } catch (err) {
        console.log(err);
      }
    },
    async updateCartStatusToPaid({ commit, state, rootState }) {
      try {
        const updates = state.cartItems.map(async (item) => {
          if (item.status === "no paid") {
            console.log(`Updating item ${item.id} status to 'paid'`); // Tambahkan ini
            await axios.patch(
              `https://final-vue-test-default-rtdb.firebaseio.com/carts/${item.id}.json?auth=${rootState.auth.token}`,
              { status: "paid" }
            );
          }
        });

        await Promise.all(updates);
        commit("setCartData", []); // Clear cart data in state
        await this.dispatch("getCartData"); // Memanggil ulang getCartData untuk update UI
        console.log("Status updated to 'paid' for all items in cart");
      } catch (err) {
        console.log("Error updating cart status to 'paid':", err);
      }
    },
    async removeItemFromCart({ commit, rootState }, itemId) {
      try {
        // Remove item from Firebase (if necessary)
        await axios.delete(
          `https://final-vue-test-default-rtdb.firebaseio.com/carts/${itemId}.json?auth=${rootState.auth.token}`
        );
        // Commit the mutation to remove the item from the state
        commit("removeItemFromCart", itemId);
      } catch (err) {
        console.log("Error removing item from cart:", err);
      }
    },
  },
};
