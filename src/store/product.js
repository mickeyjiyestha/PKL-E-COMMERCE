import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      products: [],
      productDetail: {},
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
  },
};
