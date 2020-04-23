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
      },
    },
    prcdata: {},
    retailers: {},
    curve: {},
  },
  mutations: {
    prc_request(state) {
      state.status = "loading";
      state.price_request.JsonRichiesta = JSON.stringify(state.price_graph);
    },
    prc_success(state, { prcdata, labels, pdata, scales }) {
      state.prcdata = prcdata;
      state.chartdata.labels = labels;
      state.chartdata.datasets = pdata;
      state.options.scales.yAxes = scales;
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
    prc_call({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit("prc_request");
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
            let pdata = [];
            let scales = [];
            prcdata.ListaCurve.forEach((label, idx) => {
              pdata.push({
                label: label.TestoLegenda,
                yAxisID: label.TestoLegenda,
                type: "line",
                data: [...new Array(31)].map(() =>
                  Math.floor(Math.random() * 31)
                ),
                backgroundColor: "transparent",
                borderWidth: 3,
                borderColor: "#" + label.Colore.toString().slice(2),
              });
              scales.push({
                id: label.TestoLegenda,
                position: "left",
                ticks: {
                  display: idx == 0 ? true : false,
                },
              });
            });
            let labels = [...new Array(31)].map((i, idx) =>
              moment
                .utc()
                .startOf("day")
                .subtract(idx, "days")
                .utcOffset(1)
                .format("YYYY-MM-DD")
            );
            labels.reverse();

            commit("prc_success", { prcdata, labels, pdata, scales });

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
  },
};
