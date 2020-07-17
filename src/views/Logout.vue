<template></template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Logout",
  methods: {
    ...mapActions(["logout"])
  },
  mounted() {
    this.logout();
  }
};
</script>