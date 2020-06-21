import axios from "axios";
import global from "@/store/modules/global.js";

export default {
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    login: {
      CodiceClient: "reevolacerba2020",
      CodiceRichiesta: "Login",
      VersioneClient: global.state.VersioneClient,
      Url: window.location.href,
    },
    authdata: {},
    nomeUtente:
      localStorage.getItem("nome-utente") ||
      sessionStorage.getItem("nome-utente"),
  },

  mutations: {
    unauthorized(state) {
      state.status = "Unauthorized";
    },
    auth_request(state, login) {
      state.status = "loading";
      state.login.JsonRichiesta = JSON.stringify(login);
      state.login.IsMemorizzaPassword = login.IsMemorizzaPassword;
    },
    auth_data(state, jsonRisposta) {
      state.authdata = jsonRisposta;
    },
    auth_success(state, { token, nomeUtente }) {
      state.status = "success";
      state.token = token;
      state.nomeUtente = nomeUtente;
      if (state.login.IsMemorizzaPassword == false) {
        // console.log("Disconnesso al primo accesso");
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("nome-utente", nomeUtente);
        // state.token = token;
      } else {
        localStorage.setItem("token", token);
        localStorage.setItem("nome-utente", nomeUtente);
      }
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.nomeUtente = "";
      localStorage.removeItem("token");
      localStorage.removeItem("nome-utente");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("nome-utente");
    },
  },
  actions: {
    login({ commit, state }, login, IsMemorizzaPassword) {
      return new Promise((resolve, reject) => {
        commit("auth_request", login, IsMemorizzaPassword);
        const richiesta = state.login;
        axios({
          url: "/",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          params: JSON.stringify(richiesta),
        })
          .then((res) => {
            console.log(res);
            const jsonRisposta = JSON.parse(res.data.JsonRisposta);
            const token = jsonRisposta.JsonWebToken;
            const nomeUtente = jsonRisposta.NomeAzienda;
            commit("auth_data", jsonRisposta);
            if (
              login.NomeUtente != "" &&
              login.Password != "" &&
              jsonRisposta.IsAutorizzato == false
            ) {
              commit("unauthorized");
              return;
            }

            if (jsonRisposta.IsAutorizzato == true) {
              commit("auth_success", { token, nomeUtente });
              axios.defaults.headers.common["Authorization"] = token;
              console.log(token.exp);
              resolve(res);
            } else {
              commit("auth_error");
              localStorage.removeItem("token");
            }
          })

          .catch((err) => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
  },
  getters: {
    nomeUtente: (state) => state.nomeUtente,
  },
};
