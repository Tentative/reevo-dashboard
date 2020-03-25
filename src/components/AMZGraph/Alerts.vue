<template>
  <div class="md-alignment-center-center settings">
    <md-dialog class="filter" :md-active.sync="showDialog">
      <md-dialog-title>Filtri</md-dialog-title>
      <div class="md-layout">
        <div class="md-layout-item ">
          <md-tabs md-dynamic-height>
            <md-tab>
              <md-switch
                v-model="amz.FiltroAlert"
                true-value="Si"
                false-value="Tutti"
                >{{
                  amz.FiltroAlert == "Tutti"
                    ? "Mostra tutti gli articoli"
                    : "Mostra solo articoli con Alert"
                }}</md-switch
              >
              <md-switch
                v-model="amz.FiltroInStock"
                true-value="No"
                false-value="Tutti"
                >{{
                  amz.FiltroInStock == "Tutti"
                    ? "Mostra tutti gli articoli"
                    : "Mostra solo articoli Fuori Stock"
                }}</md-switch
              >
              <md-switch
                v-model="amz.FiltroFastTrack"
                true-value="No"
                false-value="Tutti"
                >{{
                  amz.FiltroFastTrack == "Tutti"
                    ? "Mostra tutti gli articoli"
                    : "Mostra solo articoli non Fast Track"
                }}</md-switch
              >
              <md-switch
                v-model="amz.FiltroBuyBox"
                true-value="No"
                false-value="Tutti"
                >{{
                  amz.FiltroBuyBox == "Tutti"
                    ? "Mostra tutti gli articoli"
                    : "Mostra solo articoli senza BuyBox"
                }}</md-switch
              >
              <md-switch
                v-model="amz.FiltroNegativeReviews"
                true-value="SoloNegative"
                false-value="Tutti"
                >{{
                  amz.FiltroNegativeReviews == "Tutti"
                    ? "Mostra tutti gli articoli"
                    : "Mostra solo articoli con recensioni negative maggiori del 20%"
                }}</md-switch
              >
            </md-tab></md-tabs
          >
        </div>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false"
          >Close</md-button
        >
        <md-button class="md-primary" @click="saveDialog">Save</md-button>
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
