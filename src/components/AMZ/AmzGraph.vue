<template>
  <div>
    <md-dialog :md-active.sync="graph">
      <div class="md-layout ">
        <div class="md-layout-item md-size-15 thumb-md">
          <Thumbnail />
        </div>
        <bar-chart
          :chartdata="chartdata"
          :options="options"
          style="width:400px"
        ></bar-chart>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="toggleAmzGraph">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import BarChart from "./LineChart.js";
import Thumbnail from "@/components/AMZ/Thumbnail.vue";
import { mapGetters } from "vuex";
export default {
  name: "AmzGraph",
  props: {
    graphParams: {
      type: Object,
      required: true
    }
  },
  components: { BarChart, Thumbnail },
  data: () => ({
    loaded: false
  }),
  methods: {
    toggleAmzGraph() {
      this.$store.commit("toggle_amz_graph");
    }
  },

  computed: {
    ...mapGetters({
      amzGraphVisible: "amzGraphVisible",
      chartdata: "chartdata",
      options: "options",
      currentItem: "currentItem"
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
      },
      options: {
        get() {
          return this.options;
        },
        set(newValue) {
          return newValue;
        }
      },
      currentItem: {
        get() {
          return this.currentItem.UrlImmagine;
        },
        set(newValue) {
          return newValue;
        }
      }
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/style/toolbar.scss";
</style>
