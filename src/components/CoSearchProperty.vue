<template>
  <section>
    <div class="columns">
      <div class="column is-10">
        <b-field>
          <input
            class="input is-large"
            type="search"
            placeholder="Search properties for title"
            v-model="txt_filter"
            @keyup.enter="filterProperties"
          />
          <b-button
            icon-left="magnify"
            size="is-large"
            type="is-primary"
            @click="filterProperties"
          >Search</b-button>
        </b-field>
      </div>
      <div class="column is-2">
        <b-select
          placeholder="Ver"
          class="text-right"
          size="is-large"
          v-model="pagination.perPage"
          @input="onChangePerPage"
        >
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="24">24</option>
        </b-select>
      </div>
    </div>
    <hr />
    <slot></slot>
    <hr />
    <CoPagination :pagination="pagination" @changePage="onChangePage" />
  </section>
</template>
<script>
import CoPagination from "@/components/CoPagination.vue";
export default {
  name: "CoSearch",
  components: {
    CoPagination
  },
  data() {
    return {
      txt_filter: ""
    };
  },
  props: {
    pagination: { type: Object, required: true }
  },
  methods: {
    onChangePerPage(perpage) {
      this.pagination.perPage = perpage;
      this.$emit("onChangePerPage", perpage);
    },
    onChangePage(page) {
      this.pagination.page = page;
      this.$emit("onChangePage", page);
    },
    filterProperties() {
      this.$emit("onFilterProperties", this.txt_filter);
    }
  }
};
</script>
<style scoped>
section {
  margin-top: 30px;
}
.text-right {
  text-align: right;
}
</style>
