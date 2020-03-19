import { Line, Bar } from "vue-chartjs";

export default {
  extends: Line,
  Bar,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  computed: {},
  mounted() {
    this.renderChart(this.chartdata, this.options);
    // this.updateChart();
  },
  destroyed() {
    this.$store.commit("clear_chart");
  }
};
