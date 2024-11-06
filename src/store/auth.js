import { createStore } from "vuex";
import product from "./product";
import auth from "./auth";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  namespaced: true,
  state() {
    return {
      token: null,
      tokenExpirationDate: null,
      userLogin: {},
      isLogin: false,
      paidCartItems: [],
    };
  },
  mutations: {
    setToken(state, { idToken, expiresIn }) {
      state.token = idToken;
      state.tokenExpirationDate = expiresIn;
      Cookies.set("tokenExpirationDate", expiresIn);
      Cookies.set("jwt", idToken);
    },
    setUserLogin(state, { userData, loginStatus }) {
      state.userLogin = userData;
      state.isLogin = loginStatus;
    },
    setPaidCartItems(state, paidCartItems) {
      state.paidCartItems = paidCartItems;
    },
    setUserLogout(state) {
      state.token = null;
      state.userLogin = {};
      state.isLogin = false;
      state.tokenExpirationDate = null;
      Cookies.remove("jwt");
      Cookies.remove("tokenExpirationDate");
      Cookies.remove("UID");
    },
  },
  actions: {
    async getRegisterData({ commit, dispatch }, payload) {
      const APIkey = "AIzaSyBY-aLJgME0AOWaAI6_ZNJ2olSNFKzzWQo";
      const authUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";

      try {
        const { data } = await axios.post(authUrl + APIkey, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        });
        commit("setToken", {
          idToken: data.idToken,
          expiresIn:
            new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
        });
        const newUserData = {
          userId: data.localId,
          fullname: payload.fullname,
          username: payload.username,
          email: payload.email,
          image: payload.image || "https://example.com/default-profile.png",
        };
        Cookies.set("UID", newUserData.userId);
        await dispatch("addNewUser", newUserData);
      } catch (err) {
        console.log(err);
      }
    },
    async addNewUser({ commit, state }, payload) {
      try {
        // Menggunakan userId sebagai kunci saat menyimpan data
        await axios.put(
          `https://final-vue-test-default-rtdb.firebaseio.com/user/${payload.userId}.json?auth=${state.token}`,
          payload
        );
        commit("setUserLogin", { userData: payload, loginStatus: true });
      } catch (err) {
        console.log(err);
      }
    },
    async getLoginData({ commit, dispatch }, payload) {
      const APIkey = "AIzaSyBY-aLJgME0AOWaAI6_ZNJ2olSNFKzzWQo";
      const authUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
      try {
        const { data } = await axios.post(authUrl + APIkey, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        });
        commit("setToken", {
          idToken: data.idToken,
          expiresIn:
            new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
        });
        await dispatch("getUser", data.localId);
      } catch (err) {
        console.log(err);
      }
    },
    async getUser({ commit }, userId) {
      try {
        // Langsung mengambil data pengguna berdasarkan userId
        const { data } = await axios.get(
          `https://final-vue-test-default-rtdb.firebaseio.com/user/${userId}.json`
        );
        if (data) {
          Cookies.set("UID", data.userId);
          commit("setUserLogin", { userData: data, loginStatus: true });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async updateUserProfile({ state }, updatedData) {
      try {
        const userId = state.userLogin.userId;
        await axios.patch(
          `https://final-vue-test-default-rtdb.firebaseio.com/user/${userId}.json?auth=${state.token}`,
          updatedData
        );

        // Mutate user data after update
        state.userLogin = { ...state.userLogin, ...updatedData };
        console.log("Profile updated successfully");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    },
    async fetchPaidCartItems({ state, commit }) {
      try {
        const userId = state.userLogin.userId;
        if (!userId) {
          console.error("User is not logged in.");
          return;
        }

        console.log("Fetching paid cart items for user:", userId);

        // Fetch all cart items from Firebase
        const { data } = await axios.get(
          `https://final-vue-test-default-rtdb.firebaseio.com/carts.json`
        );

        console.log("Raw data from Firebase:", data);

        if (!data) {
          console.log("No cart items found for any user.");
          commit("setPaidCartItems", []);
          return;
        }

        // Filter only the items with the correct userId and status "paid"
        const paidCartItems = Object.values(data).filter(
          (item) => item.userId === userId && item.status === "paid"
        );

        console.log("Filtered Paid Cart Items:", paidCartItems);

        // Commit the result to the state
        commit("setPaidCartItems", paidCartItems);
      } catch (err) {
        console.error("Error fetching paid cart items:", err);
      }
    },
  },
};

export const store = createStore({
  modules: {
    product,
    auth,
  },
});
