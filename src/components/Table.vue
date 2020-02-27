<template>
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
      <md-table-head class="filter">
        <el-button type="text" @click="dialogVisible = true"
          ><i class="fas fa-cog"></i
        ></el-button>
        <el-dialog
          class="filter-check"
          title="Select filters by:"
          :visible.sync="dialogVisible"
          width="40%"
          append-to-body
        >
          <div class="column">
            <h3>Price:</h3>
            <span v-html="priceMessage"></span>
            <el-checkbox
              v-model="amz.FiltroAlert"
              true-label="Si"
              false-label="Tutti"
            ></el-checkbox>
            <h3>Stock:</h3>
            <span v-html="stockMessage"></span>
            <el-checkbox
              v-model="amz.FiltroInStock"
              true-label="No"
              false-label="Tutti"
            ></el-checkbox>
          </div>
          <div class="column">
            <h3>Fast Track:</h3>
            <span v-html="ftMessage"></span>
            <el-checkbox
              v-model="amz.FiltroFastTrack"
              true-label="No"
              false-label="Tutti"
            ></el-checkbox>
            <h3>Buy Box:</h3>
            <span v-html="bbMessage"></span>
            <el-checkbox
              v-model="amz.FiltroBuyBox"
              true-label="No"
              false-label="Tutti"
            ></el-checkbox>
          </div>
          <div class="column">
            <h3>Negative Reviews:</h3>
            <span v-html="nrMessage"></span>
            <el-checkbox
              v-model="amz.FiltroNegativeReviews"
              true-label="SoloNegative"
              false-label="Tutti"
            ></el-checkbox>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button
              type="primary"
              @click="
                dialogVisible = false;
                amz_request();
              "
              >Apply Filters</el-button
            >
          </span>
        </el-dialog>
      </md-table-head>
    </md-table-row>
    <md-table-row v-for="(item, index) in items" :key="index">
      <md-table-cell class="thumb"
        ><img :src="item.UrlImmagine"
      /></md-table-cell>
      <md-table-cell class="item">
        <span>{{ item.NomeItem }} </span>
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
          ><i class="fas fa-times-circle"></i
        ></span>
        <span v-if="item.InStock == 'Limitata'"
          ><i class="fas fa-exclamation-triangle"></i
        ></span>
      </md-table-cell>
      <md-table-cell class="rank">
        <span>{{ item.SalesRank }}</span>
      </md-table-cell>
      <md-table-cell class="track">
        <span v-if="item.FastTrack == 'Oggi'">Oggi</span>
        <span v-if="item.FastTrack == 'Giorno_1'">1 Giorno</span>
        <span v-if="item.FastTrack == 'Si'"><i class="fas fa-check"></i></span>
        <span v-if="item.FastTrack == 'No'"
          ><i class="fas fa-times-circle"></i
        ></span>
      </md-table-cell>
      <md-table-cell class="buybox">
        <span v-if="item.IsBuyBox"><i class="fas fa-check"></i></span>
        <span v-else><i class="fas fa-times-circle"></i></span>
      </md-table-cell>
      <md-table-cell class="reviews">
        <span>{{ item.NegativeReviewsPercentuale }} %</span>
      </md-table-cell>
      <md-table-cell class="select_filter"></md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
export default {};
</script>

<style></style>
