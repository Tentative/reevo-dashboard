<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <md-table>
          <md-table-row>
            <md-table-head></md-table-head>
            <md-table-head>Articolo</md-table-head>
            <md-table-head>Prezzo</md-table-head>
            <md-table-head>Sconto</md-table-head>
            <md-table-head>Retailer</md-table-head>
            <md-table-head>SR</md-table-head>
          </md-table-row>
          <md-table-row
            v-for="item of maindata.maindata.ListaItemsAlert"
            :key="item.id"
          >
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
      <div class="md-layout-item">
        <md-table>
          <md-table-row>
            <md-table-head></md-table-head>
            <md-table-head class="name">Articolo</md-table-head>
            <md-table-head>InStock</md-table-head>
            <md-table-head>Retailer</md-table-head>
            <md-table-head>SR</md-table-head>
          </md-table-row>
          <md-table-row
            v-for="item of maindata.maindata.ListaItemsInStock"
            :key="item.id"
          >
            <md-table-cell class="thumb">
              <img :src="item.UrlImmagine"
            /></md-table-cell>
            <md-table-cell class="name">{{ item.NomeItem }}</md-table-cell>
            <md-table-cell
              ><span v-if="item.InStock != null">{{ item.InStock }}</span
              ><span v-else></span
            ></md-table-cell>
            <md-table-cell>{{ item.Retailer }}</md-table-cell>
            <md-table-cell>{{ item.SalesRank }}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tables",
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
