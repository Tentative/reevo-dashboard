<script>
// Importing Line class from the vue-chartjs wrapper
import { Line, Bar, Scatter } from "vue-chartjs";
import { mapGetters } from "vuex";
// Exporting this so it can be used in other components
export default {
  name: "Chart",
  extends: Line,
  Bar,
  Scatter,
  props: {
    currentItem: {
      type: Object,
      required: true
    },
    graphRes: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      graph_data: "graph_data",
      graph_days: "graph_days"
    })
  },
  created() {
    this.$store.dispatch("amz_graph").then(res => {
      let amz_res = JSON.parse(res.data.JsonRisposta);
      let ListaPrezzi = amz_res.ListaPrezzi;
      // eslint-disable-next-line no-unused-vars
      for (const [day, index] in ListaPrezzi) {
        console.log(ListaPrezzi[day].PrezzoGiorno);
        this.datacollection.datasets[0].data.push(
          ListaPrezzi[day].PrezzoGiorno
        );
        this.datacollection.datasets[1].data.push(day + 1);
      }
      this.datacollection.datasets[1].data.push(parseFloat(amz_res.PrezzoMin));
      this.datacollection.datasets[1].data.push(amz_res.PrezzoMax);
      this.datacollection.datasets[1].data.push(amz_res.PrezzoMin);
      this.datacollection.datasets[1].data.push(amz_res.PrezzoMax);
    });
  },
  data() {
    return {
      datacollection: {
        // Data to be represented on x-axis
        labels: ["Price", "S.Rank"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "transparent",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "#249EBF",
            // Data to be represented on y-axis
            data: [this.graphRes.PrezzoMin, this.graphRes.PrezzoMax],
            type: "line"
          },
          {
            label: "Data Two",
            backgroundColor: "transparent",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "#249EBF",
            // Data to be represented on y-axis
            data: []
          },
          {
            label: "Data Three",
            backgroundColor: "rgba(227, 64, 9, 0.3)",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "#249EBF",
            // Data to be represented on y-axis
            data: [],
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
