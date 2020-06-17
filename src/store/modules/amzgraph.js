import axios from "axios";
import global from "@/store/modules/global.js";
import moment from "moment";
export default {
  state: {
    amzGraphVisible: false,
    graph_params: {},
    graph_res: {},
    graph_days: [],
    currentItem: {},
    graph_data: {},
    amzgraph_request: {
      CodiceClient: "reevolacerba2020",
      CodiceRichiesta: "AMZGraph",
      VersioneClient: global.state.VersioneClient,
      Url: window.location.href,
      //define JsonRichiesta from mutations;
    },

    chartdata: {
      labels: [],
      datasets: [],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
        labels: {
          useLineStyle: true,
        },
        position: "bottom",
      },
      scales: {
        yAxes: [],
        xAxes: [
          {
            offset: false,
            bounds: "data",
            // distribution: "linear",
            type: "time",
            autoSkip: false,
            time: {
              displayFormat: {
                day: "D MMM",
              },
              unit: "day",
              unitStepSize: 3,
              // stepSize: 3,
            },
            ticks: {
              source: "data",
              padding: 15,
              autoSkip: false,
              maxRotation: 0,
              callback: function (item, index) {
                if (!(index % 3)) return item;
              },
            },
            gridLines: {
              drawTicks: false,
              drawBorder: true,
            },
          },
        ],
      },
    },
    prcdata: {},
    retailers: {},
    listaRigheTabella: {},
  },
  mutations: {
    toggle_amz_graph(state) {
      state.amzGraphVisible = !state.amzGraphVisible;
    },
    get_current_item(state, { item }) {
      state.currentItem.UrlImmagine = item.UrlImmagine;
      state.graph_params.EAN = item.EAN;
      state.graph_params.FiltroGiorni = "30";
      console.log(item);
    },
    graph_request(state) {
      state.amzgraph_request.JsonRichiesta = JSON.stringify(state.graph_params);
    },
    // graph_success(state) {
    //   state.status = "success";
    // },
    graph_success(state, prcdata, labels, pdata, graph_data, max, min) {
      // state.prcdata = prcdata;
      state.graph_data = graph_data;
      state.chartdata.labels = labels;
      state.chartdata.datasets[0] = pdata;
      // state.options.scales.yAxes = scales;
      // state.options.scales.xAxes[0].ticks.min = moment()
      //   .subtract(29, "days")
      //   .format();
      // state.options.scales.xAxes[0].ticks.max = moment().format();
      // scales.forEach((scale) => {
      //   scale.ticks.suggestedMax = max;
      //   scale.ticks.suggestedMin = min;
      // });
      // state.retailers = prcdata.ListaRetailers;
      // state.listaRigheTabella = prcdata.ListaRigheTabella;
      state.status = "Success";
    },
    prc_error(state, err) {
      state.status = err;
    },
    clear_price(state) {
      state.chartdata.labels = [];
      state.chartdata.datasets = [];
    },
  },
  actions: {
    amz_graph({ commit, state }, { item }) {
      return new Promise((resolve, reject) => {
        commit("get_current_item", { item });
        commit("graph_request");
        const richiesta = state.amzgraph_request;
        axios({
          url: "/",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          params: JSON.stringify(richiesta),
        })
          .then((res) => {
            console.log(res);

            const graph_data = JSON.parse(res.data.JsonRisposta);
            let labels = [...new Array(30)].map((i, idx) =>
              moment
                .utc()
                .startOf("day")
                .subtract(idx, "days")
                .utcOffset(1)
                .format()
            );
            labels.reverse();
            let pdata = [];
            let scales = [];

            graph_data.ListaPrezzi.forEach((entry, idx, arr) => {
              pdata.push({
                // label: label.TestoLegenda,
                // yAxisID: label.TestoLegenda,
                type: "line",
                data: arr.map((date) => {
                  date.DataPrezzo = moment
                    .utc(date.DataValore)
                    .format("YYYY-MM-DD");

                  return {
                    x: date.DataPrezzo,
                    y: date.PrezzoGiorno,
                  };
                }),

                backgroundColor: "transparent",
                borderWidth: 2,
                borderColor: "#191919",
                pointBorderWidth: 1,
                pointRadius: 2,
                pointBackgroundColor: "#191919",
              });
              // scales.push({
              //   id: label.TestoLegenda,
              //   position: idx == 0 ? "left" : "right",
              //   ticks: {
              //     source: "auto",
              //     padding: 15,
              //   },
              //   gridLines: {
              //     display: idx == 0 || idx == 1 ? true : false,
              //     drawTicks: false,
              //     offsetGridLines: false,
              //     drawBorder: true,
              //   },
              // });
            });
            // let max = 0;
            // let min = null;
            // let maxs = [];
            // let lista_valori = [];
            // pdata.forEach((data) => {
            //   data.data.forEach((item) => {
            //     max = item.y > max ? item.y : max;
            //     maxs.push(max);
            //     lista_valori.push(item.y);
            //   });
            // });
            // max = Math.max.apply(null, maxs);
            // min = Math.min.apply(null, lista_valori);
            // console.log(min);

            commit("graph_success", {
              // graphdata,
              labels,
              pdata,
              scales,
              graph_data,
              // max,
              // min,
            });
            commit("toggle_amz_graph", state);

            resolve(res);
          })
          .catch((err) => {
            commit("graph_error", err);
            reject(err);
          });
      });
    },
  },
  getters: {
    // status: (state) => state.status,
    // pricedata: (state) => state.chartdata,
    // priceoptions: (state) => state.options,
    // listaRetailers: (state) => state.retailers,
    // listaRigheTabella: (state) => state.listaRigheTabella,
  },
};
