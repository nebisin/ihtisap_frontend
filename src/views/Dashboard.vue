<template>
  <div v-if="accountsLoading">Loading...</div>
  <div v-else-if="isAccountsEmpty">
    <DashboardNoAccount />
  </div>
  <ul v-else>
    <li v-for="account in accounts" :key="account.id">{{ account.title }}</li>
  </ul>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import DashboardNoAccount from "../components/DashboardNoAccount.vue";
export default {
  components: { DashboardNoAccount },
  computed: {
    ...mapGetters("account", ["isAccountsEmpty"]),
    ...mapState({
      accountsLoading: (state) => state.account.loading,
      accounts: (state) => state.account.accounts,
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>