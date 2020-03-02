<template>
  <div>
    <v-pagination> cazz </v-pagination>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Pagination",
  computed: {
    ...mapGetters({
      amzdata: "amzdata",
      itemsPerPage: "itemsPerPage",
      currentPage: "currentPage"
    })
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
    table_request() {
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

<style lang="scss">
// @import "@/assets/style/pagination.scss";
</style>
