<template>
  <div>
    <md-table class="amz">
      <md-table-row>
        <md-table-head></md-table-head>
        <md-table-head>Retailer / Curva</md-table-head>
        <md-table-head>Articoli</md-table-head>
        <md-table-head>Media attuale</md-table-head>
        <md-table-head>Media storica </md-table-head>
        <md-table-head># Diminuzioni </md-table-head>
        <md-table-head># Aumenti </md-table-head>
        <md-table-head># Prezzi Uguali</md-table-head>
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
        <md-table-cell
          ><span v-if="riga.PrezzoMedioAttuale != null">{{
            Math.abs(riga.PrezzoMedioAttuale).toString().slice(0, 4)
          }}</span>
          <span v-else class="unavailable"><md-icon>remove</md-icon></span>
          €</md-table-cell
        >
        <md-table-cell
          ><span v-if="riga.PrezzoMedioPeriodo != null">{{
            Math.abs(riga.PrezzoMedioPeriodo).toString().slice(0, 4)
          }}</span>
          <span v-else class="unavailable"><md-icon>remove</md-icon></span>
          €</md-table-cell
        >
        <md-table-cell
          ><span v-if="riga.PrezziGiu != 0">{{ riga.PrezziGiu }} €</span
          ><span v-else class="unavailable"
            ><md-icon>remove</md-icon></span
          ></md-table-cell
        >
        <md-table-cell
          ><span v-if="riga.PrezziSu != 0">{{ riga.PrezziSu }} €</span
          ><span v-else class="unavailable"
            ><md-icon>remove</md-icon></span
          ></md-table-cell
        >
        <md-table-cell
          ><span v-if="riga.PrezziUguali != 0">{{ riga.PrezziUguali }} </span
          ><span v-else class="unavailable"
            ><md-icon>remove</md-icon></span
          ></md-table-cell
        >
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
