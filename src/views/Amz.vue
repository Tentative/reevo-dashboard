<template>
  <div class="md-alignment-center-center">
    <Table :items="items" :amzdata="amzdata" :loading="loading" />
    <md-table-pagination
      :md-size="5"
      :md-total="amzdata.QtaRecords"
      md-page="1"
      :md-page-options="[5, 10, 25, 50]"
      @pagination="onPagination"
    >
    </md-table-pagination>
  </div>
</template>

<script>
import Table from "@/components/AMZ";
import { mapGetters } from "vuex";
export default {
  name: "Amz",
  components: { Table },
  created() {
    this.table_request();
  },
  data() {
    return {
      items: [],
      amzdata: {},
      loading: false,
      amazon: {}
    };
  },
  computed: {
    ...mapGetters({
      amz: "amz"
    })
  },
  methods: {
    table_request() {
      this.loading = true;
      let amz_request = this.$store.getters.amz;
      this.$store
        .dispatch("amz_request", amz_request)

        // eslint-disable-next-line no-unused-vars
        .then(res => {
          console.log("check su amz" + amz_request);
          console.log(res);
          this.loading = false;
          this.items = this.$store.getters.amz;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style></style>
