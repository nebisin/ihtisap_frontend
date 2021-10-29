<template>
  <div class="max-w-sm w-full mx-auto pt-9">
    <div class="pb-6">
      <h2 class="text-xl font-title pb-2">Log in with password</h2>
      <p class="text-xs text-normalGray font-thin">
        Don't have an acount?
        <router-link to="/register" class="text-brandPrimary hover:underline"
          >Register instead</router-link
        >
      </p>
      <p v-if="err" class="text-red-700 text-xs font-light">{{ err }}</p>
    </div>
    <form @submit.prevent="handleSubmit">
      <AppTextInput
        label="Email"
        type="email"
        id="email"
        placeholder="johndoe@example.com"
        v-model:value="email"
        :error="v$.email.$errors[0]?.$message || ''"
      />
      <AppTextInput
        label="Password"
        type="password"
        id="password"
        placeholder="your password"
        v-model:value="password"
        :error="v$.password.$errors[0]?.$message || ''"
      />
      <button type="submit" class="w-full" :disabled="isLoading">
        <AppButtonPrimary>
          <AppSpinner v-if="isLoading" />
          <span v-else>sign in</span>
        </AppButtonPrimary>
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapMutations } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

import api from "@/helpers/api";

import AppButtonPrimary from "@/components/AppButtonPrimary.vue";
import AppTextInput from "@/components/AppTextInput.vue";
import AppSpinner from "@/components/AppSpinner.vue";

export default {
  components: { AppButtonPrimary, AppTextInput, AppSpinner },
  setup() {
    const externalResults = ref({});
    return {
      externalResults,
      v$: useVuelidate({ $externalResults: externalResults }),
    };
  },
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      err: "",
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required, minLength: minLength(8) },
    };
  },
  methods: {
    ...mapMutations("auth", ["setToken"]),
    async handleSubmit() {
      const result = await this.v$.$validate();
      if (!result) {
        return;
      }

      this.isLoading = true;

      try {
        const response = await api.post("/users/authenticate", {
          email: this.email,
          password: this.password,
        });
        this.setToken(response.data);
        this.$router.push("/dashboard");
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
        this.isLoading = false;
      }
    },
  },
};
</script>
