export default {
  state: {
    VersioneClient: "0.5.7",
    menuVisible: false,
  },
  mutations: {
    toggleMenu(state) {
      state.menuVisible = !state.menuVisible;
    },
  },
  actions: {},
  getters: {
    menuVisible: (state) => state.menuVisible,
  },
};
