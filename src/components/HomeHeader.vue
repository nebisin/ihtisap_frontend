<template>
  <div
    class="
      w-full
      flex flex-col
      items-center
      justify-center
      h-screen-80
      max-h-96
    "
  >
    <h2 class="text-center text-4xl font-bold font-title">
      Advanced
      <span class="text-brandPrimary">expense and income tracker</span>
      application
    </h2>
    <p class="text-center text-lg font-light text-normalGray pt-4">
      Shared accounts, scheduled payments, reminders and more
    </p>
    <div class="pt-8"></div>
    <router-link to="/register">
      <AppButtonPrimary>create free account</AppButtonPrimary>
    </router-link>
  </div>
</template>

<script>
import AppButtonPrimary from "./AppButtonPrimary.vue";
export default {
  components: { AppButtonPrimary },
};
</script>
