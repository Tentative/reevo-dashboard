import axios from "axios";
export default {
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    login: {
      CodiceClient: "reevolacerba2020",
      CodiceRichiesta: "Login",
      VersioneClient: "1.0.3",
      Url: window.location.href
    }
  },

  mutations: {
    auth_request(state, login) {
      state.status = "loading";
      state.login.JsonRichiesta = JSON.stringify(login);
      state.login.IsMemorizzaPassword = login.IsMemorizzaPassword;
    },
    auth_success(state, token) {
      state.status = "success";
      state.token = token;
      if (state.login.IsMemorizzaPassword == false) {
        console.log("Disconnesso al primo accesso");
        sessionStorage.setItem("token", token);
        state.token = "";
      } else {
        localStorage.setItem("token", token);
      }
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    }
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
            "Content-Type": "application/json"
          },
          params: JSON.stringify(richiesta)
        })
          .then(res => {
            console.log(res);
            const jsonRisposta = JSON.parse(res.data.JsonRisposta);
            const token = jsonRisposta.JsonWebToken;
            if (jsonRisposta.IsAutorizzato == true) {
              commit("auth_success", token);
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
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit("logout");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    }
  },
  getters: {}
};
