<template>
  <div class="md-layout md-gutter tablegraph">
    <div class="md-layout-item md-size-50">
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
