<template>
  <div>
    <md-dialog
      :md-active.sync="graph"
      @md-clicked-outside="toggleAmzGraph"
      class="graph md-scrollbar"
    >
      <Header />
      <md-divider></md-divider>
      <div class="md-layout md-gutter">
        <Thumbnail />
        <bar-chart
          :chartdata="chartdata"
          :options="options"
          style="width: 800px; margin: auto;"
        ></bar-chart>
      </div>

      <TableGraph />
    </md-dialog>
  </div>
</template>

<script>
import BarChart from "./LineChart.js";
import Thumbnail from "@/components/AMZGraph/Thumbnail.vue";
import Header from "@/components/AMZGraph/Header.vue";
import TableGraph from "@/components/AMZGraph/TableGraph.vue";
import { mapGetters } from "vuex";
export default {
  name: "AmzGraph",
  props: {
    graphParams: {
      type: Object,
      required: true,
    },
  },
  components: { BarChart, Thumbnail, Header, TableGraph },
  data: () => ({
    loaded: false,
  }),
  methods: {
    toggleAmzGraph() {
      this.$store.commit("toggle_amz_graph");
    },
  },

  computed: {
    ...mapGetters({
      amzGraphVisible: "amzGraphVisible",
      chartdata: "chartdata",
      options: "options",
      currentItem: "currentItem",
      value: "value",
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
        },
      },
      options: {
        get() {
          return this.options;
        },
        set(newValue) {
          return newValue;
        },
      },
      currentItem: {
        get() {
          return this.currentItem.UrlImmagine;
        },
        set(newValue) {
          return newValue;
        },
      },
    },
  },
};
</script>

<style lang="scss">
@import "src/assets/style/toolbar.scss";
@import "src/assets/style/amzgraph.scss";
</style>
