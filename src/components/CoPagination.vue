<template>
  <div class="group_pagination">
    <div class="buttons">
      <button
        class="button is-info"
        v-if="pagination.page>1"
        @click="onChangePage(pagination.page-1)"
      >
        <b-icon pack="fas" icon="fa fa-angle-double-left"></b-icon>
        <span>Anterior</span>
      </button>
      <button class="button is-info" v-else disabled>
        <b-icon pack="fas" icon="fa fa-angle-double-left"></b-icon>
        <span>Anterior</span>
      </button>
      <button
        class="button is-info"
        v-if="pagination.page<pagination.totalPages"
        @click="onChangePage(pagination.page+1)"
      >
        <span>Siguiente</span>
        <b-icon pack="fas" icon="fa fa-angle-double-right"></b-icon>
      </button>
      <button class="button is-info" v-else disabled>
        <span>Siguiente</span>
        <b-icon pack="fas" icon="fa fa-angle-double-right"></b-icon>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "CoPagination",
  props: {
    pagination: { type: Object, required: true }
  },
  methods: {
    onChangePage(page) {
      this.$emit("changePage", page);
    }
  }
};
</script>
<style scoped>
.group_pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
