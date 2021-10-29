import { createStore } from "vuex";

import auth from "./modules/auth";
import { authPlugin } from "./plugins";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
  },
  plugins: [authPlugin],
});
