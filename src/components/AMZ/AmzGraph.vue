<template>
  <div>
    <md-dialog @md-opened="porcoddio" :md-active.sync="graph">
      <div class="md-layout ">
        <div class="md-layout-item md-size-15 thumb-md">
          <img src="" />mannaggia il cristo
        </div>
        <bar-chart :chartdata="chartdata" style="width:400px"></bar-chart>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="toggleAmzGraph">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import BarChart from "./LineChart.js";
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "AmzGraph",
  props: {
    graphParams: {
      type: Object,
      required: true
    }
  },
  components: { BarChart },
  data: () => ({
    loaded: false
  }),
  methods: {
    toggleAmzGraph() {
      this.$store.commit("toggle_amz_graph");
    },
    porcamadonna() {
      this.chartdata = {};
    },
    async porcoddio() {
      console.log("è iniziato il porcodiddio");
      this.loaded = false;
      let amzgraph_request = {
        CodiceClient: "reevolacerba2020",
        CodiceRichiesta: "AMZGraph",
        VersioneClient: "1.0.3",
        Url: window.location.href,
        JsonRichiesta: JSON.stringify(this.graphParams)
      };
      try {
        await axios({
          url: "/",
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          params: JSON.stringify(amzgraph_request)
        }).then(res => {
          console.log("porcamadonna" + "" + res);
          let lista_prezzi = JSON.parse(res.data.JsonRisposta);
          console.log(lista_prezzi);
          let lista_giorni = lista_prezzi.ListaPrezzi;
          let data_prezzi = [];
          for (const data in lista_giorni) {
            data_prezzi.push(lista_giorni[data].DataPrezzo);
          }
          this.chartdata.labels = data_prezzi;
        });
        this.loaded = true;
      } catch (e) {
        console.error(e);
      }
    },
    fillData() {
      this.datacollection = {
        labels: [],
        datasets: [
          {
            label: "Price",
            backgroundColor: "transparent",
            data: [1, 2, 3, 4, 5, 3, 2, 2, 1]
          },
          {
            label: "Sales Ranks",
            backgroundColor: "transparent",
            data: []
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  },

  computed: {
    ...mapGetters({
      amzGraphVisible: "amzGraphVisible",
      dataPrezzo: "dataPrezzo",
      chartdata: "chartdata"
    }),
    graph: {
      get() {
        return this.amzGraphVisible;
      },
      set(newValue) {
        return newValue;
      },
      chartdata: {
        get() {
          return this.chartdata;
        },
        set(newValue) {
          return newValue;
        }
      }
    },
    currentItem() {
      return this.$store.getters.currentItem;
    },
    graphRes() {
      return this.$store.getters.graphRes;
    },
    minMax() {
      return this.$store.getters.minMax;
    },
    days() {
      return this.$store.getters.days;
    },
    dataPrezzo() {
      return this.$store.getters.dataPrezzo;
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/style/toolbar.scss";
</style>
