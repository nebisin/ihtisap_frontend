<template>
  <div v-if="loading">App Loading...</div>
  <div v-else>
    <TheNavbar />
    <div class="pt-14 px-3 font-display mx-auto max-w-screen-xl">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar.vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  components: {
    TheNavbar,
  },
  computed: {
    ...mapState({
      loading: (state) => state.auth.loading,
      token: (state) => state.auth.token,
    }),
  },
  methods: {
    ...mapMutations("auth", ["setToken"]),
    ...mapActions("auth", ["logout"]),
  },
  created() {
    const authenticationToken = localStorage.getItem("token");
    if (authenticationToken) {
      this.setToken({ authenticationToken });
    }

    window.addEventListener("storage", () => {
      const token = window.localStorage.getItem("token");
      if (token && token !== this.token) {
        this.setToken({ authenticationToken: token });
        return;
      }

      if (!token && this.token !== null) {
        this.logout();
      }
    });
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>