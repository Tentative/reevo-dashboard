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
      labels: [],
      datasets: [],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: "bottom",
      },
      scales: {
        yAxes: [],
        xAxes: [
          {
            offset: true,
            distribution: "linear",
            type: "time",
            time: {
              displayFormat: {
                day: "D MMM",
              },
              unit: "day",
              // stepSize: 3,
            },
            ticks: {
              // source: "data",
              autoSkip: true,
              maxRotation: 0,
              maxTicksLimit: 30,
              callback: function (item, index) {
                if (!(index % 2)) return item;
              },
            },
          },
        ],
      },
    },
    prcdata: {},
    retailers: {},
    curve: {},
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
      scales.forEach((scale) => {
        scale.ticks.suggestedMax = max;
        scale.ticks.suggestedMin = min;
      });
      state.retailers = prcdata.ListaRetailers;
      state.curve = prcdata.ListaCurve;
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
            let labels = [...new Array(31)].map((i, idx) =>
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
                    y: date.Valore,
                  };
                }).reverse(),
                backgroundColor: "transparent",
                borderWidth: 3,
                borderColor: "#" + label.Colore.toString().slice(2),
              });
              scales.push({
                id: label.TestoLegenda,
                position: "left",
                ticks: {
                  source: "auto",
                  display: idx == 0 ? true : false,
                  callback: function (value) {
                    return value + " " + "€";
                  },
                },
                gridLines: {
                  display: idx == 0 ? true : false,
                  drawTicks: idx == 0 ? true : false,
                  offsetGridLines: false,
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
  },
};
