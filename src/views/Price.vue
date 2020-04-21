<template>
  <div>
    <div class="md-title">Price Graph</div>
    <md-dialog :md-active.sync="loading" class="graph md-scrollbar loading">
      <spinner />
    </md-dialog>
    <div class="container">
      <LineChart
        v-if="loaded"
        :chartdata.sync="pricedata"
        :options.sync="priceoptions"
        style="width: 1200px; height: 600px;"
      ></LineChart>
    </div>
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
      loaded: false,
      chartdata: null,
    };
  },

  computed: {
    ...mapGetters({
      status: "status",
      pricedata: "pricedata",
      priceoptions: "priceoptions",
    }),
  },

  async mounted() {
    this.loading = true;
    this.loaded = false;
    try {
      const { res } = await this.$store.dispatch("prc_call");
      this.chartdata = res;
      this.loaded = true;
      this.loading = false;
    } catch (e) {
      // console.log(e);
    }
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
