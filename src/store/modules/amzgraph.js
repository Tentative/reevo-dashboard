import axios from "axios";
export default {
  state: {
    amzGraphVisible: false,
    currentItem: {},
    amzgraph_request: {
      CodiceClient: "reevolacerba2020",
      CodiceRichiesta: "AMZ_Graph",
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
      state.currentItem = item;
    },
    graph_request(state, graph_params) {
      state.amzgraph_request.JsonRichiesta = JSON.stringify(graph_params);
    }
  },
  actions: {
    save_graph({ commit }, item) {
      commit("get_current_item", item);
      commit("toggle_amz_graph");
    },
    amz_graph({ commit, state }, graph_params) {
      return new Promise((resolve, reject) => {
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
            console.log(richiesta);
            console.log(res);
            resolve(res);
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
