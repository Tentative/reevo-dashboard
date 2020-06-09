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
      amz: "amz",
    }),
  },
  methods: {
    call_amz() {
      let amz = {
        NumeroPagina: this.currentPage,
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
