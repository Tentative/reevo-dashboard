<template>
  <div class="wrap">
    <!-- <div class="select">
      <select
        v-model="itemsPerPage"
        class="select-text"
        required
        @change="call_itm()"
      >
        <option value="" disabled selected></option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <span class="select-highlight"></span>
      <span class="select-bar"></span>
      <label class="select-label">Items per pagina</label>
    </div> -->
    <div class="md-layout-item">
      <md-field>
        <label for="movie">Items per pagina</label>
        <md-select
          id="ipp"
          v-model="itemsPerPage"
          name="ipp"
          @md-selected="call_itm"
        >
          <md-option value="20">20 </md-option>
          <md-option value="50">50</md-option>
          <md-option value="100">100</md-option>
        </md-select>
      </md-field>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Jumper",
  data() {
    return {
      itemsPerPage: "20",
    };
  },
  computed: {
    ...mapGetters({
      itm: "itm",
    }),
  },
  methods: {
    call_itm() {
      let itm = {
        NumeroPagina: 1,
        ItemsPerPagina: this.itemsPerPage,
        Categoria: null,
        FiltroAlert: "Tutti",
        FiltroInStock: "Tutti",
      };
      this.$store.dispatch("itm_request", { itm });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/pagination.scss";
</style>
