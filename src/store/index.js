import Vue from "vue";
import Vuex from "vuex";

import router from "@/router";
// Importar Modulos
import storeProperties from "@/store/modules/storeProperties";
Vue.use(Vuex);

import appLogin from "@/services/User";
export default new Vuex.Store({
  state: {
    user_logged_in: {},
    isLoading: false,
    existsError: false,
    statusCode: 200,
    messageError: "",
  },
  mutations: {
    SET_LOADING_PAGE: (state, payload) => (state.isLoading = payload),
    SET_USER_LOGGED_ID: (state, payload) => (state.user_logged_in = payload),
    SET_EXISTS_ERROR_PAGE: (state, payload) => (state.existsError = payload),
    SET_MESSAGE_ERROR_PAGE: (state, payload) => (state.messageError = payload),
    SET_STATUS_CODE_PAGE: (state, payload) => (state.statusCode = payload),
    SET_SHOW_ALERTS(state, payload) {
      state.existsError = true;
      state.messageError = payload;
      setTimeout(() => {
        state.existsError = false;
      }, 3000);
    },
  },
  getters: {
    token_authorized(state) {
      let token_authorized = state.user_logged_in.auth_token;
      if (token_authorized) {
        // Existe token en el state
        return token_authorized;
      }
      return "";
    },
  },
  actions: {
    currentUser({ state, commit }) {
      state.isLoading = true;
      appLogin
        .getCurrentUser()
        .then((response) => {
          //console.log(response);
          state.statusCode = response.code;
          state.user_logged_in = response.body.data.attributes;
          if (state.statusCode === 200) {
            // Generar el LocalStorage
            let token_authorized = state.user_logged_in.auth_token;
            localStorage.setItem("access_token", token_authorized);
          } else {
            localStorage.removeItem("access_token");
            commit("SET_USER_LOGGED_ID", {});
            router.push({ name: "Login" });
          }
        })
        .finally(() => {
          state.isLoading = false;
        });
    },

    registerUser({ state, commit }, user) {
      state.isLoading = true;
      appLogin
        .registerUser(user)
        .then((response) => {
          state.messageError = response;
          state.statusCode = response.code;
          if (state.statusCode === 200) {
            // Generamos la session
            state.user_logged_in = response.body.data.attributes; // User
            let token_authorized = state.user_logged_in.auth_token;
            localStorage.setItem("access_token", token_authorized);
            router.push({ name: "MyProperties" });
          } else {
            commit("SET_SHOW_ALERTS", response.errors);
          }
        })
        .finally(() => {
          state.isLoading = false;
        });
    },
    loggin({ state, commit }, user) {
      state.isLoading = true;
      appLogin
        .verifiedAccess(user)
        .then((response) => {
          state.statusCode = response.code;
          if (state.statusCode === 200) {
            state.user_logged_in = response.body.data[0].attributes;
            // Generar el LocalStorage
            let token_authorized = state.user_logged_in.auth_token;
            localStorage.setItem("access_token", token_authorized);
            router.push({ name: "Home" });
          } else {
            commit("SET_SHOW_ALERTS", response.message);
          }
        })
        .finally(() => {
          state.isLoading = false;
        });
    },
    logout({ commit }) {
      localStorage.removeItem("access_token");
      commit("SET_USER_LOGGED_ID", {});
      router.push({ name: "Login" });
    },
  },
  modules: {
    storeProperties,
  },
});
