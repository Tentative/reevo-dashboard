<template>
  <div class="md-alignment-center-center settings">
    <md-dialog
      class="price-alert"
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
            v-model="price.FiltroSRTop"
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
            v-model="price.FiltroListaRetailers"
            value="Amazon"
            :disabled="disabled_retailer"
            >Amazon</md-checkbox
          >
          <md-checkbox v-model="price.FiltroListaRetailers" value="Ibs"
            >Ibs</md-checkbox
          >
          <md-checkbox v-model="price.FiltroListaRetailers" value="Mondadori"
            >Mondadori</md-checkbox
          >
          <md-checkbox
            v-model="price.FiltroListaRetailers"
            value="LaFeltrinelli"
            >LaFeltrinelli</md-checkbox
          >
        </div>
        <div class="md-layout-item md-size-33">
          <div class="md-title">Prezzo</div>
          <md-divider></md-divider>
          <md-checkbox
            v-model="price.FiltroSuddividiPrezzo"
            true-value="Si"
            false-value="No"
            :disabled="disabled_price"
            >Suddividi per prezzo</md-checkbox
          >
          <md-checkbox
            v-model="price.FiltroPrezzoBasso"
            true-value="Si"
            false-value="No"
            :disabled="price.FiltroSuddividiPrezzo == 'No'"
            >Prezzo basso</md-checkbox
          >
          <md-checkbox
            v-model="price.FiltroPrezzoMedio"
            true-value="Si"
            false-value="No"
            :disabled="price.FiltroSuddividiPrezzo == 'No'"
            >Prezzo medio</md-checkbox
          >
          <md-checkbox
            v-model="price.FiltroPrezzoAlto"
            true-value="Si"
            false-value="No"
            :disabled="price.FiltroSuddividiPrezzo == 'No'"
            >Prezzo alto</md-checkbox
          >
        </div>
        <div class="md-layout-item md-size-33">
          <div class="md-title">Catalogo</div>
          <md-divider></md-divider>
          <md-checkbox
            v-model="price.FiltroSuddividiSR"
            true-value="Si"
            false-value="No"
            :disabled="disabled_rank"
            >Suddividi per vendite</md-checkbox
          >
          <md-checkbox
            v-model="price.FiltroSRBasso"
            true-value="Si"
            false-value="No"
            :disabled="price.FiltroSuddividiSR == 'No'"
            >Bassa Rotazione</md-checkbox
          >
          <md-checkbox
            v-model="price.FiltroSRMedio"
            true-value="Si"
            false-value="No"
            :disabled="price.FiltroSuddividiSR == 'No'"
            >Intermedia</md-checkbox
          >
          <md-checkbox
            v-model="price.FiltroSRAlto"
            true-value="Si"
            false-value="No"
            :disabled="price.FiltroSuddividiSR == 'No'"
            >Alto Vendenti</md-checkbox
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
        <span class="errors md-body-1">{{ error }}</span>
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
    error: "",
    show_price_alerts: false,
    price: {
      Categoria: null,
      FiltroGiorni: 30,
      FiltroListaRetailers: ["Amazon", "Ibs", "LaFeltrinelli", "Mondadori"],
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
    disabled_price() {
      return this.price.FiltroSuddividiSR == "Si" ||
        this.price.FiltroListaRetailers.length != 0
        ? true
        : false;
    },
    disabled_rank() {
      return this.price.FiltroSuddividiPrezzo == "Si" ||
        this.price.FiltroListaRetailers.length != 0
        ? true
        : false;
    },
    disabled_retailer() {
      return this.price.FiltroSuddividiPrezzo == "Si" ||
        this.price.FiltroSuddividiSR == "Si"
        ? true
        : false;
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
      if (this.error) {
        return;
      } else {
        let price = this.price;
        this.$store.dispatch("prc_call", { price });
        this.$store.commit("togglePriceAlerts");
      }
    },
    check_errors() {
      if (this.price.FiltroListaRetailers.length == 0) {
        this.error = "Selezionare almeno un retailer";
      }
      if (
        this.price.FiltroSuddvidiSR == "Si" &&
        this.price.FiltroSRBasso == "No" &&
        this.price.FiltroSRMedio == "No" &&
        this.price.FiltroSRAlto == "No"
      ) {
        this.error = "Selezionare almeno un valore di filtro Catalogo";
      }
      if (
        this.price.FiltroSuddividiPrezzo == "Si" &&
        this.price.FiltroPrezzoBasso == "No" &&
        this.price.FiltroPrezzoMedio == "No" &&
        this.price.FiltroPrezzoAlto == "No"
      ) {
        this.error = "Selezionare almeno un valore di filtro Prezzo";
      }
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
@import "src/assets/style/price.scss";
</style>
