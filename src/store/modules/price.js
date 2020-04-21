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
      // responsive: true,
      // maintainAspectRatio: true,
      legend: {
        display: true,
        position: "bottom",
        scales: {
          xAxes: [
            {
              reverse: true,
              ticks: {
                reverse: true,
              },
            },
          ],
        },
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
    prc_success(state, { prcdata, labels }) {
      state.prcdata = prcdata;
      state.chartdata.labels = labels;
      state.retailers = prcdata.ListaRetailers;
      state.curve = prcdata.ListaCurve;
      state.status = "Success";
    },
    prc_error(state, err) {
      state.status = err;
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
            for (const label of prcdata.ListaRetailers) {
              state.chartdata.datasets.push({
                label: label,
                yAxisID: label,
              });
            }
            let labels = [...new Array(31)].map((i, idx) =>
              moment
                .utc()
                .startOf("day")
                .subtract(idx, "days")
                .utcOffset(1)
                .format("DD MMM")
            );

            commit("prc_success", { prcdata, labels });

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
