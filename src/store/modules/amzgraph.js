import axios from "axios";
import moment from "moment";
import global from "@/store/modules/global.js";

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
          type: "line",
          yAxisID: "prices",
        },
        {
          label: "Sales Rank",
          type: "line",
          yAxisID: "ranks",
        },
        {
          label: "Out of stock",

          type: "bar",

          yAxisID: "stock",
        },
      ],
    },
    options: {
      legend: {
        labels: {
          useLineStyle: true,
          // eslint-disable-next-line no-unused-vars
          filter: function (item, chart) {
            // Logic to remove a particular legend item goes here
            return !item.text.includes("Out of stock");
          },
        },
      },
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
        drawTime: "afterDraw",
      },
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
              display: true,
              offsetGridLines: false,
            },
            ticks: {
              display: true,
              // eslint-disable-next-line no-unused-vars
              callback: function (value, index, values) {
                return value + " " + "€";
              },
              beginAtZero: false,
              // suggestedMax: "",
              bounds: "data",
              // min: "",
              // max: "",
              precision: 0,
            },
            afterTickToLabelConversion: function (scaleInstance) {
              // set the first and last tick to null so it does not display
              // note, ticks[0] is the last tick and ticks[length - 1] is the first
              scaleInstance.ticks[scaleInstance.ticks.length - 1] = null;

              // need to do the same thing for this similiar array which is used internally
              scaleInstance.ticksAsNumbers[
                scaleInstance.ticksAsNumbers.length - 1
              ] = null;
            },
          },
          {
            id: "ranks",
            type: "linear",
            position: "right",
            gridLines: {
              display: false,
              drawBorder: true,
              lineWidth: 1,
              zeroLineWidth: 1,
              offsetGridLines: false,
            },
            ticks: {
              display: false,
              reverse: true,
              precision: 0,
              bounds: "data",
            },
          },
          {
            id: "stock",
            distribution: "linear",
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
              precision: 0,
              source: "data",
              // min: "",
              // max: ""
            },
          },
        ],
        xAxes: [
          {
            barPercentage: 1.1,
            categoryPercentage: 1.1,

            // bounds: "ticks",
            // type: "time",
            ticks: {
              // min: "",
              // max: "",
              // source: "ticks",
              userCallback: function (item, index) {
                if (!(index % 3)) return moment(item).format("DD MMM");
              },
              autoSkip: true,
              maxRotation: 0,
              maxTicksLimit: 30,
            },
            distribution: "linear",
            time: {
              displayFormats: {
                day: "D MMM",
              },
              // stepSize: 3,
              unit: "day",
            },
            gridLines: {
              display: true,
              drawTicks: false,
              offsetGridLines: false,
              zeroLineWidth: 1,
            },
            offset: false,
          },
        ],
      },
      tooltips: {
        mode: "index",
        position: "nearest",
        callbacks: {
          title: (tooltipItems) => {
            return tooltipItems[0].xLabel;
          },

          //
          // eslint-disable-next-line no-unused-vars
          label: function (t, d) {
            if (t.datasetIndex === 0) {
              return "Prezzo: " + t.yLabel + " " + "€";
            } else if (t.datasetIndex === 1) {
              return "Sales Rank: " + t.yLabel;
            }
          },
        },
      },
    },
    days: [],
    min_max: [],
    amzgraph_request: {
      CodiceClient: "reevolacerba2020",
      CodiceRichiesta: "AMZGraph",
      VersioneClient: global.state.VersioneClient,
      Url: window.location.href,
      //define JsonRichiesta from mutations;
    },
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
    graph_success(state) {
      state.status = "success";
    },
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
          FiltroGiorni: "30",
        };
        commit("graph_request", graph_params);
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
            const current_item = JSON.parse(res.data.JsonRisposta);
            let labels = [...new Array(30)].map((i, idx) =>
              moment
                .utc()
                .startOf("day")
                .subtract(idx, "days")
                .utcOffset(1)
                .format()
            );
            let chartdata = [];
            current_item.ListaValori.forEach((item) => {
              chartdata.push({});
            });
            commit("graph_success", current_item, labels);
            resolve(res);
          })

          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  getters: {},
};
