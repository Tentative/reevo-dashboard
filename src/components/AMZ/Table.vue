<template>
  <div>
    <Alerts v-if="router == 'Dashboard'" />
    <AmzGraph :showGraph="showDialog" :md-active.sync="showGraph" />
    <md-table class="amz">
      <md-table-row>
        <md-table-head></md-table-head>
        <md-table-head class="name">
          Name
        </md-table-head>
        <md-table-head class="cost">
          AMZ Price
        </md-table-head>
        <md-table-head class="cheap">
          Discount
        </md-table-head>
        <md-table-head class="oos">
          In stock
        </md-table-head>
        <md-table-head class="rank">
          Rank
        </md-table-head>
        <md-table-head class="track">
          FT
        </md-table-head>
        <md-table-head class="buybox">
          BB
        </md-table-head>
        <md-table-head class="reviews">
          Neg. reviews
        </md-table-head>
      </md-table-row>
      <md-table-row v-for="(item, index) in items" :key="index">
        <md-table-cell class="thumb"
          ><img :src="item.UrlImmagine"
        /></md-table-cell>
        <md-table-cell class="item">
          <span
            ><a @click="showGraph = true">{{ item.NomeItem }} </a></span
          >
        </md-table-cell>
        <md-table-cell :class="item.IsAlert ? 'filtro-alert' : 'price'">
          <span>{{ item.Prezzo }} €</span>
        </md-table-cell>
        <md-table-cell :class="item.IsAlert ? 'filtro-alert' : 'discount'">
          <span v-if="item.Sconto != '0'">{{ item.Sconto }} %</span>
          <span v-else>/</span>
        </md-table-cell>
        <md-table-cell class="stock">
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
import { Alerts, AmzGraph } from "@/components/AMZ";
export default {
  name: "Table",
  components: { Alerts, AmzGraph },
  data() {
    return {
      dialogVisible: false
    };
  },
  computed: {
    ...mapGetters({
      items: "items",
      amzdata: "amzdata",
      amz: "amz"
    }),
    router() {
      return this.$route.name;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/table.scss";
</style>
