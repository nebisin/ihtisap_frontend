import router from "@/router";

import api from "@/helpers/api";

export default {
  namespaced: true,
  state: {
    user: null,
    token: null,
    loading: false,
    error: "",
  },
  getters: {
    isLoggedIn: (state) => {
      return state.token ? true : false;
    },
  },
  mutations: {
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    setUser(state, payload) {
      state.user = payload.user;
    },
    setToken(state, payload) {
      state.token = payload.authenticationToken;
    },
    setError(state, payload) {
      state.error = payload.error;
    },
  },
  actions: {
    logout({ commit }) {
      commit("setToken", { authenticationToken: null });
      router.push("/");
    },
    async authenticate({ commit, state }) {
      if (!state.token) {
        commit("setError", "authentication token could not found");
        commit("setUser", { user: null });
        return;
      }

      commit("toggleLoading");
      commit("setError", { error: "" });

      try {
        const response = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        commit("setUser", response.data);
      } catch (error) {
        commit("setToken", { authenticationToken: null });
        router.push("/login");
        if (error.response) {
          commit("setError", error.response.data);
        } else {
          commit("setError", { error: "something went wrong" });
        }
      } finally {
        commit("toggleLoading");
      }
    },
  },
};
