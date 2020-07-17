<template>
  <section>
    <h3 class="title is-3 encabezado">Mis Propiedades</h3>
    <b-notification
      v-if="existsError"
      type="is-warning"
      aria-close-label="Close notification"
      role="alert"
    >
      <strong>{{ messageError }}</strong>
    </b-notification>

    <CoSearchProperty
      v-else
      @onFilterProperties="filterProperties"
      @onChangePage="onChangePage"
      @onChangePerPage="onChangePerPage"
      :pagination="pagination"
    >
      <div v-if="isLoading" class="has-text-centered">
        <beat-loader :loading="isLoading" :color="'#10d320'" />
      </div>
      <div class="columns is-multiline">
        <div
          class="column is-4"
          v-for="(item, index) in dgPropertiesPrivates"
          :key="index"
        >
          <CoProperty :property="item.attributes" action="Private" />
        </div>
      </div>
    </CoSearchProperty>
  </section>
</template>

<script>
import CoProperty from "@/components/CoProperty.vue";
import CoSearchProperty from "@/components/CoSearchProperty.vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "MyProperties",
  components: {
    CoProperty,
    CoSearchProperty,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.isLoading,
      existsError: (state) => state.existsError,
      messageError: (state) => state.messageError,
    }),
    ...mapState("storeProperties", {
      dgPropertiesPrivates: (state) => state.dgPropertiesPrivates,
      pagination: (state) => state.pagination,
    }),
  },
  methods: {
    ...mapMutations("storeProperties", [
      "SET_SEARCH_FILTER",
      "SET_PAGINATION_PERPAGE",
      "SET_PAGINATION_PAGE",
    ]),
    ...mapActions("storeProperties", ["getListsPropertiesPrivates"]),
    onChangePerPage(perpage) {
      this.SET_PAGINATION_PAGE(1);
      this.SET_PAGINATION_PERPAGE(perpage);
      this.getListsPropertiesPrivates();
    },
    onChangePage(page) {
      this.SET_PAGINATION_PAGE(page);
      this.getListsPropertiesPrivates();
    },
    filterProperties(filtro) {
      this.SET_SEARCH_FILTER(filtro);
      this.getListsPropertiesPrivates();
    },
  },
  mounted() {
    this.SET_PAGINATION_PAGE(1);
    this.SET_SEARCH_FILTER("");
    this.getListsPropertiesPrivates();
  },
};
</script>
<style scoped>
.encabezado {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
