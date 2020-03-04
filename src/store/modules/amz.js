import axios from "axios";

export default {
  state: {
    status: "",
    amz_request: {
      CodiceClient: "reevolacerba2020",
      CodiceRichiesta: "AMZ",
      VersioneClient: "1.0.3",
      Url: window.location.href
      // define JsonRichiesta from mutations ===> {amz}
    },
    amz: {
      NumeroPagina: 1,
      ItemsPerPagina: "20",
      Categoria: null,
      FiltroAlert: "Tutti",
      FiltroInStock: "Tutti",
      FiltroFastTrack: "Tutti",
      FiltroBuyBox: "Tutti",
      FiltroNegativeReviews: "Tutti"
    },
    items: [],
    amzdata: {},
    amzGraphVisible: false
  },
  mutations: {
    table_request(state, { amz }) {
      state.status = "loading";
      state.amz.NumeroPagina = amz.NumeroPagina;
      state.amz.ItemsPerPagina = amz.ItemsPerPagina;
      state.amz.Categoria = amz.Categoria;
      state.amz.FiltroAlert = amz.FiltroAlert;
      state.amz.FiltroInStock = amz.FiltroInStock;
      state.amz.FiltroFastTrack = amz.FiltroFastTrack;
      state.amz.FiltroBuyBox = amz.FiltroBuyBox;
      state.amz.FiltroNegativeReviews = amz.FiltroNegativeReviews;
      state.amz_request.JsonRichiesta = JSON.stringify(amz);
    },
    amz_success(state, { items, amzdata }) {
      state.status = "";
      state.items = items;
      state.amzdata = amzdata;
    },
    amz_error(state) {
      state.status = "";
    },
    update_params(state, new_data) {
      state.amzdata.NumeroPagina = new_data.numeroPagina;
    },
    toggle_amz_graph(state) {
      state.amzGraphVisible = !state.amzGraphVisible;
    }
  },
  actions: {
    amz_request({ commit, state }, amz) {
      return new Promise((resolve, reject) => {
        commit("table_request", amz);
        const richiesta = state.amz_request;
        axios({
          url: "/",
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          params: JSON.stringify(richiesta)
        })
          .then(res => {
            console.log(res);
            const amzdata = JSON.parse(res.data.JsonRisposta);
            const lista = amzdata.ListaItems;
            let items = [];
            for (const item of lista) {
              items.push(item);
            }
            commit("amz_success", { items, amzdata });
            console.log(amzdata);
            resolve(res);
          })
          .catch(err => {
            commit("amz_error", err);
            reject(err);
            console.log(err);
          });
      });
    }
  },
  getters: {}
};
