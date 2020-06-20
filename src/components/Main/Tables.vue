<template>
  <div>
    <div class="md-layout md-gutter" style="margin-bottom: 10%;">
      <div class="md-layout-item">
        <div class="alert-wrapper">
          <div class="md-subheading">Principali Alert di Prezzo</div>
        </div>
        <md-table>
          <md-table-row>
            <md-table-head></md-table-head>
            <md-table-head class="name">Articolo</md-table-head>
            <md-table-head>Prezzo</md-table-head>
            <md-table-head>Delta</md-table-head>
            <md-table-head>Retailer</md-table-head>
            <md-table-head>SR</md-table-head>
          </md-table-row>
          <md-table-row
            v-for="item of maindata.maindata.ListaItemsAlert"
            :key="item.id"
            class="main-row"
          >
            <md-table-cell class="thumb">
              <span><img :src="item.UrlImmagine" /></span>
            </md-table-cell>
            <md-table-cell class="item">
              {{ item.NomeItem }}
            </md-table-cell>
            <md-table-cell style="white-space: nowrap;">
              <span v-if="item.Prezzo != null">{{
                item.Prezzo + "&nbsp;€ "
              }}</span>
              <span v-else class="unavailable"
                ><i class="md-icon md-icon-font md-theme-default"
                  >remove</i
                ></span
              >
            </md-table-cell>
            <md-table-cell style="white-space: nowrap;">
              <span v-if="item.Sconto != null">{{
                item.Sconto + "&nbsp; "
              }}</span>
              <span v-else class="unavailable"
                ><i class="md-icon md-icon-font md-theme-default"
                  >remove</i
                ></span
              >
            </md-table-cell>
            <md-table-cell> {{ item.Retailer }} </md-table-cell>
            <md-table-cell> {{ item.SalesRank }} </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
      <div class="md-layout-item">
        <div class="alert-wrapper">
          <div class="md-subheading">Principali Alert Fuori Stock</div>
        </div>
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
            class="main-row"
          >
            <md-table-cell class="thumb">
              <img :src="item.UrlImmagine"
            /></md-table-cell>
            <md-table-cell class="item">{{ item.NomeItem }}</md-table-cell>
            <md-table-cell
              ><md-icon class="no-status">cancel</md-icon></md-table-cell
            >
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
