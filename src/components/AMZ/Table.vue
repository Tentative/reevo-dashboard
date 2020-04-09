<template>
  <div>
    <AmzGraph
      :graph-params="graphParams"
      :amz-graph-visible="amzGraphVisible"
    />
    <Screen :screenshot-visible="screenshotVisible" />
    <div class="alert-wrapper">
      <span class="md-title title">Amazon Dashboard</span>
      <Alerts v-if="router == 'Dashboard' || 'Amz'" />
    </div>
    <md-table class="amz">
      <md-table-row>
        <md-table-head></md-table-head>
        <md-table-head class="name">
          Articolo
        </md-table-head>
        <md-table-head class="cost">
          Prezzo
        </md-table-head>
        <md-table-head class="cheap fix">
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
        <md-table-cell
          class="thumb"
          @click.native="store.dispatch('amz_screenshot', item)"
          ><a><img :src="item.UrlImmagine" /></a
        ></md-table-cell>
        <md-table-cell
          class="item"
          @click.native="store.dispatch('amz_screenshot', item)"
        >
          <a
            ><span>{{ item.NomeItem }} </span>
          </a>
        </md-table-cell>
        <md-table-cell
          class="prezzo fix"
          :class="item.IsAlert ? 'filtro-alert' : 'price'"
          @click.native="store.dispatch('amz_graph', { item })"
        >
          <span
            ><a>{{ item.Prezzo }} €</a></span
          >
        </md-table-cell>
        <md-table-cell
          class="fix"
          :class="item.IsAlert ? 'filtro-alert' : 'discount'"
          @click.native="store.dispatch('amz_graph', { item })"
        >
          <a>
            <span v-if="item.Sconto != '0'">{{ item.Sconto }} %</span>
            <span v-else class="discount">/</span>
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
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Alerts, AmzGraph } from "@/components/AMZGraph";
import Screen from "@/components/Screenshot/Screen.vue";
export default {
  name: "Table",
  components: { Alerts, AmzGraph, Screen },
  data() {
    return {
      dialogVisible: false,
      loaded: false,
      // amzGraphVisible: false
    };
  },
  method: {
    toggleAmzGraph() {
      this.$store.commit("toggle_amz_graph");
    },
    amzGraphClose() {
      this.amzGraphVisible = false;
    },
  },
  computed: {
    ...mapGetters({
      items: "items",
      amzdata: "amzdata",
      amz: "amz",
      amzGraphVisible: "amzGraphVisible",
      screenshotVisible: "screenshotVisible",
      graphParams: "graphParams",
    }),
    router() {
      return this.$route.name;
    },
    store() {
      return this.$store;
    },
    graphParams() {
      return this.$store.getters.graphParams;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/table.scss";
@import "src/assets/style/toolbar.scss";
</style>
