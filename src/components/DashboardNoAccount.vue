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
        <TheModal v-if="modalOpen" @close="modalOpen = false">
          <template v-slot:body>
            <AppTextInput label="title" id="title" placeholder="title" />
            <AppTextInput label="title" id="title" placeholder="title" />
          </template>
          <template v-slot:header>create new account</template>
        </TheModal>
      </transition>
    </teleport>
  </div>
</template>

<script>
import AppButtonPrimary from "./AppButtonPrimary.vue";
import AppTextInput from "./AppTextInput.vue";
import TheModal from "./TheModal.vue";
export default {
  components: {
    AppButtonPrimary,
    TheModal,
    AppTextInput,
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
