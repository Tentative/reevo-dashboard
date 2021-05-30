<template>
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :pager-count="5"
      :page-size.sync="pagination.itemsPerPage"
      :page-count="pagination.totalPages"
      :current-page.sync="pagination.currentPage"
      :total="pagination.totalPages"
      @prev-click="prevPage()"
      @next-click="nextPage()"
      @current-change="onChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Paginate",
  props: {
    value: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      pagination: {
        currentPage: this.value.currentPage,
        totalPages: this.value.totalPages,
        itemsPerPage: this.value.itemsPerPage,
      },
    };
  },
  watch: {
    pagination: {
      deep: true,
      handler(v) {
        this.$emit("change-page", v);
      },
    },
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters({
      amzdata: "amzdata",
      itemsPerPage: "itemsPerPage",
      thisPage: "thisPage",
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
    onChange(v) {
      this.pagination.currentPage = v;
    },
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
      if (this.pagination.currentPage !== this.pagination.totalPages) {
        this.pagination.currentPage++;
      }
    },
    prevPage() {
      if (this.pagination.currentPage !== 1) this.pagination.currentPage--;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/pagination.scss";
</style>
