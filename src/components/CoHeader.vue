<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item>
        <router-link :to="{ name: 'Home' }">
          <i class="fa fa-home"></i> &nbsp;
          <strong>Home</strong>
        </router-link>
      </b-navbar-item>

      <b-navbar-item v-if="user_logged_in">
        <router-link :to="{ name: 'MyProperties' }">
          <i class="fa fa-search"></i> &nbsp;
          <strong>Ver Mis Propiedades</strong>
        </router-link>
      </b-navbar-item>
      <b-navbar-item v-if="user_logged_in">
        <router-link :to="{ name: 'AddProperty' }">
          <i class="fas fa-address-card"></i> &nbsp;
          <strong>Agregar Propiedades</strong>
        </router-link>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons" v-if="!user_logged_in">
          <router-link :to="{ name: 'Register' }" class="button is-primary">
            <i class="fas fa-user-plus"></i> &nbsp;
            <span>Registrarse</span>
          </router-link>
          <router-link :to="{ name: 'Login' }" class="button is-primary">
            <i class="fas fa-sign-in-alt"></i> &nbsp;
            <span>Login</span>
          </router-link>
        </div>
        <div v-else>
          <b-navbar-dropdown :label="`Usuario: ${user.name}`" class="t">
            <b-navbar-item>
              <router-link :to="{ name: 'About' }">
                <i class="fas fa-address-card"></i>&nbsp;
                <span>About</span>
              </router-link>
            </b-navbar-item>
            <b-navbar-item>
              <router-link :to="{ name: 'Logout' }">
                <i class="fas fa-sign-out-alt"></i> &nbsp;
                <span>Logout</span>
              </router-link>
            </b-navbar-item>
          </b-navbar-dropdown>
        </div>

        <div></div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
export default {
  name: "CoHeader",
  props: {
    user_logged_in: { type: Boolean, required: true },
    user: { type: Object, required: true },
  },
};
</script>

<style scoped>
a {
  font-size: 18px;
}
span {
  padding-left: 5px;
}
.t {
  font-weight: 600;
}
</style>
