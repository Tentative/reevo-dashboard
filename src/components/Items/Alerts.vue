<template>
  <div class="md-alignment-center-center settings">
    <md-dialog class="filter" :md-active.sync="showDialog">
      <md-dialog-title class="alert-title">Filtri</md-dialog-title>
      <md-divider
        style="width: 70%; margin-left: auto; margin-right: auto;"
      ></md-divider>
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-75">
          <md-tabs md-dynamic-height>
            <md-tab class="switches-wrapper">
              <md-checkbox
                v-model="itm.FiltroAlert"
                class="md-primary"
                true-value="Si"
                false-value="Tutti"
                >Mostra solo articoli con Alert
              </md-checkbox>
              <md-checkbox
                v-model="itm.FiltroInStock"
                class="md-primary"
                true-value="No"
                false-value="Tutti"
                >Mostra solo articoli Fuori Stock</md-checkbox
              >
            </md-tab></md-tabs
          >
        </div>
      </div>

      <md-dialog-actions class="switches alert-title">
        <md-button
          class="md-raised md-dense md-primary apply-button"
          @click="saveDialog"
          >Applica</md-button
        >
        <md-button
          class="md-button md-secondary md-raised md-dense ignore-button md-theme-default"
          @click="ignoreDialog"
          >Ignora</md-button
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
    itm: {
      NumeroPagina: 1,
      ItemsPerPagina: "20",
      Categoria: null,
      FiltroAlert: "Tutti",
      FiltroInStock: "Tutti",
    },
    computedAlert: "",
  }),
  methods: {
    saveDialog() {
      let itm = this.itm;
      this.showDialog = false;
      this.$store.dispatch("itm_request", { itm });
    },
    ignoreDialog() {
      this.showDialog = false;
      this.itm.FiltroAlert = "Tutti";
      this.itm.FiltroInStock = "Tutti";
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
