<template>
  <TheModal @close="$emit('close')" @submit="handleSubmit">
    <template v-slot:header>create new account</template>
    <template v-slot:body>
      <p v-if="err" class="text-red-700 text-xs font-light">{{ err }}</p>
      <AppTextInput
        label="Title"
        id="title"
        placeholder="e.g. Personal Account, Family Account..."
        type="text"
        v-model:value="title"
        :error="v$.title.$errors[0]?.$message || ''"
      />
      <AppTextInput
        label="Description"
        id="description"
        placeholder="short description"
        type="text"
        v-model:value="description"
        :error="v$.description.$errors[0]?.$message || ''"
      />
      <AppTextInput
        label="Currency"
        id="currency"
        placeholder="e.g. USD, TRY, EUR..."
        type="text"
        v-model:value="currency"
        :error="v$.currency.$errors[0]?.$message || ''"
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
import { ref } from "vue";
import { mapActions, mapState } from "vuex";

import useVuelidate from "@vuelidate/core";
import { minLength, required, maxLength } from "@vuelidate/validators";

import api from "@/helpers/api";

import AppTextInput from "./AppTextInput.vue";
import TheModal from "./TheModal.vue";
import AppButtonPrimary from "./AppButtonPrimary.vue";
import AppSpinner from "./AppSpinner.vue";

export default {
  components: {
    TheModal,
    AppTextInput,
    AppButtonPrimary,
    AppSpinner,
  },
  setup() {
    const externalResults = ref({});
    return {
      externalResults,
      v$: useVuelidate({ $externalResults: externalResults }),
    };
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
  validations() {
    return {
      title: { required, minLength: minLength(3), maxLength: maxLength(500) },
      description: { maxLength: maxLength(1000) },
      currency: { required },
    };
  },
  computed: {
    ...mapState("auth", ["token"]),
  },
  methods: {
    ...mapActions("account", ["createAccount"]),
    async handleSubmit() {
      this.externalResults = {};

      const result = await this.v$.$validate();
      if (!result) {
        return;
      }

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
            Object.assign(this.externalResults, errors);
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