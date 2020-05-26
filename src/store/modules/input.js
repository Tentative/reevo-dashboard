import axios from "axios";
import global from "@/store/modules/global.js";

export default {
  state: {
    status: "",
    input_params: {
      CodiceClient: "reevolacerba2020",
      CodiceRichiesta: "ListaArticoli",
      VersioneClient: global.state.VersioneClient,
      Url: window.location.href,
    },
    input: {
      Categoria: "Null",
    },
  },
  mutations: {
    input_request(state) {
      state.status = "loading";
      state.input_params.JsonRichiesta = JSON.stringify(state.input);
    },
    input_success(state, inputdata) {
      state.inputdata = inputdata;
    },
    input_error(state, err) {
      state.status = err;
    },
  },
  actions: {
    input_call({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit("input_request");
        const richiesta = state.input_params;
        axios({
          url: "/",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          params: JSON.stringify(richiesta),
        })
          .then((res) => {
            const inputdata = res.data.JsonRisposta;
            commit("input_success", inputdata);
            resolve(res);
          })
          .catch((err) => {
            commit("input_error", err);
            // console.log(err);
            reject(err);
          });
      });
    },
  },
};
