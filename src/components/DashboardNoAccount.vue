<template>
  <div
    class="
      flex
      items-center
      justify-center
      flex-col
      gap-3
      p-5
      border
      rounded
      shadow
    "
  >
    <p class="text-normalGray font-normal text-lg">
      You don't have any account yet.
    </p>
    <button @click="modalOpen = true">
      <AppButtonPrimary>Create new account</AppButtonPrimary>
    </button>
    <teleport to="body">
      <transition name="fade" appear>
        <div v-if="modalOpen">
          <TheCreateAccountModal @close="modalOpen = false" />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script>
import AppButtonPrimary from "./AppButtonPrimary.vue";
import TheCreateAccountModal from "./TheCreateAccountModal.vue";
export default {
  components: {
    AppButtonPrimary,
    TheCreateAccountModal,
  },
  data() {
    return {
      modalOpen: false,
    };
  },
};
</script>

<style scoped>
</style>
