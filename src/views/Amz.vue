<template>
  <div class="md-alignment-center-center">
    <md-dialog
      :md-active.sync="loading"
      class="spinner loading"
      :md-backdrop="false"
    >
      <spinner />
    </md-dialog>
    <Table
      :loaded="loaded"
      :items="items"
      :amzdata="amzdata"
      :loading="loading"
    />
    <div v-if="loaded" class="pagination-nav">
      <Pagination v-model="pagination" @change-page="onChangePage($event)" />
      <Jumper />
    </div>
  </div>
</template>

<script>
import { Table, Pagination, Jumper, spinner } from "@/components/AMZ/";
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
  components: { Table, Pagination, Jumper, spinner },
  data() {
    return {
      pagination: {
        itemsPerPage: 20,
        currentPage: 1,
        totalPages: '',
      },
      // items: [],
      amzdata: {},
      loading: false,
      loaded: false,
      amazon: {},
    };
  },
  computed: {
    ...mapGetters({
      amz: "amz",
      items: "items",
      amzdata: "amzdata",
      amzStatus: "amzStatus",
    }),
  },
  created() {
    this.table_request();
  },

  methods: {
    onChangePage(v) {
      this.pagination = v;
      this.table_request();
    },
    async table_request() {
      this.loading = true;
      this.loaded = false;
      let amz = this.amz;
      amz.ItemsPerPagina = this.pagination.itemsPerPage;
      amz.NumeroPagina = this.pagination.currentPage;
      try {
        const res = await this.$store.dispatch("amz_request", { amz });
        let params = JSON.parse(res.data.JsonRisposta);
        this.pagination.itemsPerPage = params.ItemsPerPagina;
        this.pagination.totalPages = params.QtaPagine;
        this.loaded = true;
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/pagination.scss";
</style>
