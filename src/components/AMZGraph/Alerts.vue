<template>
  <div class="md-alignment-center-center settings">
    <md-dialog class="filter" :md-active.sync="showDialog">
      <md-dialog-title class="alert-title">Filtri</md-dialog-title>
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-75 ">
          <md-tabs md-dynamic-height>
            <md-tab>
              <md-switch
                class="md-primary"
                v-model="amz.FiltroAlert"
                true-value="Si"
                false-value="Tutti"
                >Mostra solo articoli con Alert
              </md-switch>
              <md-switch
                class="md-primary"
                v-model="amz.FiltroInStock"
                true-value="No"
                false-value="Tutti"
                >Mostra solo articoli Fuori Stock</md-switch
              >
              <md-switch
                class="md-primary"
                v-model="amz.FiltroFastTrack"
                true-value="No"
                false-value="Tutti"
                >Mostra solo articoli non Fast Track</md-switch
              >
              <md-switch
                class="md-primary"
                v-model="amz.FiltroBuyBox"
                true-value="No"
                false-value="Tutti"
                >Mostra solo articoli senza BuyBox</md-switch
              >
              <md-switch
                class="md-primary"
                v-model="amz.FiltroNegativeReviews"
                true-value="SoloNegative"
                false-value="Tutti"
                >Mostra solo articoli con recensioni negative maggiori del 20%
              </md-switch>
            </md-tab></md-tabs
          >
        </div>
      </div>

      <md-dialog-actions class="switches">
        <md-button
          class="md-dense md-secondary ignore-button"
          @click="ignoreDialog"
          >Ignora</md-button
        >
        <md-button
          class="md-raised md-dense md-primary apply-button"
          @click="saveDialog"
          >Applica</md-button
        >
      </md-dialog-actions>
    </md-dialog>

    <md-button class="setting" @click="showDialog = true"
      ><md-icon>settings</md-icon></md-button
    >
  </div>
</template>

<script>
export default {
  name: "Alerts",
  data: () => ({
    showDialog: false,
    amz: {
      NumeroPagina: 1,
      ItemsPerPagina: "20",
      Categoria: null,
      FiltroAlert: "Tutti",
      FiltroInStock: "Tutti",
      FiltroFastTrack: "Tutti",
      FiltroBuyBox: "Tutti",
      FiltroNegativeReviews: "Tutti"
    },
    computedAlert: ""
  }),
  methods: {
    saveDialog() {
      let amz = this.amz;
      this.showDialog = false;
      this.$store.dispatch("amz_request", { amz });
    },
    ignoreDialog() {
      this.showDialog = false;
      this.amz.FiltroAlert = "Tutti";
      this.amz.FiltroInStock = "Tutti";
      this.amz.FiltroFastTrack = "Tutti";
      this.amz.FiltroBuyBox = "Tutti";
      this.amz.FiltroNegativeReviews = "Tutti";
    },

    computedText() {
      if (this.FiltroAlert == "Tutti") {
        this.computedAlert = "Mostra tutti gli articoli";
      } else {
        this.computedAlert = "Solo articoli con alert";
      }
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/style/toolbar.scss";
</style>
