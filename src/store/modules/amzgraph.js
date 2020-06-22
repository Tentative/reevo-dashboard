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
      datasets: [
        {
          yAxisID: "prices",
          data: [],
          label: "Prezzi",
          steppedLine: true,
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: "#1d2faf",
          pointBorderWidth: 2,
          pointRadius: 2,
          pointBackgroundColor: "#191919",
        },
        {
          yAxisID: "ranks",
          data: [],
          label: "S. Ranks",
          steppedLine: true,
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: "#c10000",
          pointBorderWidth: 2,
          pointRadius: 2,
          pointBackgroundColor: "#191919",
        },
        {
          yAxisID: "stock",
          data: [],
          label: "stock",
          type: "bar",
          steppedLine: true,
          backgroundColor: "rgba(255, 0, 0, 0.12)",
          borderWidth: 0.3,
          borderColor: "red",
          pointRadius: 0,

          // barPercentage: 1,
          // categoryPercentage: 0.5,
        },
      ],
    },
    options: {
      annotation: {
        annotations: [
          {
            id: "min-line",
            mode: "horizontal",
            type: "line",
            scaleID: "prices",
            value: "",
            borderColor: "rgba(255,0,0,0.4)",
            borderWidth: 2,
            borderDash: [2, 2],
          },
          {
            id: "max-line",
            mode: "horizontal",
            type: "line",
            scaleID: "prices",
            value: "",
            borderColor: "rgba(0,204,102,0.4)",
            borderWidth: 2,
            borderDash: [2, 2],
          },
        ],
        // drawTime: "afterDraw",
      },
      tooltips: {
        enabled: true,
        intersect: true,
        mode: "index",
        displayColors: false,
        callbacks: {
          title: (tooltipItems) => {
            return moment(tooltipItems[0].xLabel).format("DD MMMM HH:MM");
          },
          label: function (t, d) {
            if (t.datasetIndex === 0) {
              return "Prezzo: " + t.yLabel + " " + "€";
            } else if (t.datasetIndex === 1) {
              return "Sales Rank: " + t.yLabel;
            } else if (t.datasetIndex === 2) {
              return "In stock " + t.tLabel;
            }
          },
        },
        filter: function (tooltipItem) {
          var dSet = tooltipItem.datasetIndex;
          if (dSet == 2) {
            // <-- dataset index
            return false;
          } else {
            return true;
          }
        },
      },
      responsive: true,
      offset: false,
      maintainAspectRatio: false,
      legend: {
        display: true,
        // onClick: function (e, legendItem) {
        //   var chart = this.chart;
        //   chart.options.scales.yAxes[0].ticks.display = false;
        // },
        // onClick: function (e, legendItem) {
        //   var index = legendItem.datasetIndex;
        //   var ci = this.chart;
        //   var alreadyHidden =
        //     ci.getDatasetMeta(index).hidden === null
        //       ? false
        //       : ci.getDatasetMeta(index).hidden;
        //   var anyOthersAlreadyHidden = false;
        //   var allOthersHidden = true;

        //   // figure out the current state of the labels
        //   ci.data.datasets.forEach(function (e, i) {
        //     var meta = ci.getDatasetMeta(i);

        //     if (i !== index) {
        //       if (meta.hidden) {
        //         anyOthersAlreadyHidden = true;
        //       } else {
        //         allOthersHidden = false;
        //       }
        //     }
        //   });

        //   // if the label we clicked is already hidden
        //   // then we now want to unhide (with any others already unhidden)
        //   if (alreadyHidden) {
        //     ci.getDatasetMeta(index).hidden = null;
        //   } else {
        //     // otherwise, lets figure out how to toggle visibility based upon the current state
        //     ci.data.datasets.forEach(function (e, i) {
        //       var meta = ci.getDatasetMeta(i);

        //       if (i !== index) {
        //         // handles logic when we click on visible hidden label and there is currently at least
        //         // one other label that is visible and at least one other label already hidden
        //         // (we want to keep those already hidden still hidden)
        //         if (anyOthersAlreadyHidden && !allOthersHidden) {
        //           meta.hidden = true;
        //         } else {
        //           // toggle visibility
        //           meta.hidden = meta.hidden === null ? !meta.hidden : null;
        //         }
        //       } else {
        //         meta.hidden = null;
        //       }
        //     });
        //   }

        //   ci.update();
        // },
        labels: {
          useLineStyle: true,
          filter: function (item, chart) {
            // Logic to remove a particular legend item goes here
            return !item.text.includes("stock");
          },
        },
        position: "bottom",
      },
      scales: {
        yAxes: [
          {
            offset: false,
            id: "prices",

            position: "left",
            gridLines: {
              display: true,
              offsetGridLines: false,
              drawTicks: false,
              drawBorder: false,
            },
            ticks: {
              source: "auto",
              padding: 15,
              display: true,
              // stepSize: 1,
              // eslint-disable-next-line no-unused-vars
              callback: function (value, index, values) {
                return value + " €";
              },

              // suggestedMax: "",
              // bounds: "data",
              // min: "",
              // max: "",
              precision: 0,
            },
          },
          {
            offset: false,
            id: "ranks",
            type: "linear",
            position: "left",
            gridLines: {
              display: false,
              offsetGridLines: false,
              drawTicks: false,
              drawBorder: false,
            },
            ticks: {
              display: false,
              padding: 0,
              source: "data",
              precision: 0,
              beginAtZero: false,
              callback: function (value, index, values) {
                return value;
              },
              // callback: function (value, index, values) {
              //   return value;
              // },
              // bounds: "data",
            },
          },
          {
            offset: false,
            id: "stock",
            position: "right",
            gridLines: {
              display: false,
              offsetGridLines: false,
              drawTicks: false,
              drawBorder: true,
            },

            ticks: {
              display: false,
              min: 0,
              suggestedMin: 0,
              //   // callback: function (value, index, values) {
              //   //   return value;
              //   // },
              beginAtZero: true,
              //   bounds: "auto",
              //   precision: 0,
              // },
              stacked: true,
            },
          },
        ],

        //         afterTickToLabelConversion: function (scaleInstance) {
        //           // set the first and last tick to null so it does not display
        //           // note, ticks[0] is the last tick and ticks[length - 1] is the first
        //           scaleInstance.ticks[scaleInstance.ticks.length - 1] = null;
        //           // need to do the same thing for this similiar array which is used internally
        //           scaleInstance.ticksAsNumbers[
        //             scaleInstance.ticksAsNumbers.length - 1
        //           ] = null;
        //         },
        //       },
        //     ],
        xAxes: [
          {
            offset: false,
            // bounds: "ticks",
            distribution: "linear",
            type: "time",
            autoSkip: false,
            time: {
              displayFormat: {
                day: "DD MMM",
              },
              unit: "day",
              // unitStepSize: 3,
              // stepSize: 3,
            },
            ticks: {
              source: "labels",
              padding: 15,
              autoSkip: false,
              maxRotation: 0,
              beginAtZero: true,

              // min: moment().subtract(29, "days").format(),
              // max: moment().format(),
              callback: function (item, index) {
                if (!(index % 3)) return item;
              },
              // },
              gridLines: {
                drawTicks: false,
                drawBorder: false,
              },
              // callback: function (value, index, values) {
              //   if (index == 1 || index == values.length) {
              //     return value;
              //   }
              // },
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
    graph_success(
      state,
      {
        pdata,
        sdata,
        idata,
        labels,
        graph_data,
        max,
        max_rank,
        min,
        min_rank,
        scale,
        scale_rank,
        // maxr,
        // minr,
        // perc,
        // percr,
      }
    ) {
      // state.prcdata = prcdata;
      state.graph_data = graph_data;
      state.chartdata.labels = labels;
      state.chartdata.datasets[0].data = pdata;
      state.chartdata.datasets[1].data = sdata;
      state.chartdata.datasets[2].data = idata;
      state.options.annotation.annotations[0].value = min;
      state.options.annotation.annotations[1].value = max;
      state.options.scales.yAxes[0].ticks.suggestedMax = Math.round(
        max + scale
      );
      state.options.scales.yAxes[0].ticks.suggestedMin =
        min != 0 ? Math.round(min - scale) : min;
      state.options.scales.yAxes[1].ticks.suggestedMax = Math.round(
        max_rank + scale_rank
      );
      state.options.scales.yAxes[1].ticks.suggestedMin =
        min_rank != 0 ? Math.round(min_rank - scale_rank) : min_rank;
      console.log(min_rank);

      // state.options.scales.yAxes = scales;
      state.options.scales.xAxes[0].ticks.min = moment()
        .subtract(29, "days")
        .format();
      // state.options.scales.xAxes[0].ticks.max = moment().format();

      // state.options.scales.yAxes[0].ticks.suggestedMax =
      //   perc == 0 ? max + min : max + perc;
      // state.options.scales.yAxes[0].ticks.suggestedMin =
      //   perc == 0 ? min - max : min - perc;
      // state.options.scales.yAxes[1].ticks.suggestedMax =
      //   percr == 0 ? maxr + minr : maxr + percr;
      // state.options.scales.yAxes[1].ticks.suggestedMin =
      //   percr == 0 ? minr - maxr : minr - percr;

      // state.retailers = prcdata.ListaRetailers;
      // state.listaRigheTabella = prcdata.ListaRigheTabella;
      state.status = "Success";
    },
    amz_error(state, err) {
      state.status = err;
    },
    clear_chart(state) {
      state.chartdata.labels = [];
      state.chartdata.datasets[0].data = [];
    },
  },
  actions: {
    amz_graph({ commit, state }, item) {
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
            let graph_data = JSON.parse(res.data.JsonRisposta);
            console.log(graph_data);
            let labels = [...new Array(30)].map((i, idx) =>
              moment
                .utc()
                .startOf("day")
                .subtract(idx, "days")
                .utcOffset(1)
                .format("YYYY-MM-DDTHH:MM")
            );
            labels.reverse();
            let pdata = [];
            let sdata = [];
            let idata = [];
            let duplicate = [];
            let price_values = [];
            let rank_values = [];
            console.log(graph_data);
            graph_data.ListaPrezzi.reverse();
            graph_data.ListaPrezzi.forEach((entry, idx, arr) => {
              pdata.push({
                x: entry.DataPrezzo,
                y:
                  entry.PrezzoGiorno == null || entry.PrezzoGiorno == 0
                    ? null
                    : parseFloat(entry.PrezzoGiorno.replace(",", ".")),
              });

              sdata.push({
                x: entry.DataPrezzo,
                y: entry.SalesRankGiorno,
              });
              if (entry.InStockGiorno == "No") {
                idata.push({
                  x: entry.DataPrezzo,
                  y:
                    entry.PrezzoGiorno == null
                      ? 0
                      : parseFloat(entry.PrezzoGiorno.replace(",", ".")),
                  z: entry.InStockGiorno,
                });

                console.log(entry.InStockGiorno);
              } else {
                idata.push({
                  x: entry.DataPrezzo,
                  y: 0,
                });
              }

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
            pdata.map((y) => {
              price_values.push(y.y);
            });
            sdata.map((y) => {
              rank_values.push(y.y);
            });

            console.log(price_values);
            let max = Math.max.apply(null, price_values);
            let min = Math.min.apply(null, price_values);
            console.log(max);
            console.log(min);
            let max_rank = Math.max.apply(null, rank_values);
            let min_rank = Math.min.apply(null, rank_values);
            let scale_rank =
              max_rank - min_rank != 0
                ? (((max_rank - min_rank) * 20) / 100) * 10
                : max_rank;
            scale_rank = Math.round(scale_rank);
            let scale = max - min != 0 ? (((max - min) * 20) / 100) * 10 : max;
            scale = Math.round(scale);
            console.log(scale);
            // let maxr = 0;
            // let minr = null;
            // let min = null;
            let maxs = [];
            // let maxrs = [];
            // let perc = 0;
            // let percr = 0;
            // let multiplierR = 0;
            // let multiplier = 0;
            let lista_valori = [];
            // let lista_valori_rank = [];
            // pdata.forEach((item) => {
            //   max = item.y > max ? item.y : max;
            //   maxs.push(max);
            //   lista_valori.push(item.y);
            // });
            // sdata.forEach((item) => {
            //   maxr = item.y > max ? item.y : max;
            //   maxrs.push(max);
            //   lista_valori_rank.push(item.y);
            // });
            // idata.reverse();
            // pdata.reverse();
            // sdata.reverse();

            // maxr = Math.max.apply(null, maxrs);
            // minr = Math.min.apply(null, lista_valori_rank);

            // Number.prototype.countDecimals = function () {
            //   if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
            //   return this.toString().split(".")[1].length || 0;
            // };
            // var test = max.toString().length;
            // var testr = maxr.toString().length;

            // multiplierR = maxr - minr;
            // multiplier = ((max - min) * 30) / 100;
            // perc =
            //   test == 1
            //     ? 2
            //     : test == 2
            //     ? 20
            //     : test == 3
            //     ? 200
            //     : test == 4
            //     ? 2000
            //     : 0;
            // percr =
            //   testr == 1
            //     ? 2
            //     : testr == 2
            //     ? 20
            //     : testr == 3
            //     ? 200
            //     : testr == 4
            //     ? 2000
            //     : 0;
            // console.log(test);

            commit("graph_success", {
              labels,
              pdata,
              sdata,
              idata,
              graph_data,
              max,
              max_rank,
              min,
              min_rank,
              scale,
              scale_rank,
              // maxr,
              // minr,
              // perc,
              // percr,
            });
            console.log(typeof pdata[0].y);

            resolve(res);
            commit("toggle_amz_graph");
          })
          .catch((err) => {
            commit("amz_error", err);
            reject(err);
          });
      });
    },
  },
  getters: {
    // status: (state) => state.status,
    graphdata: (state) => state.chartdata,
    graphoptions: (state) => state.options,
    // listaRetailers: (state) => state.retailers,
    // listaRigheTabella: (state) => state.listaRigheTabella,
    currentItem: (state) => state.graph_data,
  },
};
