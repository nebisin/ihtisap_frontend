export const authPlugin = (store) => {
  store.subscribe((mutation) => {
    if (mutation.type === "auth/setToken") {
      if (mutation.payload.authenticationToken === null) {
        localStorage.removeItem("token");
      } else {
        localStorage.setItem("token", mutation.payload.authenticationToken);
      }

      store.dispatch("auth/authenticate");
      return;
    }

    if (mutation.type === "auth/setUser") {
      if (mutation.payload.user) {
        store.dispatch("account/fetchAccounts");
      }

      return;
    }
  });
};
