<template>
  <div>
    <div class="md-title">Price Graph</div>
    <md-dialog
      :md-active.sync="loading"
      class="graph md-scrollbar"
      @md-clicked-outside="toggleAmzGraph"
    >
      <spinner />
    </md-dialog>
    <LineChart :chartdata="pricedata" :options="priceoptions"></LineChart>
  </div>
</template>

<script>
import { LineChart, spinner } from "@/components/PriceGraph";
import { mapGetters } from "vuex";
export default {
  name: "Price",
  components: { LineChart, spinner },

  data() {
    return {
      loading: null,
    };
  },
  computed: {
    ...mapGetters({
      status: "status",
      pricedata: "pricedata",
      priceoptions: "priceoptions",
    }),
  },

  created() {
    this.prc_call();
  },
  methods: {
    prc_call() {
      this.loading = true;
      this.$store.dispatch("prc_call").then(() => {
        this.loading = false;
      });
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/style/price.scss";
</style>
