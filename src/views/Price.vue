<template>
  <div>
    <div class="alert-wrapper">
      <div class="md-title">Price Graph</div>
      <Alerts />
    </div>
    <md-dialog :md-active.sync="loading" class="graph md-scrollbar loading">
      <spinner />
    </md-dialog>
    <div class="container">
      <LineChart
        v-if="loaded"
        :chartdata.sync="pricedata"
        :options.sync="priceoptions"
        style="width: 100%; margin-top: 20px;"
      ></LineChart>
    </div>
  </div>
</template>

<script>
import { LineChart, spinner, Alerts } from "@/components/PriceGraph";
import { mapGetters } from "vuex";
export default {
  name: "Price",
  components: { LineChart, spinner, Alerts },

  data() {
    return {
      loading: null,
      loaded: false,
      chartdata: null,
      price: {
        Categoria: null,
        FiltroGiorni: 30,
        FiltroListaRetailers: null,
        FiltroStessiProdotti: "No",
        FiltroIndex: "No",
        FiltroSuddividiPrezzo: "No",
        FiltroPrezzoBasso: "Si",
        FiltroPrezzoMedio: "Si",
        FiltroPrezzoAlto: "Si",
        FiltroSuddividiSR: "No",
        FiltroSRBasso: "Si",
        FiltroSRMedio: "Si",
        FiltroSRAlto: "Si",
        FiltroSRTop: "No",
      },
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
    let price = this.price;
    try {
      const { res } = await this.$store.dispatch("prc_call", { price });
      this.chartdata = res;
      this.loaded = true;
      this.loading = false;
    } catch (e) {
      this.loading = false;
      console.log(e);
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
