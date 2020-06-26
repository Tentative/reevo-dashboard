import axios from "axios";
import global from "@/store/modules/global.js";
import moment from "moment";
export default {
  state: {
    status: "",
    price_graph: {
      Categoria: null,
      FiltroGiorni: 30,
      FiltroListaRetailers: null,
      FiltroStessiProdotti: "No",
      FiltroIndex: "No",
      FiltroSuddividiPrezzo: "No",
      FiltroPrezzoBasso: "Si",
      FiltroPrezzoMedio: "Si",
      FiltroPrezzoAlto: "Si",
      FiltroSuddividiSR: "No",
      FiltroSRBasso: "Si",
      FiltroSRMedio: "Si",
      FiltroSRAlto: "Si",
      FiltroSRTop: "No",
    },
    price_request: {
      CodiceClient: "reevolacerba2020",
      CodiceRichiesta: "PriceGraph",
      VersioneClient: global.state.VersioneClient,
      Url: window.location.href,
    },
    chartdata: {
      labels: [...new Array(30)].map((i, idx) =>
        moment
          .utc()
          .startOf("day")
          .subtract(idx, "days")
          .utcOffset(1)
          .format("YYYY-MM-DD")
      ),
      datasets: [],
    },
    options: {
      tooltips: {
        enabled: true,
        intersect: true,
        mode: "index",
        displayColors: false,
        callbacks: {
          title: (tooltipItems) => {
            return moment(tooltipItems[0].xLabel)
              .locale("it")
              .format("DD MMMM HH:MM");
          },
          // label: function (t, d) {
          //   if (t.datasetIndex === 0) {
          //     return "Prezzo: " + t.yLabel + " " + "€";
          //   }
          // },
        },
      },
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
            bounds: "ticks",
            distribution: "linear",
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
              source: "labels",
              padding: 15,
              autoSkip: false,
              maxRotation: 0,
              callback: function (item, index) {
                if (!(index % 3)) return item;
              },
            },
            gridLines: {
              drawTicks: false,
              drawBorder: false,
              zeroLineWidth: 0,
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
    prc_request(state, { price }) {
      state.status = "loading";
      state.price_graph = price;
      state.price_request.JsonRichiesta = JSON.stringify(state.price_graph);
    },
    prc_success(state, { prcdata, labels, pdata, scales, max, min }) {
      state.prcdata = prcdata;
      state.chartdata.labels = labels;
      state.chartdata.datasets = pdata;
      state.options.scales.yAxes = scales;
      // state.options.scales.xAxes[0].ticks.min = moment()
      //   .subtract(29, "days")
      //   .format();
      // state.options.scales.xAxes[0].ticks.max = moment().format();
      scales.forEach((scale) => {
        scale.ticks.suggestedMax = max;
        // if (state.price_graph.FiltroIndex == "Si") {
        //   scale.ticks.min = min;
        // } else {
        //   scale.ticks.suggestedMin = min;
        // }
        scale.ticks.suggestedMin = min;
      });
      state.retailers = prcdata.ListaRetailers;
      state.listaRigheTabella = prcdata.ListaRigheTabella;
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
    prc_call({ commit, state }, { price }) {
      return new Promise((resolve, reject) => {
        commit("prc_request", { price });
        const richiesta = state.price_request;
        axios({
          url: "/",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          params: JSON.stringify(richiesta),
        })
          .then((res) => {
            const prcdata = JSON.parse(res.data.JsonRisposta);
            let labels = [...new Array(30)].map((i, idx) =>
              moment
                .utc()
                .startOf("day")
                .subtract(idx, "days")
                .utcOffset(1)
                .format("YYYY-MM-DD")
            );
            labels.reverse();
            let pdata = [];
            let scales = [];
            prcdata.ListaCurve.forEach((label, idx) => {
              pdata.push({
                label: label.TestoLegenda,
                yAxisID: label.TestoLegenda,
                type: "line",
                data: label.ListaValori.map((date) => {
                  date.DataValore = moment
                    .utc(date.DataValore)
                    .format("YYYY-MM-DD");

                  return {
                    x: date.DataValore,
                    y: parseFloat(date.Valore),
                  };
                }),
                backgroundColor: "transparent",
                borderWidth: 2,
                borderColor: "#" + label.Colore.toString().slice(2),
                pointBorderWidth: 1,
                pointRadius: 2,
                pointBackgroundColor: "#" + label.Colore.toString().slice(2),
              });
              scales.push({
                id: label.TestoLegenda,
                position: idx == 0 ? "left" : "right",
                ticks: {
                  source: "auto",
                  padding: 15,
                  display: idx == 0 ? true : false,
                  callback: function (value) {
                    if (prcdata.FiltroIndex == "No") {
                      return (value = value + " €");
                    }
                    return value;
                  },
                },
                gridLines: {
                  display: idx == 0 ? true : false,
                  drawTicks: false,
                  offsetGridLines: false,
                  drawBorder: true,
                },
              });
            });
            let max = 0;
            let min = null;
            let maxs = [];
            let lista_valori = [];
            pdata.forEach((data) => {
              data.data.forEach((item) => {
                max = item.y > max ? item.y : max;
                maxs.push(max);
                lista_valori.push(item.y);
              });
            });
            max = Math.max.apply(null, maxs);
            min = Math.min.apply(null, lista_valori);
            // console.log(min);

            commit("prc_success", { prcdata, labels, pdata, scales, max, min });

            resolve(res);
          })
          .catch((err) => {
            commit("prc_error", err);
            reject(err);
          });
      });
    },
  },
  getters: {
    status: (state) => state.status,
    pricedata: (state) => state.chartdata,
    priceoptions: (state) => state.options,
    listaRetailers: (state) => state.retailers,
    listaRigheTabella: (state) => state.listaRigheTabella,
  },
};
