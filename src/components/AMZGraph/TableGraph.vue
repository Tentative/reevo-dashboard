<template>
  <div class="md-layout md-gutter tablegraph">
    <div class="md-layout-item">
      <md-table class="graph">
        <md-table-row>
          <md-table-cell><span>Prezzo attuale</span></md-table-cell>
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
            ><span class="highest-price">Prezzo massimo</span></md-table-cell
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
            ><span class="lowest-price">Prezzo minimo</span></md-table-cell
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
            ><span class="average-price">Media prezzo</span></md-table-cell
          >
          <md-table-cell
            ><span class="average-price"
              >{{ currentItem.PrezzoMedio }} €</span
            ></md-table-cell
          >
          <md-table-cell><span>-</span></md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <div class="md-layout-item">
      <md-table class="graph">
        <md-table-row
          ><md-table-cell>EAN</md-table-cell
          ><md-table-cell>{{ currentItem.EAN }}</md-table-cell></md-table-row
        >
        <md-table-row
          ><md-table-cell>Prezzo di listino</md-table-cell
          ><md-table-cell
            >{{ currentItem.Prezzo }} €</md-table-cell
          ></md-table-row
        >

        <md-table-row
          ><md-table-cell>Sales Rank</md-table-cell
          ><md-table-cell>{{
            currentItem.SalesRank
          }}</md-table-cell></md-table-row
        >
        <md-table-row
          ><md-table-cell>Ultimo scan</md-table-cell
          ><md-table-cell>{{ dataLast }}</md-table-cell></md-table-row
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
      currentItem: "graph_data",
    }),
    // prezzoMedio() {
    //   return this.currentItem.PrezzoMedio.toFixed(2);
    // },
    dataMin() {
      moment.locale("it");
      let datamin = moment(this.currentItem.DataPrezzoMin).format("DD MMMM");
      // datamin = Date.parse(datamin);
      // let temp = new Date(datamin);
      // let day = temp.getDate();
      // var month = moment().startOf("month").format("MMMM");
      // let dataPrezzoMin =
      //   day + " " + month.charAt(0).toUpperCase() + month.slice(1);
      // dataPrezzoMin.toString().slice(4, 10);

      return datamin;
    },
    dataMax() {
      moment.locale("it");
      let datamax = moment(this.currentItem.DataPrezzoMax).format("DD MMMM");
      // datamax = Date.parse(datamax);
      // let temp = new Date(datamax);
      // let day = temp.getDate();
      // var month = moment().startOf("month").format("MMMM");
      // let dataPrezzoMax =
      //   day + " " + month.charAt(0).toUpperCase() + month.slice(1);
      // dataPrezzoMax.toString().slice(4, 10);

      return datamax;
    },
    dataLast() {
      moment.locale("it");
      let datalast = moment(this.currentItem.UltimaData).format("DD MMMM");
      // datalast = Date.parse(datalast);
      // let temp = new Date(datalast);
      // let day = temp.getDate();
      // var month = moment().startOf("month").format("MMMM");
      // let dataPrezzoLast =
      //   day + " " + month.charAt(0).toUpperCase() + month.slice(1);
      // dataPrezzoLast.toString().slice(4, 10);

      return datalast;
    },
  },
};
</script>

<style lang="scss">
@import "src/assets/style/tablegraph.scss";
</style>

f8f8f8
