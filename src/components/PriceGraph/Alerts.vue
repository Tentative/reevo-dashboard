<template>
  <div class="md-alignment-center-center settings">
    <md-dialog
      class=""
      :md-active.sync="priceAlerts"
      @md-clicked-outside="showPriceAlerts"
    >
      <md-dialog-title class="">Filtri</md-dialog-title>
      <div class="md-layout">
        <div class="md-layout-item md-size-100">
          <md-checkbox
            v-model="price.FiltroStessiProdotti"
            true-value="Si"
            false-value="No"
            >Mostra solo articoli presenti in tutti i Retailer
            selezionati</md-checkbox
          >
          <md-checkbox
            v-model="price.FiltroIndex"
            true-value="Si"
            false-value="No"
            >Grafico a indice 100</md-checkbox
          >
          <md-checkbox
            v-model="price.FiltroIndex"
            true-value="Si"
            false-value="No"
            >Includi solo articoli top</md-checkbox
          >
        </div>
      </div>

      <div class="md-layout">
        <div class="md-layout-item md-size-33">
          <div class="md-title">Retailer</div>
          <md-divider></md-divider>
          <md-checkbox
            v-model="price.FiltroIndex"
            true-value="Si"
            false-value="No"
            >Includi solo articoli top</md-checkbox
          >
        </div>
      </div>

      <md-divider></md-divider>

      <md-dialog-actions class="switches alert-title">
        <md-button
          class="md-raised md-dense md-primary apply-button"
          @click="saveDialog"
          >Applica</md-button
        >
        <md-button
          class="md-accent md-raised md-dense ignore-button"
          @click="ignorePriceAlerts"
          >Ignora</md-button
        >
      </md-dialog-actions>
    </md-dialog>

    <md-button class="setting" @click="showPriceAlerts"
      ><md-icon>settings</md-icon></md-button
    >
  </div>
</template>

<script>
export default {
  name: "Alerts",
  data: () => ({
    show_price_alerts: false,
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
    computedAlert: "",
  }),
  computed: {
    isVisible() {
      return this.$store.getters.show_price_alerts;
    },

    priceAlerts: {
      get() {
        return this.isVisible;
      },
      set(newValue) {
        return newValue;
      },
    },
  },
  methods: {
    showPriceAlerts() {
      this.$store.commit("togglePriceAlerts");
    },
    saveDialog() {
      let price = this.price;
      this.$store.commit("togglePriceAlerts");
      this.$store.dispatch("prc_call", { price });
    },
    ignorePriceAlerts() {
      this.$store.commit("togglePriceAlerts");
      //   this.amz.FiltroAlert = "Tutti";
      //   this.amz.FiltroInStock = "Tutti";
      //   this.amz.FiltroFastTrack = "Tutti";
      //   this.amz.FiltroBuyBox = "Tutti";
      //   this.amz.FiltroNegativeReviews = "Tutti";
    },

    computedText() {
      if (this.FiltroAlert == "Tutti") {
        this.computedAlert = "Mostra tutti gli articoli";
      } else {
        this.computedAlert = "Solo articoli con alert";
      }
    },
  },
};
</script>

<style lang="scss">
@import "src/assets/style/toolbar.scss";
</style>
