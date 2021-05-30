<template>
  <div class="md-alignment-center-center">
    <md-dialog
      :md-active.sync="loading"
      class="spinner loading"
      :md-backdrop="false"
    >
      <spinner />
    </md-dialog>
    <Table :loaded="loaded" />
    <div v-if="loaded" class="pagination-nav">
      <Pagination v-model="pagination" @change-page="onChangePage($event)" />
      <Jumper />
    </div>
  </div>
</template>

<script>
import { Table, Jumper, spinner } from "@/components/Items/";
import { Pagination } from "@/components/AMZ";
import { mapGetters } from "vuex";
export default {
  name: "Items",
  components: { Table, Pagination, Jumper, spinner },
  data() {
    return {
      pagination: {
        currentPage: 1,
        itemsPerPage: 20,
        totalPages: "",
      },
      loading: false,
      loaded: false,
    };
  },
  computed: {
    ...mapGetters({
      itm: "itm",
      itmdata: "itmdata",
    }),
  },
  created() {
    this.items_request();
  },

  methods: {
    onChangePage(v) {
      this.pagination = v;
      this.items_request();
    },
    async items_request() {
      this.loading = true;
      let itm = this.itm;
      itm.ItemsPerPagina = this.pagination.itemsPerPage;
      itm.NumeroPagina = this.pagination.currentPage;
      await this.$store
        .dispatch("itm_request", { itm })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          console.log(res, "res");
          let params = JSON.parse(res.data.JsonRisposta);
          this.pagination.currentPage = params.NumeroPagina;
          this.pagination.totalPages = params.QtaPagine;
          this.pagination.itemsPerPage = params.ItemsPerPagina;
          // console.log("check su itm" + { itm });
          // console.log(res);
          this.loading = false;
          this.loaded = true;
          this.items = params;
        });
      // .catch(err => console.log(err));
    },
  },
};
</script>
