<template>
  <div>
    <div class="alert-wrapper">
      <div class="md-title">Items Dashboard</div>
      <Alerts v-if="router == 'Items' && loaded" />
    </div>
    <div class="md-alignment-center-center item-dashboard">
      <md-table v-if="loaded" id="itemtable" class="amz">
        <md-table-row>
          <md-table-head></md-table-head>
          <md-table-head class="name">Articolo</md-table-head>
          <md-table-head
            v-for="(item, index) in table_items.ListaRetailers"
            :key="index"
          >
            <span>{{ item }}</span></md-table-head
          >
        </md-table-row>
        <!-- first retailer -->
        <md-table-row v-for="(item, index) in lista_items" :key="index">
          <md-table-cell class="thumb"
            ><a><img :src="item.UrlImmagine" /></a></md-table-cell
          ><md-table-cell class="item is-dashboard"
            ><span>{{ item.NomeItem }}</span></md-table-cell
          >
          <td v-for="(n, i) of 4" id="container" :key="i">
            <span
              v-if="item.ListaInfo[i] && item.ListaInfo[i].Prezzo"
              class="fix is-dashboard"
              :class="item.ListaInfo[i].IsAlert ? 'filtro-alert' : 'price'"
            >
              {{ item.ListaInfo[i].Prezzo }}</span
            >
            <span v-else class="unavailable"
              ><i class="md-icon md-icon-font md-theme-default">remove</i></span
            >
            <span
              v-if="item.ListaInfo[i] && item.ListaInfo[i].Isalert"
              class="is-dashboard"
              :class="item.ListaInfo[i].IsAlert ? 'filtro-alert' : 'discount'"
              >{{ item.ListaInfo[i].Sconto + "&nbsp;" }} </span
            ><span v-else class="unavailable"
              ><i class="md-icon md-icon-font md-theme-default">remove</i></span
            >
            <span
              v-if="item.ListaInfo[i] && item.ListaInfo[i].InStock === 'No'"
              class="stock-item is-dashboard"
              ><md-icon class="no-status">cancel</md-icon></span
            ><span v-else class="unavailable"
              ><i class="md-icon md-icon-font md-theme-default">remove</i></span
            >
          </td>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Alerts from "./Alerts";
export default {
  name: "Table",
  components: { Alerts },
  props: {
    loaded: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      // retailers: [],
      debug: [],
    };
  },

  computed: {
    ...mapGetters({
      table_items: "table_items",
      lista_items: "lista_items",
      retailers: "retailers",
    }),
    router() {
      return this.$route.name;
    },
    first_exist() {
      if (this.retailers[0]) {
        return true;
      }
      return false;
    },
    second_exist() {
      if (this.retailers[1]) {
        return true;
      }
      return false;
    },
    third_exist() {
      if (this.retailers[2]) {
        return true;
      }
      return false;
    },
    fourth_exist() {
      if (this.retailers[3]) {
        return true;
      }
      return false;
    },
  },
  beforeCreate() {
    this.retailer;
  },
  methods: {
    retailer() {
      let retailers = this.table_items.ListaRetailers;
      for (let retailer in retailers) {
        this.retailers.push(retailer);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/toolbar.scss";
@import "@/assets/style/table.scss";
@import "@/assets/style/main.scss";

.md-table-cell-container {
  border-right: 5px solid #f4f6fb !important;
}
</style>
