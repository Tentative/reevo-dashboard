<template>
  <div>
    <Alerts v-if="router == 'Dashboard'" />
    <AmzGraph :graphParams="graphParams" :amzGraphVisible="amzGraphVisible" />
    <Screenshot :screenshotVisible="screenshotVisible" />
    <span class="md-title title">Dashboard</span>
    <md-table class="amz">
      <md-table-row>
        <md-table-head></md-table-head>
        <md-table-head class="name">
          Articolo
        </md-table-head>
        <md-table-head class="cost">
          Prezzo
        </md-table-head>
        <md-table-head class="cheap">
          Sconto
        </md-table-head>
        <md-table-head class="oos">
          Stock
        </md-table-head>
        <md-table-head class="rank">
          Sales Rank
        </md-table-head>
        <md-table-head class="track">
          Fast Track
        </md-table-head>
        <md-table-head class="buybox">
          Acquistabile
        </md-table-head>
        <md-table-head class="reviews">
          Recensioni Negative
        </md-table-head>
      </md-table-row>
      <md-table-row v-for="(item, index) in items" :key="index">
        <md-table-cell class="thumb"
          ><a @click="store.dispatch('amz_screenshot', item)"
            ><img :src="item.UrlImmagine"/></a
        ></md-table-cell>
        <md-table-cell class="item">
          <span
            ><a @click="store.dispatch('amz_screenshot', item)"
              >{{ item.NomeItem }}
            </a></span
          >
        </md-table-cell>
        <md-table-cell :class="item.IsAlert ? 'filtro-alert' : 'price'">
          <span
            ><a @click="store.dispatch('amz_graph', { item })"
              >{{ item.Prezzo }} €</a
            ></span
          >
        </md-table-cell>
        <md-table-cell :class="item.IsAlert ? 'filtro-alert' : 'discount'">
          <a @click="store.dispatch('amz_graph', { item })">
            <span v-if="item.Sconto != '0'">{{ item.Sconto }} %</span>
            <span v-else>/</span>
          </a>
        </md-table-cell>
        <md-table-cell class="stock">
          <span v-if="item.InStock == 'Si'">
            <md-icon class="ok-status">check</md-icon>
          </span>
          <span v-if="item.InStock == 'No'"
            ><md-icon class="no-status">cancel</md-icon></span
          >
          <span v-if="item.InStock == 'Limitata'"
            ><md-icon class="alert-status">warning</md-icon></span
          >
        </md-table-cell>
        <md-table-cell class="rank">
          <span>{{ item.SalesRank }}</span>
        </md-table-cell>
        <md-table-cell class="track">
          <span v-if="item.FastTrack == 'Oggi'">Oggi</span>
          <span v-if="item.FastTrack == 'Giorno_1'">1 Giorno</span>
          <span v-if="item.FastTrack == 'Si'"
            ><md-icon class="ok-status">check</md-icon></span
          >
          <span v-if="item.FastTrack == 'No'"
            ><md-icon class="no-status">cancel</md-icon></span
          >
        </md-table-cell>
        <md-table-cell class="buybox">
          <span v-if="item.IsBuyBox"
            ><md-icon class="ok-status">check</md-icon></span
          >
          <span v-else><md-icon class="no-status">cancel</md-icon></span>
        </md-table-cell>
        <md-table-cell class="reviews">
          <span>{{ item.NegativeReviewsPercentuale }} %</span>
        </md-table-cell>
        <md-table-cell class="select_filter"></md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Alerts, AmzGraph, Screenshot } from "@/components/AMZGraph";
export default {
  name: "Table",
  components: { Alerts, AmzGraph, Screenshot },
  data() {
    return {
      dialogVisible: false,
      loaded: false
      // amzGraphVisible: false
    };
  },
  method: {
    toggleAmzGraph() {
      this.$store.commit("toggle_amz_graph");
    },
    amzGraphClose() {
      this.amzGraphVisible = false;
    }
  },
  computed: {
    ...mapGetters({
      items: "items",
      amzdata: "amzdata",
      amz: "amz",
      amzGraphVisible: "amzGraphVisible",
      screenshotVisible: "screenshotVisible",
      graphParams: "graphParams"
    }),
    router() {
      return this.$route.name;
    },
    store() {
      return this.$store;
    },
    graphParams() {
      return this.$store.getters.graphParams;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/table.scss";
</style>
