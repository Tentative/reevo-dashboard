export default {
  state: {
    screenshotVisible: false,
    current: {}
  },
  mutations: {
    get_current(state, item) {
      state.currentItem = item;
    },
    toggle_screenshot(state) {
      state.screenshotVisible = !state.screenshotVisible;
    }
  },
  actions: {
    save_screen({ commit }, item) {
      commit("get_current", item);
      commit("toggle_screenshot");
    }
  },
  getters: {}
};
