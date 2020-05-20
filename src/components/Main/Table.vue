<template>
  <div>
    <md-table class="amz">
      <md-table-row>
        <md-table-head></md-table-head>
        <md-table-head>Retailer </md-table-head>
        <md-table-head>Articoli</md-table-head>
        <md-table-head>Non Presenti</md-table-head>
        <md-table-head>Non Acquistabili </md-table-head>
        <md-table-head>Prezzo Medio</md-table-head>
        <md-table-head># Dinuzioni </md-table-head>
        <md-table-head># Aumenti</md-table-head>
        <md-table-head>% Fuori stock</md-table-head>
      </md-table-row>
      <md-table-row
        v-for="riga of maindata.maindata.ListaRigheTabella"
        :key="riga.id"
        class="price-table"
      >
        <md-table-cell class="thumb"
          ><img :src="riga.UrlLogoRetailer"
        /></md-table-cell>
        <md-table-cell>{{ riga.NomeRiga }}</md-table-cell>
        <md-table-cell
          ><span v-if="riga.NumeroItems != 0">{{ riga.NumeroItems }}</span
          ><span v-else class="unavailable"
            ><md-icon>remove</md-icon></span
          ></md-table-cell
        >
        <md-table-cell>{{ riga.NonPresenti }}</md-table-cell>
        <md-table-cell>{{ riga.NonAcquistabili }}</md-table-cell>
        <md-table-cell>{{ riga.PrezzoMedioAttuale }}</md-table-cell>
        <md-table-cell>{{ riga.PrezziGiu }}</md-table-cell>
        <md-table-cell>{{ riga.PrezziSu }}</md-table-cell>
        <md-table-cell
          ><span v-if="riga.FuoriStock != null"
            >{{ Math.abs(riga.FuoriStock).toString().slice(0, 2) }} % </span
          ><span v-else class="unavailable"
            ><md-icon>remove</md-icon></span
          ></md-table-cell
        >
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    maindata: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/style/table.scss";
@import "src/assets/style/toolbar.scss";
</style>
