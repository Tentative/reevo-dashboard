import Vue from "vue";
import Vuex from "vuex";
import getters from "./modules/getters";
import auth from "./modules/auth.js";
import amz from "./modules/amz.js";
import axios from "axios";

Vue.use(Vuex);

axios.defaults.baseURL = "https://data.reevo.io";

export default new Vuex.Store({
  modules: {
    auth,
    amz
  },
  state: {},
  mutations: {},
  actions: {},
  getters
});
