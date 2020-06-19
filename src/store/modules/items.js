import axios from "axios";
import global from "@/store/modules/global.js";

export default {
  state: {
    status: "",
    itm_request: {
      CodiceClient: "reevolacerba2020",
      CodiceRichiesta: "Items",
      VersioneClient: global.state.VersioneClient,
      Url: window.location.href,
      // define JsonRichiesta from mutations ===> {itm}
    },
    itm: {
      NumeroPagina: 1,
      ItemsPerPagina: 20,
      Categoria: null,
      FiltroAlert: "Tutti",
      FiltroInStock: "Tutti",
    },
    items: [],
    itmdata: {},
    retailers: [],
    // itmGraphVisible: false,
  },
  mutations: {
    item_table_request(state, { itm }) {
      state.status = "loading";
      state.itm.NumeroPagina = itm.NumeroPagina;
      state.itm.ItemsPerPagina = itm.ItemsPerPagina;
      state.itm.Categoria = itm.Categoria;
      state.itm.FiltroAlert = itm.FiltroAlert;
      state.itm.FiltroInStock = itm.FiltroInStock;
      state.itm_request.JsonRichiesta = JSON.stringify(itm);
    },
    itm_success(state, { items, itmdata, retailers }) {
      state.status = "";
      state.items = items;
      state.itmdata = itmdata;
      state.retailers = retailers;
    },
    itm_error(state) {
      state.status = "";
    },
    update_params(state, new_data) {
      state.itmdata.NumeroPagina = new_data.numeroPagina;
    },
  },
  actions: {
    itm_request({ commit, state }, itm) {
      return new Promise((resolve, reject) => {
        commit("item_table_request", itm);
        const richiesta = state.itm_request;
        axios({
          url: "/",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          params: JSON.stringify(richiesta),
        })
          .then((res) => {
            // console.log(res);
            const itmdata = JSON.parse(res.data.JsonRisposta);
            const lista = itmdata.ListaItems;
            const retailers = itmdata.ListaRetailers;
            let items = [];
            for (const item of lista) {
              items.push(item);
            }
            commit("itm_success", { items, itmdata, retailers });
            // console.log(itmdata);
            resolve(res);
          })
          .catch((err) => {
            commit("itm_error", err);
            reject(err);
            // console.log(err);
          });
      });
    },
  },
  getters: {
    itmdata: (state) => state.itmdata,
  },
};
