import axios from "axios";
import global from "@/store/modules/global.js";
export default {
  state: {
    status: "",
    main: {
      Categoria: null,
    },
    main_params: {
      CodiceClient: "reevolacerba2020",
      CodiceRichiesta: "Main",
      VersioneClient: global.state.VersioneClient,
      Url: window.location.href,
    },
    maindata: {},
  },
  mutations: {
    main_request(state) {
      state.status = "loading";
      state.main_params.JsonRichiesta = JSON.stringify(state.main);
    },
    main_success(state, maindata) {
      state.maindata = maindata;
      state.status = "Success";
    },
    main_error(state, err) {
      state.status = err;
    },
  },
  actions: {
    main_call({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit("main_request");
        const richiesta = state.main_params;
        axios({
          url: "/",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          params: JSON.stringify(richiesta),
        })
          .then((res) => {
            const maindata = JSON.parse(res.data.JsonRisposta);
            commit("main_success", maindata);
            resolve(res);
          })
          .catch((err) => {
            commit("main_error", err);
            reject(err);
          });
      });
    },
  },
};
