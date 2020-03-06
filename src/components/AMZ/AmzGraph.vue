<template>
  <div>
    <md-dialog :md-active.sync="graph">
      <div class="md-layout ">
        <div class="md-layout-item md-size-15 thumb-md">
          <img src="" />
        </div>
        <line-chart
          steppedLine="true"
          :chart-data="datacollection"
          :dataPrezzo="dataPrezzo"
        ></line-chart>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="toggleAmzGraph">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import LineChart from "./LineChart.js";
import { mapGetters } from "vuex";
export default {
  name: "AmzGraph",
  props: {},
  components: { LineChart },
  data: () => ({
    datacollection: null
  }),
  created() {
    return {
      dataPrezzo() {
        this.$store.getters.dataPrezzo;
      }
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    toggleAmzGraph() {
      this.$store.commit("toggle_amz_graph");
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
      dataPrezzo: "dataPrezzo"
    }),
    graph: {
      get() {
        return this.amzGraphVisible;
      },
      set(newValue) {
        return newValue;
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
