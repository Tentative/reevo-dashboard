<template>
  <div class="md-alignment-center-center">
    <Table :items="items" :amzdata="amzdata" :loading="loading" />
    <Pagination />
  </div>
</template>

<script>
import { Table, Pagination } from "@/components/AMZ/";
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
  components: { Table, Pagination },
  created() {
    this.table_request();
  },
  data() {
    return {
      // items: [],
      // amzdata: {},
      loading: false,
      amazon: {}
    };
  },
  computed: {
    ...mapGetters({
      amz: "amz",
      items: "items",
      amzdata: "amzdata"
    })
  },
  methods: {
    table_request() {
      this.loading = true;
      let amz_request = this.amz;
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
<style lang="scss" scoped>
@import "@/assets/style/pagination.scss";
</style>
