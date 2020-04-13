<template>
  <div class="md-alignment-center-center">
    <Table />
    <Pagination />
    <!--
    <Jumper />
    -->
  </div>
</template>

<script>
import { Table, Pagination } from "@/components/Items/";
import { mapGetters } from "vuex";
export default {
  name: "Items",
  components: { Table, Pagination },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      itm: "itm",
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
          this.items = this.$store.getters.itm;
        });
      // .catch(err => console.log(err));
    },
  },
};
</script>
