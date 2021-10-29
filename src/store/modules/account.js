import api from "@/helpers/api";

export default {
  namespaced: true,
  state: {
    accounts: [],
    loading: false,
    error: "",
  },
  getters: {
    isAccountsEmpty: (state) => {
      return state.accounts.length === 0 ? true : false;
    },
  },
  mutations: {
    setAccounts(state, payload) {
      state.accounts = payload.accounts;
    },
    addAccount(state, payload) {
      state.accounts.unshift(payload.account);
    },
    deleteAccount(state, payload) {
      state.accounts = state.accounts.filter(
        (account) => account.id === payload.account.id
      );
    },
    updateAccount(state, payload) {
      state.accounts = state.accounts.map((account) => {
        if (account.id === payload.account.id) {
          return payload.account;
        }

        return account;
      });
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    setError(state, payload) {
      state.error = payload.error;
    },
  },
  actions: {
    async fetchAccounts({ commit, rootState }) {
      const token = rootState.auth.token;

      if (!token) {
        return;
      }

      commit("toggleLoading");
      commit("setError", { error: "" });

      try {
        const response = await api.get("/accounts", {
          headers: { Authorization: `Bearer ${token}` },
        });

        commit("setAccounts", response.data);
      } catch (error) {
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
