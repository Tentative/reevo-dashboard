<template>
  <div>
    <md-table class="amz">
      <md-table-row>
        <md-table-head class="price-head">Retailer / Curva</md-table-head>
        <md-table-head>Articoli</md-table-head>
        <md-table-head>Media attuale</md-table-head>
        <md-table-head>Media storica </md-table-head>
        <md-table-head># Diminuzioni </md-table-head>
        <md-table-head># Aumenti </md-table-head>
        <md-table-head># Prezzi Uguali</md-table-head>
        <md-table-head>% Fuori stock</md-table-head>
      </md-table-row>
      <md-table-row
        v-for="riga of listaRigheTabella"
        :key="riga.id"
        class="price-table"
      >
        <md-table-cell class="price-head">{{ riga.NomeRiga }}</md-table-cell>
        <md-table-cell
          ><span v-if="riga.NumeroItems != 0">{{ riga.NumeroItems }}</span
          ><span v-else class="unavailable"
            ><md-icon>remove</md-icon></span
          ></md-table-cell
        >
        <md-table-cell
          ><span v-if="riga.PrezzoMedioAttuale != null">{{
            riga.PrezzoMedioAttuale
          }}</span>
          <span v-else class="unavailable"><md-icon>remove</md-icon></span>
          €</md-table-cell
        >
        <md-table-cell
          ><span v-if="riga.PrezzoMedioPeriodo != null">{{
            riga.PrezzoMedioPeriodo
          }}</span>
          <span v-else class="unavailable"><md-icon>remove</md-icon></span>
          €</md-table-cell
        >
        <md-table-cell
          ><span v-if="riga.PrezziGiu != 0">{{ riga.PrezziGiu }}</span
          ><span v-else class="unavailable"
            ><md-icon>remove</md-icon></span
          ></md-table-cell
        >
        <md-table-cell
          ><span v-if="riga.PrezziSu != 0">{{ riga.PrezziSu }} </span
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
            >{{ riga.FuoriStock + "&nbsp;" }} </span
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
