<template>
  <div
    class="
      fixed
      left-0
      right-0
      top-0
      backdrop-filter backdrop-blur-2xl
      border-b
      h-11
    "
  >
    <div
      class="
        max-w-screen-2xl
        mx-auto
        w-full
        flex
        items-center
        h-full
        justify-between
      "
    >
      <div>
        <router-link to="/">
          <h1 class="px-3 py-2 font-semibold text-brandPrimary">ihtisap</h1>
        </router-link>
      </div>
      <ul class="flex gap-2" v-if="!isLoggedIn">
        <li>
          <router-link to="/login">
            <p class="px-3 py-2 text-normalGray hover:underline">login</p>
          </router-link>
        </li>
        <li>
          <router-link to="/register">
            <p class="px-3 py-2 text-normalGray hover:underline">register</p>
          </router-link>
        </li>
      </ul>
      <ul class="flex gap-2" v-else>
        <li>
          <button @click.prevent="logout">
            <p class="px-3 py-2 text-normalGray hover:underline">logout</p>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: { ...mapGetters("auth", ["isLoggedIn"]) },
  methods: { ...mapActions("auth", ["logout"]) },
};
</script>