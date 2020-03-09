import axios from "axios";
export default {
  state: {
    amzGraphVisible: false,
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
          data: [],
          order: 1,
          yAxisID: "prices"
        },
        {
          label: "Sales Rank",
          backgroundColor: "transparent",
          data: [],
          order: 2,
          yAxisID: "ranks"
        },
        {
          label: "Out of stock",
          backgroundColor: "red",
          data: [],
          type: "bar",
          order: 3,
          yAxisID: "stock"
        }
      ]
    },
    options: {
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
              display: false
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
        ]
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
      { labels, sales_rank, prezzo_giorno, in_stock_giorno }
    ) {
      state.chartdata.labels = labels;
      state.chartdata.datasets[0].data = prezzo_giorno;
      state.chartdata.datasets[1].data = sales_rank;
      state.chartdata.datasets[2].data = in_stock_giorno;
    },
    clear_chart(state) {
      state.chartdata = {
        labels: [],
        datasets: [
          {
            label: "Prices",
            backgroundColor: "transparent",
            data: [],
            order: 1,
            yAxisID: "prices"
          },
          {
            label: "Sales Rank",
            backgroundColor: "transparent",
            data: [],
            order: 2,
            yAxisID: "ranks"
          },
          {
            label: "Out of stock",
            backgroundColor: "red",
            data: [],
            type: "bar",
            order: 3
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
            const response = JSON.parse(res.data.JsonRisposta);
            console.log(response);
            const total_days = response.ListaPrezzi;
            let labels = [];
            for (const day in total_days) {
              labels.push(total_days[day].DataPrezzo);
            }
            let sales_rank = [];
            let prezzo_giorno = [];
            let in_stock_giorno = [];
            for (const data in total_days) {
              prezzo_giorno.push(total_days[data].PrezzoGiorno);
            }
            for (const data in total_days) {
              sales_rank.push(total_days[data].SalesRankGiorno / 100);
            }

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
              prezzo_giorno,
              in_stock_giorno
            });

            resolve(res);
            commit("toggle_amz_graph");
            console.log("ha finit?");
          })

          .catch(err => {
            reject(err);
            console.log(err);
          });
      });
    }
  },
  getters: {}
};
