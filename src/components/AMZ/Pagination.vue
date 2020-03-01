<template>
  <paginate
    v-model="dummy"
    :page-count="20"
    :page-range="3"
    :margin-pages="2"
    :click-handler="update_params"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'"
    :page-class="'page-item'"
  >
  </paginate>
</template>
<script>
import { mapGetters } from "vuex";
// import Paginate from "vuejs-paginate";
export default {
  name: "Pagination",
  computed: {
    ...mapGetters({
      amzdata: "amzdata"
    })
  },
  // components: { Paginate },
  data() {
    return {
      dummy: 2
    };
  },

  methods: {
    update_params() {
      let new_data = {
        total_page: this.mdPageSize,
        number_per_page: this.mdPageSize
      };
      this.$store.dispatch("update_params", new_data);
    },
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

<style lang="scss">
@import "@/assets/style/pagination.scss";
</style>
