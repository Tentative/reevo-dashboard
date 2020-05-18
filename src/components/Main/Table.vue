<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item md-size-50">
        <md-table>
          <md-table-row>
            <md-table-head></md-table-head>
            <md-table-head>Articolo</md-table-head>
            <md-table-head>Prezzo</md-table-head>
            <md-table-head>Sconto</md-table-head>
            <md-table-head>Retailer</md-table-head>
            <md-table-head>SR</md-table-head>
          </md-table-row>
          <md-table-row v-for="item of maindata.ListaItemsAlert" :key="item.id">
            <md-table-cell class="thumb">
              <span><img :src="item.UrlImmagine" /></span>
            </md-table-cell>
            <md-table-cell>
              {{ item.NomeItem }}
            </md-table-cell>
            <md-table-cell>
              {{ item.Prezzo }}
            </md-table-cell>
            <md-table-cell> {{ item.Sconto }} % </md-table-cell>
            <md-table-cell> {{ item.Retailer }} </md-table-cell>
            <md-table-cell> {{ item.SalesRank }} </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
      <div class="md-layout-item md-size-50">
        <md-table>
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
import { mapGetters } from "vuex";
export default {
  name: "Tabe",
  components: "spinner",
  computed: {
    ...mapGetters({
      maindata: "maindata",
    }),
  },
};
</script>

<style lang="scss">
@import "@/assets/style/main.scss";
</style>
