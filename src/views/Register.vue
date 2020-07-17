<template>
  <section>
    <div class="columns is-centered">
      <div class="column is-6">
        <div class="card">
          <div class="card-header">
            <div class="card-header-title">Registro de Usuario</div>
          </div>
          <div class="card-content">
            <div v-if="isLoading" class="has-text-centered">
              <beat-loader :loading="isLoading" :color="'#10d320'" />
            </div>
            <!--Show Alerts -->
            <CoAlertErrors :showAlert="existsError" :msgErrors="messageError" />
            <!--Datos del Formulario -->
            <b-field label="Name">
              <b-input v-model="name"></b-input>
            </b-field>

            <b-field label="Email">
              <b-input v-model="email" type="email" maxlength="50"></b-input>
            </b-field>
            <b-field label="Password">
              <b-input v-model="password" type="password" password-reveal></b-input>
            </b-field>
          </div>

          <div class="card-footer">
            <div class="card-footer-item">
              <b-button
                @click="register"
                type="is-primary"
                icon-left="log-out-outline"
                class="is-large"
                expanded
              >
                <i class="fas fa-sign-in-alt"></i>&nbsp;
                <span>Registrar</span>
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import CoAlertErrors from "@/components/CoAlertErrors.vue";
export default {
  name: "Register",
  components: {
    CoAlertErrors
  },
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      existsError: state => state.existsError,
      messageError: state => state.messageError
    })
  },
  methods: {
    ...mapMutations(["SET_SHOW_ALERTS"]),
    ...mapActions(["registerUser"]),
    register() {
      // Validar email
      let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (emailRegex.test(this.email))
        this.registerUser({
          user: {
            name: this.name,
            email: this.email,
            password: this.password
          }
        });
      else {
        this.SET_SHOW_ALERTS("Email is incorrecto. Validar");
      }
    }
  }
};
</script>
<style scoped>
section {
  margin-top: 20px;
}
</style>
