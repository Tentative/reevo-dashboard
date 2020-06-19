<template>
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="ipp"
      :pager-count="5"
      :page-count="itmdata.QtaPagine"
      :current-page.sync="currentPage"
      @prev-click="prevPage()"
      @next-click="nextPage()"
      @current-change="call_itm()"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Paginate",
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    ...mapGetters({
      itm: "itm",
      ipp: "ipp",
      // tp: "tp",
      // ttp: "ttp",
      itmdata: "itmdata",
    }),
  },

  methods: {
    call_itm() {
      let itm = {
        NumeroPagina: this.currentPage,
        ItemsPerPagina: this.itmdata.ItemsPerPagina,
        Categoria: null,
        FiltroAlert: "Tutti",
        FiltroInStock: "Tutti",
      };
      this.$store.dispatch("itm_request", { itm });
    },
    nextPage() {
      if (this.currentPage != this.itmdata.QtaPagine) {
        this.currentPage = this.currentPage + 1;
      }
    },
    prevPage() {
      if (this.currentPage != 1) this.currentPage--;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/pagination.scss";
</style>
