import axios from "axios";
import moment from "moment";
export default {
  state: {
    months: ["Gen", "Feb", "Mar", "Apr"],
    amzGraphVisible: false,
    currentDate: new Date(),
    graph_params: {},
    graph_res: {},
    graph_days: [],
    currentItem: {},
    chartdata: {
      labels: [],
      datasets: [
        {
          label: "Prices",
          backgroundColor: "transparent",
          borderColor: "#409EFF",
          borderWidth: 3,
          data: [],
          type: "line",
          lineTension: 0,
          order: 1,
          yAxisID: "prices",
          steppedLine: "before",
          showLine: true,
          spanGaps: true
        },
        {
          label: "Sales Rank",
          backgroundColor: "transparent",
          borderColor: "red",
          borderWidth: 0.5,
          data: [],
          order: 2,
          yAxisID: "ranks",
          type: "line",
          lineTension: 0,
          steppedLine: "before"
        },
        {
          label: "Out of stock",
          backgroundColor: "#ffb8ab",
          borderColor: "red",
          data: [],
          type: "bar",
          order: 3,
          yAxisID: "stock"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      showLines: true,
      scales: {
        yAxes: [
          {
            id: "prices",
            type: "linear",
            position: "left",
            gridLines: {
              display: false
            },
            ticks: {
              display: true
            }
          },
          {
            id: "ranks",
            type: "linear",
            position: "right",
            gridLines: {
              display: false
            },
            ticks: {
              display: false
            }
          },
          {
            id: "stock",
            type: "linear",
            gridLines: {
              display: false
            },
            ticks: {
              display: false
            }
          }
        ],
        xAxes: [
          {
            type: "time",
            ticks: {
              min: "",
              max: ""
              // source: "data"
            },
            distribution: "linear",
            time: {
              displayFormats: {
                day: "D MMM"
              },
              stepSize: 1,
              unit: "day"
            },
            gridLines: {
              display: true
            }
          }
        ]
      },
      tooltips: {
        mode: "index",
        callbacks: {
          title: tooltipItems => {
            return "Variazione del " + tooltipItems[0].xLabel;
          },

          label: tooltipItems => {
            return tooltipItems.yLabel + " €";
          }
        }
      }
    },
    days: [],
    min_max: [],
    amzgraph_request: {
      CodiceClient: "reevolacerba2020",
      CodiceRichiesta: "AMZGraph",
      VersioneClient: "1.0.3",
      Url: window.location.href
      //define JsonRichiesta from mutations;
    }
  },

  mutations: {
    toggle_amz_graph(state) {
      state.amzGraphVisible = !state.amzGraphVisible;
    },
    get_current_item(state, { item }) {
      state.currentItem.UrlImmagine = item.UrlImmagine;
      state.graph_params.EAN = item.EAN;
      state.graph_params.FiltroGiorni = "30";
    },
    graph_request(state) {
      state.amzgraph_request.JsonRichiesta = JSON.stringify(state.graph_params);
    },
    graph_success(
      state,
      {
        labels,
        sales_rank,
        // prezzo_giorno,
        stocazzo,
        in_stock_giorno,
        current_item
        // fullMin
        // fullMax
        // min,
        // maxx
      }
    ) {
      state.chartdata.labels = labels;
      state.chartdata.datasets[0].data = stocazzo;
      state.chartdata.datasets[1].data = sales_rank;
      state.chartdata.datasets[2].data = in_stock_giorno;
      state.currentItem = current_item;
      // state.options.scales.xAxes[0].ticks.min = state.currentDate.setDate(
      //   state.currentDate.getDate() - 30
      // );

      // state.options.scales.xAxes[0].ticks.max = maxx;
      // state.options.scales.xAxes[0].ticks.min = min;
    },
    clear_chart(state) {
      state.chartdata = {
        labels: [],
        datasets: [
          {
            label: "Prices",
            backgroundColor: "transparent",
            borderColor: "#409EFF",
            borderWidth: 3,
            data: [],
            type: "line",
            lineTension: 0,
            order: 1,
            yAxisID: "prices",
            steppedLine: "before"
          },
          {
            label: "Sales Rank",
            backgroundColor: "transparent",
            borderColor: "red",
            borderWidth: 0.5,
            data: [],
            order: 2,
            yAxisID: "ranks",
            type: "line",
            lineTension: 0,
            steppedLine: "before"
          },
          {
            label: "Out of stock",
            backgroundColor: "#ffb8ab",
            borderColor: "red",
            data: [],
            type: "bar",
            order: 3,
            yAxisID: "stock"
          }
        ]
      };
    }
  },
  actions: {
    save_graph({ commit }, item) {
      commit("get_current_item", item);
      commit("toggle_amz_graph");
    },
    amz_graph({ commit, state }, item) {
      return new Promise((resolve, reject) => {
        commit("get_current_item", item);
        let graph_params = {
          EAN: state.currentItem.EAN,
          FiltroGiorni: "30"
        };
        commit("graph_request", graph_params);
        const richiesta = state.amzgraph_request;
        axios({
          url: "/",
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          params: JSON.stringify(richiesta)
        })
          .then(res => {
            let maxx = new Date();
            let min_temp = new Date().setDate(maxx.getDate() - 30);
            let min = new Date(min_temp);
            min.toISOString();
            const current_item = JSON.parse(res.data.JsonRisposta);
            const total_days = current_item.ListaPrezzi;
            total_days.reverse();
            let labels = [...new Array(30)].map((i, idx) =>
              moment()
                .startOf("day")
                .subtract(idx, "days")
            );
            labels.reverse();
            let stocazzo = [];
            let last_price = total_days[0].PrezzoGiorno;
            for (const datA in labels) {
              for (const datB in total_days) {
                let stringa = total_days[datB].DataPrezzo;
                stringa = Date.parse(stringa);
                let date = new Date(stringa);
                date.toISOString();
                let dataFinale = date.toString().slice(4, 15);
                let dataControllo = labels[datA].toString().slice(4, 15);
                console.log(dataControllo);
                console.log(dataFinale);
                if (dataControllo == dataFinale) {
                  last_price = total_days[datB].PrezzoGiorno;
                }
              }
              stocazzo.push(last_price);
            }

            let sales_rank = [];
            let prezzo_giorno = [];
            let in_stock_giorno = [];
            for (const data in total_days) {
              sales_rank.push(total_days[data].SalesRankGiorno);
            }
            sales_rank.reverse();

            let max_price = Math.max.apply(null, prezzo_giorno);
            let max_rank = Math.max.apply(null, sales_rank);
            let max = Math.max(max_price, max_rank);
            for (const data in total_days) {
              if (total_days[data].InStockGiorno == "No") {
                in_stock_giorno.push(max);
              }
              in_stock_giorno.push("");
            }

            commit("graph_success", {
              labels,
              sales_rank,
              // prezzo_giorno,
              stocazzo,
              in_stock_giorno,
              current_item
              // min,
              // maxx
            });

            resolve(res);
            commit("toggle_amz_graph");
            // console.log("ha finit?");
          })

          .catch(err => {
            reject(err);
            // console.log(err);
          });
      });
    }
  },
  getters: {}
};
