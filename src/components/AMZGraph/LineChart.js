import { Line, Bar } from "vue-chartjs";
import chartjsPluginAnnotation from "chartjs-plugin-annotation";

export default {
  extends: Line,
  Bar,
  chartjsPluginAnnotation,
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  computed: {},
  async mounted() {
    this.renderChart(this.chartdata, this.options);
    // this.updateChart();
  },
  destroyed() {
    this.$store.commit("clear_chart");
  },
};
