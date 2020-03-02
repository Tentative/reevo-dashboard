import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.prototype.$http = Axios;
const token = localStorage.getItem("token") || sessionStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

Vue.config.productionTip = false;

Vue.use(VueMaterial);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
