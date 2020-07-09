<template>
  <div class="wrap">
    <div class="select">
      <select
        v-model="itemsPerPage"
        class="select-text"
        required
        @change="call_amz()"
      >
        <option value="" disabled selected></option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <span class="select-highlight"></span>
      <span class="select-bar"></span>
      <label class="select-label">Items per pagina</label>
    </div>
    <!-- <md-field id="iperpage" @change="call_amz()">
      <label for="Items per pagina">Items per pagina</label>
      <md-select
        id="ipp"
        v-model="itemsPerPage"
        name="ipp"
        md-dense
        @md-selected="call_amz()"
      >
        <md-option value="20">20</md-option>
        <md-option value="50">50</md-option>
        <md-option value="100">100</md-option>
      </md-select>
    </md-field> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Jumper",
  data() {
    return {
      itemsPerPage: "20",
      currentPage: 1,
    };
  },
  computed: {
    ...mapGetters({
      amz: "amz",
    }),
    // ipp: {
    //   get() {
    //     return localStorage.getItem("items-per-page");
    //   },
    //   set(newValue) {
    //     return (this.ipp = newValue);
    //   },
    // },
  },
  methods: {
    call_amz() {
      localStorage.setItem("items-per-page", this.itemsPerPage);
      let amz = {
        NumeroPagina: 1,
        ItemsPerPagina: this.itemsPerPage,
        Categoria: null,
        FiltroAlert: "Tutti",
        FiltroInStock: "Tutti",
        FiltroFastTrack: "Tutti",
        FiltroBuyBox: "Tutti",
        FiltroNegativeReviews: "Tutti",
      };
      this.$store.dispatch("amz_request", { amz });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/pagination.scss";
</style>
