<template>
  <div>
    <div class="alert-wrapper">
      <span class="md-title title">Items Dashboard</span>
      <Alerts v-if="router == 'Items'" />
    </div>
    <div class="md-alignment-center-center item-dashboard">
      <md-table class="amz">
        <md-table-row>
          <md-table-head></md-table-head>
          <md-table-head class="name">Articolo</md-table-head>
          <md-table-head
            v-for="(item, index) in table_items.ListaRetailers"
            :key="index"
            class="retailer"
            colspan="3"
          >
            <span v-if="index <= '3'">{{ item }}</span></md-table-head
          >
        </md-table-row>
        <!-- first retailer -->
        <md-table-row
          v-for="(item, index) in lista_items"
          v-show="lista_items[index]"
          :key="index"
          ><md-table-cell class="thumb"
            ><a><img :src="item.UrlImmagine" /></a></md-table-cell
          ><md-table-cell class="item is-dashboard"
            ><span>{{ item.NomeItem }}</span></md-table-cell
          ><md-table-cell
            v-show="first_exist"
            class="fix is-dashboard"
            :class="item.ListaInfo[0].IsAlert ? 'filtro-alert' : 'price'"
            ><span v-if="index < lista_items.length"
              >{{ item.ListaInfo[0].Prezzo }} €</span
            >
            <span v-else class="unavailable">-</span></md-table-cell
          >
          <md-table-cell
            v-show="first_exist"
            class="is-dashboard"
            :class="item.ListaInfo[0].IsAlert ? 'filtro-alert' : 'discount'"
            ><span v-if="index < lista_items.length"
              >{{
                Math.abs(item.ListaInfo[0].Sconto).toString().slice(0, 2)
              }}
              %</span
            ></md-table-cell
          >
          <md-table-cell v-show="first_exist" class="stock is-dashboard"
            ><span
              v-if="
                index < lista_items.length && item.ListaInfo[0].InStock == 'No'
              "
              ><md-icon class="no-status-item">cancel</md-icon></span
            ><span v-else></span
          ></md-table-cell>
          <!-- second retailer -->
          <md-table-cell
            v-show="second_exist"
            class="fix is-dashboard"
            :class="
              item.ListaInfo[1] != undefined && item.ListaInfo[1].IsAlert
                ? 'filtro-alert'
                : 'price'
            "
            ><span v-if="item.ListaInfo[1] != undefined"
              >{{ item.ListaInfo[1].Prezzo }} €</span
            >
            <span v-else class="unavailable"
              ><md-icon>remove</md-icon></span
            ></md-table-cell
          >
          <md-table-cell
            v-show="second_exist"
            class="cheap is-dashboard"
            :class="
              item.ListaInfo[1] != undefined && item.ListaInfo[1].IsAlert
                ? 'filtro-alert'
                : 'discount'
            "
            ><span v-if="item.ListaInfo[1] != undefined"
              >{{
                Math.abs(item.ListaInfo[1].Sconto).toString().slice(0, 2)
              }}
              %</span
            ><span v-else class="unavailable"
              ><md-icon>remove</md-icon></span
            ></md-table-cell
          >
          <md-table-cell v-show="second_exist" class="stock is-dashboard"
            ><span
              v-if="
                item.ListaInfo[1] &&
                lista_items[index].ListaInfo[1].InStock == 'No'
              "
              ><md-icon class="no-status-item">cancel</md-icon></span
            ><span v-else></span
          ></md-table-cell>
          <!-- third retailer -->
          <md-table-cell
            v-show="third_exist"
            class="fix is-dashboard"
            :class="
              item.ListaInfo[2] != undefined && item.ListaInfo[2].IsAlert
                ? 'filtro-alert'
                : 'price'
            "
            ><span v-if="item.ListaInfo[2] != undefined"
              >{{ lista_items[index].ListaInfo[2].Prezzo }} €</span
            >
            <span v-else class="unavailable"
              ><md-icon>remove</md-icon></span
            ></md-table-cell
          >
          <md-table-cell
            v-show="third_exist"
            class="cheap is-dashboard"
            :class="
              item.ListaInfo[2] != undefined && item.ListaInfo[2].IsAlert
                ? 'filtro-alert'
                : 'discount'
            "
            ><span v-if="item.ListaInfo[2]"
              >{{
                Math.abs(item.ListaInfo[2].Sconto).toString().slice(0, 2)
              }}
              %</span
            ><span v-else class="unavailable"
              ><md-icon>remove</md-icon></span
            ></md-table-cell
          >
          <md-table-cell v-show="third_exist" class="stock is-dashboard"
            ><span
              v-if="
                item.ListaInfo[2] &&
                lista_items[index].ListaInfo[2].InStock == 'No'
              "
              ><md-icon class="no-status-item">cancel</md-icon></span
            ><span v-else></span
          ></md-table-cell>
          <!-- fourth retailer -->
          <md-table-cell
            v-show="fourth_exist"
            class="fix is-dashboard"
            :class="
              item.ListaInfo[3] != undefined && item.ListaInfo[3].IsAlert
                ? 'filtro-alert'
                : 'price'
            "
            ><span v-if="item.ListaInfo[3]"
              >{{ item.ListaInfo[3].Prezzo }} €</span
            >
            <span v-else class="unavailable"
              ><md-icon>remove</md-icon></span
            ></md-table-cell
          >
          <md-table-cell
            v-show="fourth_exist"
            class="cheap is-dashboard"
            :class="
              item.ListaInfo[3] != undefined && item.ListaInfo[3].IsAlert
                ? 'filtro-alert'
                : 'price'
            "
            ><span v-if="item.ListaInfo[3]"
              >{{
                Math.abs(item.ListaInfo[2].Sconto).toString().slice(0, 2)
              }}
              %</span
            ><span v-else class="unavailable"
              ><md-icon>remove</md-icon></span
            ></md-table-cell
          >
          <md-table-cell v-show="fourth_exist" class="stock is-dashboard"
            ><span v-if="item.ListaInfo[3] && item.ListaInfo[3].InStock == 'No'"
              ><md-icon class="no-status-item">cancel</md-icon></span
            ><span v-else></span
          ></md-table-cell>
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
</style>
