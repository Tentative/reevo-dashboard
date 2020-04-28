<template>
  <div class="md-alignment-center-center settings">
    <md-dialog
      class="price-alert"
      :md-active.sync="priceAlerts"
      @md-clicked-outside="showPriceAlerts"
    >
      <md-dialog-title class="">Filtri</md-dialog-title>
      <div class="md-layout md-gutter">
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

      <div class="md-layout -md-gutter">
        <div class="md-layout-item md-size-33">
          <div class="md-title">Retailer</div>
          <md-divider></md-divider>
          <div v-for="retailer in listaRetailers" :key="retailer">
            <md-checkbox
              v-model="price.FiltroListaRetailers"
              :value="`${retailer}`"
              >{{ retailer }}</md-checkbox
            >
          </div>
          <span v-show="no_selected" class="error"
            >Selezionare almeno un retailer</span
          >
        </div>
        <div class="md-layout-item md-size-33">
          <div class="md-title">Prezzo</div>
          <md-divider></md-divider>
          <md-checkbox
            v-model="price.FiltroSuddividiPrezzo"
            true-value="Si"
            false-value="No"
            :disabled="price.FiltroSuddividiSR == 'Si'"
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
          <span v-show="no_price == true" class="error"
            >Selezionare almeno un valore</span
          >
        </div>
        <div class="md-layout-item md-size-33">
          <div class="md-title">Catalogo</div>
          <md-divider></md-divider>
          <md-checkbox
            v-model="price.FiltroSuddividiSR"
            true-value="Si"
            false-value="No"
            :disabled="price.FiltroSuddividiPrezzo == 'Si'"
            >Suddividi per vendite</md-checkbox
          >
          <md-checkbox
            id="basso"
            v-model="price.FiltroSRBasso"
            true-value="Si"
            false-value="No"
            :disabled="price.FiltroSuddividiSR == 'No'"
            >Bassa Rotazione</md-checkbox
          >
          <md-checkbox
            id="medio"
            v-model="price.FiltroSRMedio"
            true-value="Si"
            false-value="No"
            :disabled="price.FiltroSuddividiSR == 'No'"
            >Intermedia</md-checkbox
          >
          <md-checkbox
            id="alto"
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
          :disabled="no_selected"
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
  props: {
    price: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    error: "",
    show_price_alerts: false,
    //   price: {
    //     Categoria: null,
    //     FiltroGiorni: 30,
    //     FiltroListaRetailers: [],
    //     FiltroStessiProdotti: "No",
    //     FiltroIndex: "No",
    //     FiltroSuddividiPrezzo: "No",
    //     FiltroPrezzoBasso: "Si",
    //     FiltroPrezzoMedio: "Si",
    //     FiltroPrezzoAlto: "Si",
    //     FiltroSuddividiSR: "No",
    //     FiltroSRBasso: "Si",
    //     FiltroSRMedio: "Si",
    //     FiltroSRAlto: "Si",
    //     FiltroSRTop: "No",
    //   },
    //   computedAlert: "",
  }),
  computed: {
    isVisible() {
      return this.$store.getters.show_price_alerts;
    },
    listaRetailers() {
      return this.$store.getters.listaRetailers;
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
    no_selected() {
      if (this.price.FiltroListaRetailers.length == 0) {
        return true;
      }
      return false;
    },
    no_price() {
      let prezzo_basso = this.price.FiltroPrezzoBasso;
      let prezzo_medio = this.price.FiltroPrezzoMedio;
      let prezzo_alto = this.price.FiltroPrezzoAlto;
      if (
        this.price.FiltroSuddividiPrezzo == "Si" &&
        prezzo_basso == "No" &&
        prezzo_medio == "No" &&
        !prezzo_alto == "No"
      ) {
        return true;
      }
      return false;
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
    restore_price() {
      this.price.FiltroPrezzoBasso = !this.price.FiltroPrezzoBasso;
      this.price.FiltroPrezzoMedio = !this.price.FiltroPrezzoMedio;
      this.price.FiltroPrezzoAlto = !this.price.FiltroPrezzoAlto;
    },
    saveDialog() {
      let price = this.price;
      this.$emit("update-call", { price });
      this.showPriceAlerts();
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
