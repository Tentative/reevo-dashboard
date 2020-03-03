<template>
  <div class="md-alignment-center-center login">
    <md-dialog :md-active.sync="showGraph">
      <md-dialog-title>Filters</md-dialog-title>

      <md-tabs md-dynamic-height>
        <md-tab md-label="General">
          <div>
            <md-switch
              v-model="amz.FiltroAlert"
              true-value="Si"
              false-value="Tutti"
              >Filtro Alert</md-switch
            >
            <md-switch
              v-model="amz.FiltroInStock"
              true-value="No"
              false-value="Tutti"
              >Filtro In Stock</md-switch
            >
            <md-switch
              v-model="amz.FiltroFastTrack"
              true-value="No"
              false-value="Tutti"
              >Filtro Fast Track</md-switch
            >
            <md-switch
              v-model="amz.FiltroBuyBox"
              true-value="No"
              false-value="Tutti"
              >Filtro Buy Box</md-switch
            >
            <md-switch
              v-model="amz.FiltroNegativeReviews"
              true-value="SoloNegative"
              false-value="Tutti"
              >Filtro Negative Reviews</md-switch
            >
          </div>
        </md-tab></md-tabs
      >

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false"
          >Close</md-button
        >
        <md-button class="md-primary" @click="saveDialog">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "AmzGraph",
  data: () => ({
    showGraph: false,
    amz: {
      NumeroPagina: 1,
      ItemsPerPagina: "20",
      Categoria: null,
      FiltroAlert: "Tutti",
      FiltroInStock: "Tutti",
      FiltroFastTrack: "Tutti",
      FiltroBuyBox: "Tutti",
      FiltroNegativeReviews: "Tutti"
    }
  }),
  methods: {
    saveDialog() {
      let amz = this.amz;
      this.showDialog = false;
      this.$store.dispatch("amz_request", { amz });
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/style/toolbar.scss";
</style>
