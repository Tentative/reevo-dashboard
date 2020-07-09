<template>
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size.sync="ipp"
      :pager-count="5"
      :page-count="parseInt(amzdata.QtaPagine)"
      :current-page.sync="cp"
      :total="totalPages"
      @prev-click="prevPage()"
      @next-click="nextPage()"
      @current-change="call_amz()"
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
      currentPage: null,
      itemsPerPage: null,
    };
  },
  computed: {
    ...mapGetters({
      amzdata: "amzdata",
      itemsPerPage: "itemsPerPage",
      thisPage: "thisPage",
      totalPages: "totalPages",
    }),
    cp: {
      get() {
        return localStorage.getItem("current-page");
      },
      set(newValue) {
        return (this.currentPage = newValue);
      },
    },
    ipp: {
      get() {
        return localStorage.getItem("items-per-page");
      },
      set(newValue) {
        return (this.itemsPerPage = newValue);
      },
    },
  },
  created() {
    localStorage.getItem("current-page")
      ? (this.currentPage = localStorage.getItem("current-page"))
      : (this.currentPage = 1);
    localStorage.getItem("items-per-page")
      ? (this.itemsPerPage = localStorage.getItem("items-per-page"))
      : (this.itemsPerPage = 20);
  },

  methods: {
    call_amz() {
      localStorage.setItem("current-page", this.currentPage);
      localStorage.setItem("items-per-page", this.itemsPerPage);
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
    nextPage() {
      if (this.currentPage != this.totalPages) {
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
