<template>
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="itemsPerPage"
      :pager-count="5"
      :page-count="parseInt(amzdata.QtaPagine)"
      :current-page.sync="currentPage"
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
  computed: {
    ...mapGetters({
      amzdata: "amzdata",
      itemsPerPage: "itemsPerPage",
      thisPage: "thisPage",
      totalPages: "totalPages"
    })
  },
  data() {
    return {
      currentPage: 1
    };
  },
  // components: { BootstrapVue, IconsPlugin },

  methods: {
    // update_params() {
    //   let new_data = {
    //     total_page: this.mdPageSize,
    //     numeroPagina: this.currentPage
    //   };
    //   this.$store.commit("update_params", new_data);
    //   this.table_request();
    // },
    call_amz() {
      let amz = {
        NumeroPagina: this.currentPage,
        ItemsPerPagina: this.itemsPerPage,
        Categoria: null,
        FiltroAlert: "Tutti",
        FiltroInStock: "Tutti",
        FiltroFastTrack: "Tutti",
        FiltroBuyBox: "Tutti",
        FiltroNegativeReviews: "Tutti"
      };
      this.$store.dispatch("amz_request", { amz });
    },
    nextPage() {
      if (this.currentPage != this.totalPages) {
        this.currentPage = this.currentPage + 1;
        console.log(this.currentPage);
      }
    },
    prevPage() {
      if (this.currentPage != 1) this.currentPage--;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/style/pagination.scss";
</style>
