<template>
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="parseInt(ipp)"
      :pager-count="5"
      :page-count="parseInt(itm.QtaPagine)"
      :current-page.sync="currentPage"
      :total="ttp"
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
      tp: "tp",
      ttp: "ttp",
    }),
  },

  methods: {
    call_itm() {
      let itm = {
        NumeroPagina: this.currentPage,
        ItemsPerPagina: this.ipp,
        Categoria: null,
        FiltroAlert: "Tutti",
        FiltroInStock: "Tutti",
      };
      this.$store.dispatch("itm_request", { itm });
    },
    nextPage() {
      if (this.currentPage != this.ttp) {
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
