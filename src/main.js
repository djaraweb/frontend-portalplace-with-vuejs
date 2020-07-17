import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import { VueSpinners } from "@saeris/vue-spinners";
import VueGeolocation from "vue-browser-geolocation";
import * as VueGoogleMaps from "vue2-google-maps";

// Filtros
import { addSymbolChilenoFilter, roundNumberFilter } from "@/filters";

Vue.filter("addSymbolChileno", addSymbolChilenoFilter);
Vue.filter("roundNumber", roundNumberFilter);
Vue.use(Buefy);
Vue.use(VueSpinners);
Vue.use(VueGeolocation);

Vue.use(VueGoogleMaps, {
  load: { key: process.env.VUE_APP_KEY_API_GOOGLE_MAPS },
  installComponents: true,
});
Vue.component("GoogleMap", VueGoogleMaps.Map);
Vue.component("GoogleMarker", VueGoogleMaps.Marker);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
