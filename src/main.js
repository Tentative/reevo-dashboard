import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import VueMaterial from "vue-material";
import { Pagination } from "element-ui";
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
// import moment from "moment";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import "@/assets/style/global.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUserSecret);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.prototype.$http = Axios;
const token = localStorage.getItem("token") || sessionStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

// moment.locale("IT");

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(Pagination);
Vue.use(library);
Vue.use(faUserSecret);
Vue.use(FontAwesomeIcon);

Vue.material = {
  ...Vue.material,
  ripple: false,
  inkRipple: false,
  locale: {
    ...Vue.material.locale,
    dateFormat: "dd/MM/yyyy",
    firstDayOfAWeek: 1,
  },
};

Vue.material.MdRipple = false;

Vue.use("vue-moment");

new Vue({
  router,
  store,
  render: (h) => h(App),
  components: {
    FilePond: vueFilePond(),
  },
}).$mount("#app");
