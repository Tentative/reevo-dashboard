<template>
  <div class="md-layout md-gutter tablegraph">
    <div class="md-layout-item md-size-50 first-table">
      <md-table>
        <md-table-row>
          <md-table-cell><span>Current</span></md-table-cell>
          <md-table-cell
            ><span v-if="currentItem.InStock == 'No'">-</span
            ><span v-else>{{ currentItem.Prezzo }} €</span></md-table-cell
          >
          <md-table-cell
            ><span v-if="currentItem.InStock == 'No'">-</span
            ><span v-else>{{ dataLast }}</span></md-table-cell
          >
        </md-table-row>
        <md-table-row>
          <md-table-cell
            ><span class="highest-price">Highest Price </span></md-table-cell
          >
          <md-table-cell
            ><span class="highest-price"
              >{{ currentItem.PrezzoMax }} €</span
            ></md-table-cell
          >
          <md-table-cell
            ><span class="highest-price">{{ dataMax }} </span></md-table-cell
          >
        </md-table-row>
        <md-table-row>
          <md-table-cell
            ><span class="lowest-price">Lowest Price</span></md-table-cell
          >
          <md-table-cell
            ><span class="lowest-price"
              >{{ currentItem.PrezzoMin }} €</span
            ></md-table-cell
          >
          <md-table-cell
            ><span class="lowest-price">
              {{ dataMin }}
            </span></md-table-cell
          >
        </md-table-row>
        <md-table-row>
          <md-table-cell
            ><span class="average-price">Average</span></md-table-cell
          >
          <md-table-cell
            ><span class="average-price"
              >{{ prezzoMedio }} €</span
            ></md-table-cell
          >
          <md-table-cell><span>-</span></md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <div class="md-layout-item md-size-50 second-table">
      <md-table>
        <md-table-row
          ><md-table-cell>List price</md-table-cell
          ><md-table-cell
            >{{ currentItem.Prezzo }} €</md-table-cell
          ></md-table-row
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
import moment from "moment";
export default {
  name: "TableGraph",
  computed: {
    ...mapGetters({
      currentItem: "currentItem"
    }),
    prezzoMedio() {
      return this.currentItem.PrezzoMedio.toFixed(2);
    },
    dataMin() {
      let datamin = this.currentItem.DataPrezzoMin;
      datamin = Date.parse(datamin);
      let temp = new Date(datamin);
      let day = temp.getDate();
      var month = moment()
        .subtract(1, "month")
        .startOf("month")
        .format("MMMM");
      let dataPrezzoMin =
        day + " " + month.charAt(0).toUpperCase() + month.slice(1);
      dataPrezzoMin.toString().slice(4, 10);

      return dataPrezzoMin;
    },
    dataMax() {
      let datamax = this.currentItem.DataPrezzoMax;
      datamax = Date.parse(datamax);
      let temp = new Date(datamax);
      let day = temp.getDate();
      var month = moment()
        .subtract(1, "month")
        .startOf("month")
        .format("MMMM");
      let dataPrezzoMax =
        day + " " + month.charAt(0).toUpperCase() + month.slice(1);
      dataPrezzoMax.toString().slice(4, 10);

      return dataPrezzoMax;
    },
    dataLast() {
      let datalast = this.currentItem.UltimaData;
      datalast = Date.parse(datalast);
      let temp = new Date(datalast);
      let day = temp.getDate();
      var month = moment()
        .subtract(1, "month")
        .startOf("month")
        .format("MMMM");
      let dataPrezzoLast =
        day + " " + month.charAt(0).toUpperCase() + month.slice(1);
      dataPrezzoLast.toString().slice(4, 10);

      return dataPrezzoLast;
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/style/tablegraph.scss";
</style>

f8f8f8
