<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item md-size-50">
        <md-table class="main">
          <md-table-row>
            <md-table-head></md-table-head>
            <md-table-head>Articolo</md-table-head>
            <md-table-head>Prezzo</md-table-head>
            <md-table-head>Sconto</md-table-head>
            <md-table-head>Retailer</md-table-head>
            <md-table-head>SR</md-table-head>
          </md-table-row>
          <md-table-row v-for=""
        </md-table>
      </div>
      <div class="md-layout-item md-size-50">
        <md-table class="main">
          <md-table-row>
            <md-table-head></md-table-head>
            <md-table-head>Articolo</md-table-head>
            <md-table-head>InStock</md-table-head>
            <md-table-head>Retailer</md-table-head>
            <md-table-head>SR</md-table-head>
          </md-table-row>
        </md-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabe",
  components: "spinner",
  props: {
    maindata: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/main.scss";
</style>
