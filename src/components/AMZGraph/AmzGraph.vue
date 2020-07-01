<template>
  <div>
    <md-dialog
      :md-active.sync="loading"
      class="graph md-scrollbar loading"
      :md-backdrop="false"
    >
      <spinner />
    </md-dialog>
    <md-dialog
      id="dialog-amzgraph"
      :md-active.sync="graph"
      class="md-scrollbar"
      @md-clicked-outside="toggleAmzGraph"
    >
      <Header />
      <md-divider></md-divider>
      <div class="md-layout">
        <Thumbnail />
        <div class="md-layout-item md-size-70 screen-container">
          <BarChart
            id="chart"
            :chartdata.sync="graphdata"
            :options.sync="graphoptions"
            style="width: 100%;"
          ></BarChart>
        </div>
      </div>

      <TableGraph />
    </md-dialog>
  </div>
</template>

<script>
import BarChart from "./LineChart.js";
import Thumbnail from "@/components/AMZGraph/Thumbnail.vue";
import Header from "@/components/AMZGraph/Header.vue";
import spinner from "@/components/AMZGraph/spinner.vue";
import TableGraph from "@/components/AMZGraph/TableGraph.vue";
import { mapGetters } from "vuex";
export default {
  name: "AmzGraph",
  components: { BarChart, spinner, Thumbnail, Header, TableGraph },
  props: {
    graphParams: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    loaded: false,
    loading: false,
    chartdata: null,
  }),
  // created() {
  //   this.amz_call();
  // },
  computed: {
    ...mapGetters({
      amzGraphVisible: "amzGraphVisible",
      // chartdata: "chartdata",
      graphdata: "graphdata",
      graphoptions: "graphoptions",
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
      graphdata: {
        get() {
          return this.$store.getters.graphdata;
        },
        set(newValue) {
          return newValue;
        },
      },
      options: {
        get() {
          return this.$store.getters.graphoptions;
        },
        set(newValue) {
          return newValue;
        },
      },
      // currentItem: {
      //   get() {
      //     return this.currentItem.UrlImmagine;
      //   },
      //   set(newValue) {
      //     return newValue;
      //   },
      // },
    },
  },

  methods: {
    toggleAmzGraph() {
      this.$store.commit("toggle_amz_graph");
    },
    // async toggleAmzGraph() {
    //   this.loading = true;
    //   this.loaded = false;

    //   try {
    //     const { res } = await this.$store.dispatch(
    //       "amz_graph",
    //       this.currentItem
    //     );
    //     this.chartdata = res;
    //     this.loaded = true;
    //     this.loading = false;
    //   } catch (e) {
    //     this.loading = false;
    //     console.log(e);
    //   }
    // },

    amz_call() {
      this.loaded = false;
      try {
        const { res } = this.$store.dispatch("amz_graph", this.currentItem);
        this.chartdata = res;
        this.loaded = true;
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style lang="scss">
@import "src/assets/style/toolbar.scss";
@import "src/assets/style/amzgraph.scss";
</style>
