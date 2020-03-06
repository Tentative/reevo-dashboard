import axios from "axios";
export default {
  state: {
    amzGraphVisible: false,
    graph_params: {},
    graph_res: {},
    graph_days: [],
    currentItem: {},
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
    graph_success(state, { days, min_max, data_prezzo }) {
      state.days = days;
      state.min_max = min_max;
      state.data_prezzo = data_prezzo;
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
            let days = [];
            for (const day in total_days) {
              days.push(total_days[day].PrezzoGiorno);
            }
            let min_max = [response.PrezzoMin, response.PrezzoMax];
            let data_prezzo = [];
            for (const data in total_days) {
              data_prezzo.push(total_days[data].DataPrezzo);
            }
            commit("graph_success", { days, min_max, data_prezzo });

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
