import axios from "axios";
import global from "@/store/modules/global.js";
import moment from "moment";
export default {
  state: {
    status: "",
    main: {
      Categoria: null,
    },
    main_params: {
      CodiceClient: "reevolacerba2020",
      CodiceRichiesta: "Main",
      VersioneClient: global.state.VersioneClient,
      Url: window.location.href,
    },
    maindata: {},
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
        labels: {
          useLineStyle: true,
        },
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
    retailers: {},
    listaRigheTabella: {},
  },
  mutations: {
    main_request(state) {
      state.status = "loading";
      state.main_params.JsonRichiesta = JSON.stringify(state.main);
    },
    main_success(state, maindata) {
      state.maindata = maindata;
      state.chartdata.labels = maindata.labels;
      state.chartdata.datasets = maindata.pdata;
      state.status = "Success";
      state.options.scales.yAxes = maindata.scales;
      maindata.scales.forEach((scale) => {
        scale.ticks.suggestedMax = maindata.max + 4;
        scale.ticks.suggestedMin = maindata.min - 4;
      });
      state.listaRigheTabella = maindata.ListaRigheTabella;
    },
    main_error(state, err) {
      state.status = err;
    },
  },
  actions: {
    main_call({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit("main_request");
        const richiesta = state.main_params;
        axios({
          url: "/",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          params: JSON.stringify(richiesta),
        })
          .then((res) => {
            const maindata = JSON.parse(res.data.JsonRisposta);
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
            maindata.ListaCurve.forEach((label, idx) => {
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
                  padding: 15,
                  source: "auto",
                  display: idx == 0 ? true : false,
                  callback: function (value) {
                    return value + " €";
                  },
                },
                gridLines: {
                  display: idx == 0 || idx == 1 ? true : false,
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

            commit("main_success", {
              maindata,
              labels,
              pdata,
              scales,
              max,
              min,
            });

            resolve(res);
          })
          .catch((err) => {
            commit("main_error", err);
            // console.log(err);
            reject(err);
          });
      });
    },
  },
  getters: {
    maindata: (state) => state.maindata,
    maindata_graph: (state) => state.chartdata,
    mainoptions: (state) => state.options,
  },
};
