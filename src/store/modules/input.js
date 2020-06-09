import axios from "axios";
import global from "@/store/modules/global.js";

export default {
  state: {
    status: "",
    input_params: {
      CodiceClient: "reevolacerba2020",
      CodiceRichiesta: "Articoli",
      VersioneClient: global.state.VersioneClient,
      Url: window.location.href,
    },
    upload_params: {
      CodiceClient: "reevolacerba2020",
      CodiceRichiesta: "Upload",
      VersioneClient: global.state.VersioneClient,
      Url: window.location.href,
    },
    input: {
      Categoria: "Null",
    },
    upload: {},
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
    upload_request(state, { params }) {
      state.status = "loading";
      state.upload.NomeFile = params.filename;
      state.upload.Tipologia = params.mode;
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
            const inputdata = JSON.parse(res.data.JsonRisposta);
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
    //   upload({ commit, state }, { params }) {
    //     return new Promise((resolve, reject) => {
    //       commit("upload_request", params)
    //     }
    // }
  },
  getters: {
    nomeAzienda: (state) => state.inputdata.NomeAzienda,
    linkFile: (state) => state.inputdata.LinkListaArticoli,
  },
};
