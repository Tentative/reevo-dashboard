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
    items: {},
    amzdata: []
  },
  mutations: {
    table_request(state, amz) {
      state.status = "loading";
      state.amz_request.JsonRichiesta = amz;
    },
    amz_success(state) {
      state.status = "";
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
            commit("auth_success", token);
            const token = jsonRisposta.JsonWebToken;
            if (jsonRisposta.IsAutorizzato == true) {
              axios.defaults.headers.common["Authorization"] = token;
              resolve(res);
            } else {
              commit("auth_error");
              localStorage.removeItem("token");
            }
          })

          .catch(err => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    }
  },
  getters: {}
};
