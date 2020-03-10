<template>
  <div class="md-layout md-gutter tablegraph">
    <div class="md-layout-item md-size-50 first-table">
      <md-table>
        <md-table-row>
          <md-table-head>Type</md-table-head>
          <md-table-head>Price</md-table-head>
          <md-table-head>Date</md-table-head>
        </md-table-row>
        <md-table-row>
          <md-table-cell><span>Current</span></md-table-cell>
          <md-table-cell
            ><span v-if="currentItem.InStock == 'No'">-</span
            ><span v-else>{{ currentItem.Prezzo }}</span></md-table-cell
          >
          <md-table-cell
            ><span v-if="currentItem.InStock == 'No'">-</span
            ><span v-else>{{ currentItem.UltimaData }}</span></md-table-cell
          >
        </md-table-row>
        <md-table-row>
          <md-table-cell
            ><span class="highest-price">Highest Price</span></md-table-cell
          >
          <md-table-cell
            ><span class="highest-price">{{
              currentItem.PrezzoMax
            }}</span></md-table-cell
          >
          <md-table-cell
            ><span class="highest-price">{{
              currentItem.DataPrezzoMax
            }}</span></md-table-cell
          >
        </md-table-row>
        <md-table-row>
          <md-table-cell
            ><span class="lowest-price">Lowest Price</span></md-table-cell
          >
          <md-table-cell
            ><span class="lowest-price">{{
              currentItem.PrezzoMin
            }}</span></md-table-cell
          >
          <md-table-cell
            ><span class="lowest-price">{{
              currentItem.DataPrezzoMin
            }}</span></md-table-cell
          >
        </md-table-row>
        <md-table-row>
          <md-table-cell
            ><span class="average-price">Average</span></md-table-cell
          >
          <md-table-cell
            ><span class="average-price">{{
              currentItem.PrezzoMedio
            }}</span></md-table-cell
          >
          <md-table-cell><span>-</span></md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <div class="md-layout-item md-size-50 second-table">
      <md-table>
        <md-table-row
          ><md-table-cell>List price</md-table-cell
          ><md-table-cell>{{ currentItem.Prezzo }}</md-table-cell></md-table-row
        >
        <md-table-row
          ><md-table-cell>EAN</md-table-cell
          ><md-table-cell>{{ currentItem.EAN }}</md-table-cell></md-table-row
        >
        <md-table-row
          ><md-table-cell>UPC</md-table-cell
          ><md-table-cell
            ><span v-if="!!currentItem.UPC">{{ currentItem.UPC }}</span
            ><span v-else>-</span></md-table-cell
          ></md-table-row
        >
        <md-table-row
          ><md-table-cell>SKU</md-table-cell
          ><md-table-cell
            ><span v-if="!!currentItem.SKU">{{ currentItem.SKU }}</span
            ><span v-else>-</span></md-table-cell
          ></md-table-row
        >
        <md-table-row
          ><md-table-cell>Sales Rank</md-table-cell
          ><md-table-cell>{{
            currentItem.SalesRank
          }}</md-table-cell></md-table-row
        >
        <md-table-row
          ><md-table-cell>Last update scan</md-table-cell
          ><md-table-cell>{{
            currentItem.UltimaData
          }}</md-table-cell></md-table-row
        >
      </md-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TableGraph",
  computed: {
    ...mapGetters({
      currentItem: "currentItem"
    })
  }
};
</script>

<style lang="scss">
@import "src/assets/style/tablegraph.scss";
</style>

f8f8f8
