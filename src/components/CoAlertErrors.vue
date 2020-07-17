<template>
  <b-notification
    v-if="showAlert"
    type="is-danger"
    aria-close-label="Close notification"
    role="alert"
  >
    <div v-if="typeof msgErrors === 'object'">
      <li v-for="(item, id) in msgErrors" :key="id">{{ item[0] }}</li>
    </div>
    <div v-else>
      <strong>{{ msgErrors }}</strong>
    </div>
  </b-notification>
</template>
<script>
export default {
  name: "CoAlertErros",
  props: {
    msgErrors: {},
    showAlert: { type: Boolean, required: true, default: () => true },
  },
};
</script>
