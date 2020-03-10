import axios from "axios";
export default {
  state: {
    screenshotVisible: false,
    current: {},
    screen_request: {
      CodiceClient: "reevolacerba2020",
      CodiceRichiesta: "Screenshot",
      VersioneClient: "1.0.3",
      Url: window.location.href
    }
  },
  mutations: {
    get_current(state, item) {
      state.current = item;
    },
    toggle_screenshot(state) {
      state.screenshotVisible = !state.screenshotVisible;
    },
    screen_request(state, screen_params) {
      state.screen_request.JsonRichiesta = JSON.stringify(screen_params);
    },
    screen_success(state, current_screen) {
      state.current = current_screen;
    }
  },
  actions: {
    screenshot({ commit }, item) {
      commit("get_current", item);
      commit("toggle_screenshot");
    },
    amz_screenshot({ commit, state }, item) {
      return new Promise((resolve, reject) => {
        commit("get_current", item);
        let screen_params = {
          EAN: state.current.EAN,
          Retailer: "Amazon"
        };
        commit("screen_request", screen_params);
        const richiesta = state.screen_request;
        axios({
          url: "/",
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          params: JSON.stringify(richiesta)
        })
          .then(res => {
            const current_screen = JSON.parse(res.data.JsonRisposta);
            // console.log(current_item);
            // const total_days = current_item.ListaPrezzi;
            // let labels = [];
            // for (const day in total_days) {
            //   labels.push(total_days[day].DataPrezzo);
            // }
            // let sales_rank = [];
            // let prezzo_giorno = [];
            // let in_stock_giorno = [];
            // for (const data in total_days) {
            //   prezzo_giorno.push(total_days[data].PrezzoGiorno);
            // }
            // for (const data in total_days) {
            //   sales_rank.push(total_days[data].SalesRankGiorno / 100);
            // }

            // let max_price = Math.max.apply(null, prezzo_giorno);
            // let max_rank = Math.max.apply(null, sales_rank);
            // let max = Math.max(max_price, max_rank);
            // for (const data in total_days) {
            //   if (total_days[data].InStockGiorno == "No") {
            //     in_stock_giorno.push(max);
            //   }
            //   in_stock_giorno.push("");
            // }

            commit("screen_success", {
              current_screen
            });

            resolve(res);
            commit("toggle_screenshot");
            // console.log("ha finit?");
          })

          .catch(err => {
            reject(err);
            // console.log(err);
          });
      });
    }
  },
  getters: {}
};
