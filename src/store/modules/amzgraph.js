// import axios from "axios";

export default {
  state: {
    amzGraphVisible: false,
    currentItem: {},
    amzgraph: {
      CodiceClient: "reevolacerba2020",
      CodiceRichiesta: "AMZ",
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
    }
  },
  actions: {
    save_graph({ commit }, item) {
      commit("get_current_item", item);
      commit("toggle_amz_graph");
    }
  },
  getters: {}
};
