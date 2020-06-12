import axios from "axios";
import global from "@/store/modules/global.js";
export default {
  state: {
    status: "",
    params: {
      CodiceClient: "reevolacerba2020",
      CodiceRichiesta: "LeggeParametri",
      VersioneClient: global.state.VersioneClient,
      Url: window.location.href,
      JsonRichiesta: {},
    },
    param: {
      Categoria: "null",
    },
    form: {},
    paramdata: {},
  },
  mutations: {
    parametri_request(state) {
      state.status = "loading";
      state.params.JsonRichiesta = JSON.stringify(state.param);
    },
    parametri_save_request(state, form) {
      state.status = "loading";
      state.form = form;
      state.params.CodiceRichiesta = "SalvaParametri";
      state.params.JsonRichiesta = JSON.stringify(form);
    },
    parametri_success(state, paramdata) {
      state.status = "success";
      state.paramdata = paramdata;
    },
    parametri_save_success(state, savedata) {
      state.status = "success";
      state.savedata = savedata;
    },
    parametri_error(state, err) {
      state.status = err;
    },
    parametri_save_error(state, err) {
      state.status = err;
    },
  },
  actions: {
    parametri_call({ state, commit }) {
      return new Promise((resolve, reject) => {
        const richiesta = state.params;
        commit("parametri_request");
        axios({
          url: "/",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          params: JSON.stringify(richiesta),
        })
          .then((res) => {
            let paramdata = JSON.parse(res.data.JsonRisposta);
            commit("parametri_success", paramdata);
            resolve(res);
          })
          .catch((err) => {
            commit("parametri_error", err);
            reject(err);
          });
      });
    },
    parametri_save_call({ state, commit }, form) {
      return new Promise((resolve, reject) => {
        commit("parametri_save_request", form);
        const richiesta = state.params;
        axios({
          url: "/",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          params: JSON.stringify(richiesta),
        })
          .then((res) => {
            let savedata = JSON.parse(res.data.JsonRisposta);
            commit("parametri_save_success", savedata);
            resolve(res);
          })
          .catch((err) => {
            commit("parametri_save_error", err);
            reject(err);
          });
      });
    },
  },
  getters: {
    params: (state) => state.paramdata,
    save: (state) => state.savedata,
  },
};
