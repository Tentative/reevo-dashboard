<script>
// Importing Line class from the vue-chartjs wrapper
import { Line, Bar, Scatter } from "vue-chartjs";
// Exporting this so it can be used in other components
export default {
  extends: Line,
  Bar,
  Scatter,
  props: {
    currentItem: {
      type: Object,
      required: true
    }
  },
  created() {
    let graph_params = {
      EAN: this.currentItem.EAN,
      FiltroGiorni: "30"
    };
    this.$store.dispatch("amz_graph", graph_params).then(res => {
      this.amz_res = res;
    });
  },
  data() {
    return {
      amz_res: {},
      datacollection: {
        // Data to be represented on x-axis
        labels: ["Price A", "Price B"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "transparent",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "#249EBF",
            // Data to be represented on y-axis
            data: [Math.floor(Math.random() * 9) + 1, 2, 3, 4, 5, 6, 7]
          },
          {
            label: "Data Two",
            backgroundColor: "transparent",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "#249EBF",
            // Data to be represented on y-axis
            data: [Math.floor(Math.random() * 9) + 1, 1, 3, 4]
          },
          {
            label: "Data Three",
            backgroundColor: "rgba(227, 64, 9, 0.3)",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "#249EBF",
            // Data to be represented on y-axis
            data: [Math.floor(Math.random() * 9) + 1, 1, 3, 4],
            type: "bar"
          }
        ]
      },
      // Chart.js options that controls the appearance of the chart
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: true
              }
            }
          ]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted() {
    // renderChart function renders the chart with the datacollection and options object.
    this.renderChart(this.datacollection, this.options);
  }
};
</script>
