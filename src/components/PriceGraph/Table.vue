<template>
  <div>
    <md-table class="amz">
      <md-table-row>
        <md-table-head>Retailer / Curva</md-table-head>
        <md-table-head>Articoli</md-table-head>
        <md-table-head>Media attuale</md-table-head>
        <md-table-head>Media storica </md-table-head>
        <md-table-head># Aumenti </md-table-head>
        <md-table-head># Diminuzioni </md-table-head>
        <md-table-head># Prezzi Uguali</md-table-head>
        <md-table-head>% Fuori stock</md-table-head>
      </md-table-row>
      <md-table-row
        v-for="riga of listaRigheTabella"
        :key="riga.id"
        class="price-table"
      >
        <md-table-cell>{{ riga.NomeRiga }}</md-table-cell>
        <md-table-cell>{{ riga.NumerItems }}</md-table-cell>
        <md-table-cell>€ {{ riga.PrezzoMedioAttuale }}</md-table-cell>
        <md-table-cell>€ {{ riga.PrezzoMedioPeriodo }}</md-table-cell>
        <md-table-cell>€ {{ riga.PrezziGiu }}</md-table-cell>
        <md-table-cell>€ {{ riga.PrezziSu }}</md-table-cell>
        <md-table-cell>€ {{ riga.PrezziUguali }}</md-table-cell>
        <md-table-cell>% {{ riga.FuoriStock }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    listaRigheTabella: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/style/table.scss";
@import "src/assets/style/toolbar.scss";
</style>
