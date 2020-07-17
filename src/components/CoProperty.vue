<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-title">{{ property.title }}</div>
    </div>
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="property.urlimage" alt="Placeholder home" />
      </figure>
    </div>
    <div class="card-content">
      <div class="group-container">
        <strong>Vivienda</strong>
        <span>: {{ property.placehouse }}</span>
      </div>
      <div class="group-container">
        <strong>Nro Visitas</strong>
        <span>: {{ property.visits }}</span>
      </div>
      <div class="group-container">
        <strong>Precio</strong>
        <span>: {{ property.price | addSymbolChileno }}</span>
      </div>
      <div class="group-container">
        <strong>Valor UF</strong>
        <span>: {{ pricevalueinuf | addSymbolChileno }}</span>
      </div>
    </div>
    <div class="card-footer is-centered">
      <div class="card-footer-item">
        <template v-if="action == 'Publica'">
          <b-button
            v-if="property.activateButton"
            type="is-primary"
            icon-left="magnify"
            @click="showCard(property)"
            >Ver Detalles</b-button
          >
          <b-button v-else type="is-primary" disabled>
            <i class="fas fa-clock"></i>
            {{ property.pendingTime }}
          </b-button>
        </template>
        <template v-else>
          <!--
          <b-button type="is-info" @click="destroyItem(property)">
            <i class="fas fa-edit"></i>
            Editar
          </b-button>&nbsp;
          -->
          <b-button type="is-danger" @click="destroyItem(property)">
            <i class="fas fa-trash"></i>
            <!--<i class="fas fa-spinner fa-spin"></i>-->
            Eliminar
          </b-button>
          <span></span>
        </template>
      </div>
    </div>

    <!-- Mostar Modal si la acción es Publica: Modal -->
    <b-modal
      v-if="action == 'Publica'"
      :active.sync="isCardModalActive"
      :width="700"
      scroll="keep"
    >
      <div class="card">
        <div class="card-image">
          <GoogleMapLoader
            :ubicationCenterMap="{
              lat: parseInt(property.address.geo.lat),
              lng: parseInt(property.address.geo.lng),
            }"
          />
          <!--
          <figure class="image is-4by3">
            <img :src="property.urlimage" alt="home" />
          </figure>
          -->
        </div>

        <div class="card-content">
          <div class="group-coordenadas">
            <strong>Coordenadas :</strong>
            <span>
              <strong>Lat:</strong>
              {{ property.address.geo.lat }}
            </span>
            <span>
              <strong>Lng:</strong>
              {{ property.address.geo.lng }}
            </span>
          </div>
          <hr />
          <!-- autor de Propiedad  -->
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="@/assets/avatar/man.png" alt="Placeholder avatar" />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{ property.autor.name }}</p>
              <p class="subtitle is-6">{{ property.autor.email }}</p>
            </div>
          </div>
          <!-- Contenido  -->
          <div class="content">
            <div class="group-container">
              <strong>Vivienda</strong>
              <span>: {{ property.placehouse }}</span>
            </div>
            <div class="group-container">
              <strong>Nro Visitas</strong>
              <span>: {{ property.visits }}</span>
            </div>
            <div class="group-container">
              <strong>Precio</strong>
              <span>: {{ property.price | addSymbolChileno }}</span>
            </div>
            <div class="group-container">
              <strong>Valor UF</strong>
              <span>: {{ pricevalueinuf | addSymbolChileno }}</span>
            </div>
            <div class="group-container">
              <strong>Dirección</strong>
              <span>: {{ property.address.street }}</span>
            </div>
          </div>
        </div>
        <div class="card-footer is-centered">
          <div class="card-footer-item">
            <b-button
              v-if="property.activateButton"
              type="is-primary"
              class="is-medium"
              icon-left="email"
              @click="sendEmail(property)"
              expanded
              >Contactar</b-button
            >
            <b-button
              v-else
              type="is-primary"
              icon-left="email"
              class="is-medium"
              disabled
              expanded
              >Contactar</b-button
            >
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import GoogleMapLoader from "@/components/GoogleMapLoader.vue";
import moment from "moment";
import { mapState, mapActions } from "vuex";
export default {
  name: "CoProperty",
  components: { GoogleMapLoader },
  data() {
    return {
      isCardModalActive: false,
      mapaDiv: "",
    };
  },
  props: {
    property: { type: Object, required: true },
    action: { type: String, required: false, default: () => "Publica" },
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.isLoading,
      statusCode: (state) => state.statusCode,
      messageError: (state) => state.messageError,
    }),
    pricevalueinuf() {
      let valoruf = 28684.1;
      return this.property.price / valoruf;
    },
  },
  methods: {
    ...mapActions("storeProperties", [
      "incrementVisits",
      "destroyProperty",
      "sendNotifications",
    ]),
    async sendEmail(item) {
      // Enviamos el correo:
      await this.sendNotifications(item.id);
      // Generamos un variable para controlar el bloquedo del boton contactar.

      let timeActivation = moment()
        .add(2 || process.env.VUE_APP_API_TIME_CONTACT, "minutes")
        .valueOf();
      item.activateButton = false;
      localStorage.setItem(`timeActivation${item.id}`, timeActivation);
    },

    async showCard(item) {
      // Incrementamos el Nro de Visitas y luego se muestra el Modal.
      await this.incrementVisits(item.id);
      if (this.statusCode == 200) {
        item.visits += 1;
        this.isCardModalActive = true;
      } else {
        console.warn(this.messageError);
      }
    },
    async destroyItem(item) {
      await this.destroyProperty(item.id);
    },
  },
};
</script>
<style scoped>
.card-contend {
  padding-top: 0;
}
.group-container {
  display: grid;
  text-align: left;
  grid-template-columns: 90px auto;
  margin-top: 5px;
}
.group-coordenadas {
  display: grid;
  text-align: left;
  grid-template-columns: 150px auto auto;
  margin-top: 5px;
}

.text-title {
  color: rgba(16, 46, 23, 0.637);
}
.media {
  margin-top: 10px;
}
.button {
  margin-right: 5px;
}
</style>
