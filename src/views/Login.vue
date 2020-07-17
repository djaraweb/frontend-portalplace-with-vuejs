<template>
  <section>
    <div class="columns is-centered">
      <div class="column is-5">
        <div class="card">
          <div class="card-header">
            <div class="card-header-title">Login de Acceso</div>
          </div>
          <div class="card-content">
            <div v-if="isLoading" class="has-text-centered">
              <beat-loader :loading="isLoading" :color="'#10d320'" />
            </div>
            <!--Show Alerts -->
            <b-notification
              v-if="existsError"
              type="is-danger"
              aria-close-label="Close notification"
              role="alert"
            >{{messageError}}</b-notification>

            <b-field label="Email">
              <b-input v-model="email" type="email" maxlength="30"></b-input>
            </b-field>

            <b-field label="Contraseña">
              <b-input v-model="password" type="password" maxlength="30"></b-input>
            </b-field>
          </div>

          <div class="card-footer">
            <div class="card-footer-item">
              <b-button
                @click="validateLogin"
                type="is-primary"
                icon-left="log-out-outline"
                class="is-large"
                expanded
              >
                <i class="fas fa-sign-in-alt"></i>&nbsp;
                <span>Ingresar</span>
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
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
    ...mapActions(["loggin"]),
    validateLogin() {
      this.loggin({
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>
<style scoped>
section {
  margin-top: 20px;
}
</style>