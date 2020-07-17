<template>
  <section>
    <div class="columns is-centered">
      <div class="column is-8">
        <div class="card">
          <div class="card-header">
            <div class="card-header-title">Registro de Propiedades</div>
          </div>
          <div class="card-content">
            <div v-if="isLoading" class="has-text-centered">
              <beat-loader :loading="isLoading" :color="'#10d320'" />
            </div>
            <!--Show Alerts -->
            <CoAlertErrors :showAlert="existsError" :msgErrors="messageError" />
            <!--Datos del Formulario -->
            <div class="columns">
              <div class="column is-4">
                <b-field label="Vivienda">
                  <b-select
                    placeholder="Seleccione una Vivienda"
                    v-model="property.placehouse"
                  >
                    <option
                      v-for="option in optVivienda"
                      :value="option.id"
                      :key="option.id"
                      >{{ option.label }}</option
                    >
                  </b-select>
                </b-field>
              </div>
              <div class="column is-4">
                <b-field label="Mts(2)">
                  <b-numberinput
                    controls-position="compact"
                    min="90"
                    step="0.01"
                    v-model="property.mts2"
                  ></b-numberinput>
                </b-field>
              </div>

              <div class="column is-4">
                <b-field label="Precio">
                  <b-numberinput
                    controls-position="compact"
                    min="1"
                    step="0.01"
                    v-model="property.price"
                  ></b-numberinput>
                </b-field>
              </div>
            </div>
            <b-field label="Descripción">
              <b-input v-model="property.title"></b-input>
            </b-field>
            <b-field label="Dirección">
              <b-input v-model="property.street"></b-input>
            </b-field>
            <b-field label="Url Imagen">
              <b-input v-model="property.urlimage"></b-input>
            </b-field>
            <!-- Cargamos el mapa -->
            <GoogleMapLoader
              :ubicationCenterMap="{
                lat: 0,
                lng: 0,
              }"
            />
          </div>

          <div class="card-footer">
            <div class="card-footer-item">
              <b-button
                @click="addProperty"
                type="is-primary"
                icon-left="log-out-outline"
                class="is-large"
                expanded
              >
                <i class="fas fa-sign-in-alt"></i>&nbsp;
                <span>Agregar Propiedad</span>
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import GoogleMapLoader from "@/components/GoogleMapLoader.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import CoAlertErrors from "@/components/CoAlertErrors.vue";
export default {
  name: "AddProperty",
  components: {
    CoAlertErrors,
    GoogleMapLoader,
  },
  data() {
    return {
      optVivienda: [
        { id: "Casa", label: "CASA" },
        { id: "Departamento", label: "DEPARTAMENTO" },
      ],
      property: {
        placehouse: "Casa",
        title: "",
        mts2: 90,
        street: "",
        geolat: 0,
        geolng: 0,
        visits: 100,
        price: 1,
      },
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.isLoading,
      statusCode: (state) => state.statusCode,
      existsError: (state) => state.existsError,
      messageError: (state) => state.messageError,
    }),
  },
  methods: {
    ...mapMutations(["SET_SHOW_ALERTS"]),
    ...mapActions("storeProperties", ["saveProperty"]),
    async addProperty() {
      let mapCoordinates = JSON.parse(localStorage.center);
      this.property.geolat = parseInt(mapCoordinates.lat);
      this.property.geolng = parseInt(mapCoordinates.lng);
      await this.saveProperty(this.property);
      if (this.statusCode == 200) {
        this.property = {
          placehouse: "Casa",
          title: "",
          mts2: 90,
          street: "",
          geolat: 0,
          geolng: 0,
          visits: 100,
          price: 1,
        };
      }
    },
  },
};
</script>
<style scoped>
section {
  margin-top: 20px;
}
</style>
