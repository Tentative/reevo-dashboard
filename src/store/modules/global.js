export default {
  state: {
    VersioneClient: "0.9.9.2",
    menuVisible: false,
    show_price_alerts: false,
  },
  mutations: {
    toggleMenu(state) {
      state.menuVisible = !state.menuVisible;
    },
    togglePriceAlerts(state) {
      state.show_price_alerts = !state.show_price_alerts;
    },
  },
  actions: {},
  getters: {
    menuVisible: (state) => state.menuVisible,
    show_price_alerts: (state) => state.show_price_alerts,
  },
};
