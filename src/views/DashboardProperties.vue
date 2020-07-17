<template>
  <section>
    <h3 class="title is-3 encabezado">Ver Propiedades Registradas</h3>
    <CoSearchProperty
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
          v-for="(item, index) in dgProperties"
          :key="index"
        >
          <CoProperty :property="item" />
        </div>
      </div>
    </CoSearchProperty>
  </section>
</template>

<script>
import moment from "moment";
import CoProperty from "@/components/CoProperty.vue";
import CoSearchProperty from "@/components/CoSearchProperty.vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "DashboardProperties",
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
    }),
    ...mapState("storeProperties", {
      dgProperties: (state) => state.dgProperties,
      pagination: (state) => state.pagination,
    }),
  },
  methods: {
    ...mapMutations("storeProperties", [
      "SET_SEARCH_FILTER",
      "SET_PAGINATION_PERPAGE",
      "SET_PAGINATION_PAGE",
    ]),
    ...mapActions("storeProperties", ["getListsProperties"]),
    onChangePerPage(perpage) {
      this.SET_PAGINATION_PAGE(1);
      this.SET_PAGINATION_PERPAGE(perpage);
      this.getListsProperties();
    },
    onChangePage(page) {
      this.SET_PAGINATION_PAGE(page);
      this.getListsProperties();
    },
    filterProperties(filtro) {
      this.SET_SEARCH_FILTER(filtro);
      this.getListsProperties();
    },
  },
  mounted() {
    this.SET_PAGINATION_PAGE(1);
    this.SET_SEARCH_FILTER("");
    this.getListsProperties();
  },
};
</script>
<style scoped>
.encabezado {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
