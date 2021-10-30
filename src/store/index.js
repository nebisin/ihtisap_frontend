import { createStore } from "vuex";

import auth from "./modules/auth";
import account from "./modules/account";

import { authPlugin } from "./plugins";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    account,
  },
  plugins: [authPlugin],
});
