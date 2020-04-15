import axios from "axios";
export default {
  state: {
    screenshotVisible: false,
    current: {},
    screen: {},
    screen_request: {
      CodiceClient: "reevolacerba2020",
      CodiceRichiesta: "Screenshot",
      VersioneClient: "0.3.5",
      Url: window.location.href,
    },
  },
  mutations: {
    get_current(state, item) {
      state.current = item;
    },
    toggle_screenshot(state) {
      state.screenshotVisible = !state.screenshotVisible;
    },
    clear_screenshot(state) {
      state.screenshotVisible = !state.screenshotVisible;
      state.screen = {};
    },
    screen_request(state, screen_params) {
      state.screen_request.JsonRichiesta = JSON.stringify(screen_params);
    },
    screen_success(state, current_screen) {
      state.screen = current_screen;
    },
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
          Retailer: "Amazon",
        };
        commit("screen_request", screen_params);
        const richiesta = state.screen_request;
        axios({
          url: "/",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          params: JSON.stringify(richiesta),
        })
          .then((res) => {
            const current_screen = JSON.parse(res.data.JsonRisposta);
            if (current_screen == null) {
              commit("toggle_screenshot"), resolve(res);
              return;
            } else {
              commit("screen_success", current_screen);

              resolve(res);
              commit("toggle_screenshot");
              // console.log("ha finit?");
            }
          })

          .catch((err) => {
            reject(err);
            // console.log(err);
          });
      });
    },
  },
  getters: {},
};
