<template>
  <div id="app">
    <div class="container mt-2">
      <CoHeader :user_logged_in="user_logged_in" :user="user" />
      <router-view />
      <CoFooter />
    </div>
  </div>
</template>
<script>
import moment from "moment";
import CoHeader from "@/components/CoHeader.vue";
import CoFooter from "@/components/CoFooter.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "App",
  components: {
    CoHeader,
    CoFooter,
  },
  data() {
    return {
      intervalTimer: 0,
    };
  },
  computed: {
    ...mapState("storeProperties", {
      dgProperties: (state) => state.dgProperties,
    }),
    user_logged_in() {
      return this.$store.getters.token_authorized ? true : false;
    },
    user() {
      return this.$store.state.user_logged_in;
    },
  },
  methods: {
    ...mapActions("storeProperties", ["setBlockingArrayProperties"]),
  },
  mounted() {
    // Ejecutar el Timer.
    this.intervalTimer = setInterval(() => {
      this.setBlockingArrayProperties(this.dgProperties);
    }, 1000);
  },
  beforeDestroy() {
    console.log("destroy Interval:", this.intervalTimer);
    clearInterval(this.intervalTimer);
  },
};
</script>
<style></style>
