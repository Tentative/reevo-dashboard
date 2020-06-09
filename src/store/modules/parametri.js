import axios from "axios";
import global from "@/store/modules/global.js";
export default {
  state: {
    status: "",
    params: {
      CodiceClient: "reevolacerba2020",
      CodiceRichiesta: "Parametri",
      VersioneClient: global.state.VersioneClient,
      Url: window.location.href,
      JsonRichiesta: {},
    },
    paramdata: {},
  },
  mutation: {
    parametri_request(state) {
      state.status = "loading";
    },
    parametri_success(state, paramdata) {
      state.status = "success";
      state.paramdata = paramdata;
    },
    parametri_error(state, err) {
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
  },
};
