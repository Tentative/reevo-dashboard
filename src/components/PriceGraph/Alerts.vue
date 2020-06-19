<template>
  <div class="md-alignment-center-center settings">
    <md-dialog
      class="price-alert price-settings"
      :md-active.sync="priceAlerts"
      @md-clicked-outside="showPriceAlerts"
    >
      <md-dialog-title class="">Filtri</md-dialog-title>
      <md-divider
        style="width:70%; margin-left: auto, margin-right: auto"
      ></md-divider>
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-100">
          <md-checkbox
            v-model="price.FiltroStessiProdotti"
            class="md-primary"
            true-value="Si"
            false-value="No"
            >Mostra solo articoli presenti in tutti i Retailer
            selezionati</md-checkbox
          >
          <md-checkbox
            v-model="price.FiltroIndex"
            class="md-primary"
            true-value="Si"
            false-value="No"
            >Grafico a indice 100</md-checkbox
          >
          <md-checkbox
            v-model="price.FiltroSRTop"
            true-value="Si"
            false-value="No"
            class="md-primary"
            :disabled="sr_top_disabled"
            >Includi solo articoli top</md-checkbox
          >
        </div>
      </div>

      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-33">
          <div class="md-title">Retailer</div>
          <md-divider></md-divider>
          <div v-for="retailer in listaRetailers" :key="retailer">
            <md-checkbox
              v-model="price.FiltroListaRetailers"
              class="md-primary"
              :value="`${retailer}`"
              :checked="suddividi_retailer"
              >{{ retailer }}</md-checkbox
            >
          </div>
        </div>
        <div class="md-layout-item md-size-33">
          <div class="md-title">Prezzo</div>
          <md-divider></md-divider>
          <md-checkbox
            v-model="price.FiltroSuddividiPrezzo"
            class="md-primary"
            true-value="Si"
            false-value="No"
            :disabled="price_disabled"
            >Suddividi per prezzo</md-checkbox
          >
          <md-checkbox
            v-model="price.FiltroPrezzoBasso"
            class="md-primary"
            true-value="Si"
            false-value="No"
            :disabled="suddividi_prezzo"
            >Prezzo basso</md-checkbox
          >
          <md-checkbox
            v-model="price.FiltroPrezzoMedio"
            class="md-primary"
            true-value="Si"
            false-value="No"
            :disabled="suddividi_prezzo"
            >Prezzo medio</md-checkbox
          >
          <md-checkbox
            v-model="price.FiltroPrezzoAlto"
            class="md-primary"
            true-value="Si"
            false-value="No"
            :disabled="suddividi_prezzo"
            >Prezzo alto</md-checkbox
          >
        </div>
        <div class="md-layout-item md-size-33">
          <div class="md-title">Catalogo</div>
          <md-divider></md-divider>
          <md-checkbox
            v-model="price.FiltroSuddividiSR"
            class="md-primary"
            true-value="Si"
            false-value="No"
            :disabled="sr_disabled"
            >Suddividi per vendite</md-checkbox
          >
          <md-checkbox
            id="basso"
            v-model="price.FiltroSRBasso"
            class="md-primary"
            true-value="Si"
            false-value="No"
            :disabled="suddividi_rank"
            >Bassa Rotazione</md-checkbox
          >
          <md-checkbox
            id="medio"
            v-model="price.FiltroSRMedio"
            class="md-primary"
            true-value="Si"
            false-value="No"
            :disabled="suddividi_rank"
            >Intermedia</md-checkbox
          >
          <md-checkbox
            id="alto"
            v-model="price.FiltroSRAlto"
            class="md-primary"
            true-value="Si"
            false-value="No"
            :disabled="suddividi_rank"
            >Alto Vendenti</md-checkbox
          >
        </div>
      </div>
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-33">
          <span v-show="no_selected" class="error"
            >Selezionare almeno un retailer</span
          >
        </div>
        <div class="md-layout-item md-size-33">
          <span v-show="no_price" class="error"
            >Selezionare almeno un valore Prezzo</span
          >
        </div>
        <div class="md-layout-item md-size-33">
          <span v-show="no_sr" class="error"
            >Selezionare almeno un valore Catalogo</span
          >
        </div>
      </div>

      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <md-dialog-actions id="price-actions">
            <md-button
              class="md-raised md-dense md-primary apply-button"
              :disabled="no_selected || no_price || no_sr"
              @click="saveDialog"
              >Applica</md-button
            >
            <md-button
              class="md-button md-secondary md-raised md-dense ignore-button md-theme-default"
              @click="ignorePriceAlerts"
              >Ignora</md-button
            >
          </md-dialog-actions>
        </div>
      </div>
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
    choices_retailer: [],
    price: {
      Categoria: null,
      FiltroGiorni: 30,
      FiltroListaRetailers: [],
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
    suddividi_prezzo() {
      if (this.price.FiltroSuddividiPrezzo == "No") {
        return true;
      }
      return false;
    },
    suddividi_retailer() {
      if (this.price.FiltroListaRetailers.length == 0) {
        return true;
      }
      return false;
    },

    suddividi_rank() {
      if (this.price.FiltroSuddividiSR == "No") {
        return true;
      }
      return false;
    },
    price_disabled() {
      if (
        this.price.FiltroSuddividiSR == "Si" ||
        this.price.FiltroSRTop == "Si"
      ) {
        return true;
      }
      return false;
    },
    sr_disabled() {
      if (
        this.price.FiltroSuddividiPrezzo == "Si" ||
        this.price.FiltroSRTop == "Si"
      ) {
        return true;
      }
      return false;
    },
    sr_top_disabled() {
      if (
        this.price.FiltroSuddividiPrezzo == "Si" ||
        this.price.FiltroSuddividiSR == "Si"
      ) {
        return true;
      }
      return false;
    },
    retailer_all() {
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
        prezzo_alto == "No"
      ) {
        return true;
      }
      return false;
    },
    no_sr() {
      let srAlto = this.price.FiltroSRAlto;
      let srMedio = this.price.FiltroSRMedio;
      let srBasso = this.price.FiltroSRBasso;
      if (
        this.price.FiltroSuddividiSR == "Si" &&
        srAlto == "No" &&
        srMedio == "No" &&
        srBasso == "No"
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
    clear_data() {
      this.price.Categoria = null;
      this.price.FiltroGiorni = 30;
      this.price.FiltroListaRetailers = [];
      this.price.FiltroStessiProdotti = "No";
      this.price.FiltroIndex = "No";
      this.price.FiltroSuddividiPrezzo = "No";
      this.price.FiltroPrezzoBasso = "Si";
      this.price.FiltroPrezzoMedio = "Si";
      this.price.FiltroPrezzoAlto = "Si";
      this.price.FiltroSuddividiSR = "No";
      this.price.FiltroSRBasso = "Si";
      this.price.FiltroSRMedio = "Si";
      this.price.FiltroSRAlto = "Si";
      this.price.FiltroSRTop = "No";
    },

    ignorePriceAlerts() {
      this.$store.commit("togglePriceAlerts");
      this.clear_data();
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
