<template>
  <div class="md-alignment-center-center settings">
    <md-dialog class="filter" :md-active.sync="showDialog">
      <md-dialog-title class="alert-title">Filtri</md-dialog-title>
      <md-divider class="dialog-divider"></md-divider>

      <div class="md-layout md-gutter">
        <div class="md-layout-item" style="margin-left: 24px;">
          <md-tabs md-dynamic-height>
            <md-tab class="switches-wrapper">
              <md-checkbox
                v-model="amz.FiltroAlert"
                :md-ripple="false"
                class="md-primary"
                true-value="Si"
                false-value="Tutti"
                >Mostra solo articoli con Alert
              </md-checkbox>
              <md-checkbox
                v-model="amz.FiltroInStock"
                :md-ripple="false"
                class="md-primary"
                true-value="No"
                false-value="Tutti"
                >Mostra solo articoli Fuori Stock</md-checkbox
              >
              <md-checkbox
                v-model="amz.FiltroFastTrack"
                :md-ripple="false"
                class="md-primary"
                true-value="No"
                false-value="Tutti"
                >Mostra solo articoli non Fast Track</md-checkbox
              >
              <md-checkbox
                v-model="amz.FiltroBuyBox"
                :md-ripple="false"
                class="md-primary"
                true-value="No"
                false-value="Tutti"
                >Mostra solo articoli senza BuyBox</md-checkbox
              >
              <md-checkbox
                v-model="amz.FiltroNegativeReviews"
                :md-ripple="false"
                class="md-primary"
                true-value="SoloNegative"
                false-value="Tutti"
                >Mostra solo articoli con recensioni negative maggiori del 20%
              </md-checkbox>
            </md-tab></md-tabs
          >
        </div>
      </div>

      <md-dialog-actions class="switches alert-title">
        <md-button
          :md-ripple="false"
          class="md-raised md-dense md-primary apply-button"
          @click="saveDialog"
          >Applica</md-button
        >
        <md-button
          :md-ripple="false"
          class="md-button md-secondary md-raised md-dense ignore-button md-theme-default"
          @click="ignoreDialog"
          >Ignora</md-button
        >
      </md-dialog-actions>
    </md-dialog>

    <md-button :md-ripple="false" class="setting" @click="showDialog = true"
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
      FiltroNegativeReviews: "Tutti",
    },
    computedAlert: "",
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
    },
  },
};
</script>

<style lang="scss">
@import "src/assets/style/toolbar.scss";
</style>
