import Vue from "vue";
import Vuex from "vuex";
import getters from "./modules/getters";
import auth from "./modules/auth.js";
import amz from "./modules/amz.js";
import amzgraph from "./modules/amzgraph.js";
import screenshot from "./modules/screenshot.js";
import items from "./modules/items.js";
import global from "./modules/global.js";
import axios from "axios";
import price from "./modules/price.js";
import main from "./modules/main.js";
import parametri from "./modules/parametri.js";
import input from "./modules/input.js";

Vue.use(Vuex);

axios.defaults.baseURL = "https://data.reevo.io";

export default new Vuex.Store({
  modules: {
    auth,
    amz,
    amzgraph,
    screenshot,
    items,
    global,
    price,
    main,
    parametri,
    input,
  },
  mutations: {},
  actions: {},
  getters,
});
