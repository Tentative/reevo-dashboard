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
      <Pagination />
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
    async table_request() {
      this.loading = true;
      this.loaded = false;
      let amz = this.amz;
      try {
        const { res } = await this.$store.dispatch("amz_request", { amz });
        this.amzdata = res;
        this.loaded = true;
        this.loading = false;
      } catch (e) {
        this.loading = false;
        // console.log(e);
      }
    },
    // table_request() {
    //   this.loading = true;
    //   let amz = this.amz;
    //   this.$store
    //     .dispatch("amz_request", { amz })

    //     // eslint-disable-next-line no-unused-vars
    //     .then((res) => {
    //       // console.log("check su amz" + { amz });
    //       // console.log(res);
    //       this.loading = false;
    //       this.items = this.$store.getters.amz;
    //     });
    //   // .catch(err => console.log(err));
    // },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/pagination.scss";
</style>
