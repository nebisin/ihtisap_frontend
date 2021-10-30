<template>
  <TheModal @close="$emit('close')" @submit="handleSubmit">
    <template v-slot:header>create new account</template>
    <template v-slot:body>
      <AppTextInput
        label="Title"
        id="title"
        placeholder="title"
        type="text"
        v-model:value="title"
      />
      <AppTextInput
        label="Description"
        id="description"
        placeholder="description"
        type="text"
        v-model:value="description"
      />
      <AppTextInput
        label="Currency"
        id="currency"
        placeholder="currency"
        type="text"
        v-model:value="currency"
      />
      <!-- <AppTextInput
              label="initialBalance"
              id="initialBalance"
              placeholder="initialBalance"
              type="text"
            /> -->
    </template>
    <template v-slot:primary-button>
      <button @click="handleSubmit" class="w-full">
        <AppButtonPrimary>
          <AppSpinner v-if="loading" />
          <span v-else>create account</span>
        </AppButtonPrimary>
      </button>
    </template>
  </TheModal>
</template>

<script>
import api from "@/helpers/api";

import AppTextInput from "./AppTextInput.vue";
import TheModal from "./TheModal.vue";
import { mapActions, mapState } from "vuex";
import AppButtonPrimary from "./AppButtonPrimary.vue";
import AppSpinner from "./AppSpinner.vue";

export default {
  components: {
    TheModal,
    AppTextInput,
    AppButtonPrimary,
    AppSpinner,
  },
  data() {
    return {
      title: "",
      description: "",
      currency: "",
      loading: false,
      err: "",
    };
  },
  computed: {
    ...mapState("auth", ["token"]),
  },
  methods: {
    ...mapActions("account", ["createAccount"]),
    async handleSubmit() {
      try {
        this.loading = true;
        const response = await api.post(
          "/accounts",
          {
            title: this.title,
            description: this.description,
            currency: this.currency,
          },
          {
            headers: { Authorization: `Bearer ${this.token}` },
          }
        );
        this.createAccount(response.data);
      } catch (error) {
        if (error.response) {
          // If there is a server side validation error
          if (error.response.status === 422) {
            const errors = error.response.data.errors;
            console.log(errors);
            // Object.assign(this.externalResults, errors);
          } else {
            this.err = error.response.data.error;
          }
        } else {
          this.err = "something went wrong";
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>