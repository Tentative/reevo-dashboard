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
      <Pagination />
      <Jumper />
    </div>
  </div>
</template>

<script>
import { Table, Pagination, Jumper, spinner } from "@/components/Items/";
import { mapGetters } from "vuex";
export default {
  name: "Items",
  components: { Table, Pagination, Jumper, spinner },
  data() {
    return {
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
    items_request() {
      this.loading = true;
      let itm = this.itm;
      this.$store
        .dispatch("itm_request", { itm })

        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // console.log("check su itm" + { itm });
          // console.log(res);
          this.loading = false;
          this.loaded = true;
          this.items = this.$store.getters.itm;
        });
      // .catch(err => console.log(err));
    },
  },
};
</script>
