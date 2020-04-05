<template>
  <div class="md-layout md-alignment-center-right header">
    <div class="md-layout-item screen-name md-size-60">
      <span>{{ currentScreen.NomeItem }}</span>
    </div>
    <div class="md-layout-item">
      <span>{{ currentScreen.Retailer }}</span>
    </div>
    <div class="md-layout-item">
      <span>{{ computedDate }}</span>
    </div>

    <div class="md-layout-item item-date">
      <md-dialog-actions>
        <md-button class="md-button" @click="toggleScreenshot"
          ><md-icon>close</md-icon></md-button
        >
      </md-dialog-actions>
    </div>

    <!-- div class="md-layout-item item-date">
      <span class="item-update"
        >Aggiornato al {{ currentItem.UltimaData }}</span
     >
    </div -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "Header",
  computed: {
    ...mapGetters({
      currentItem: "currentItem",
      currentScreen: "currentScreen",
      amzGraphVisible: "amzGraphVisible",
    }),
    computedDate() {
      moment.locale("IT");
      let cDate = moment(this.currentScreen.Data).format("DD MMMM YYYY HH:MM");

      return cDate;
    },
  },
  methods: {
    toggleScreenshot() {
      this.$store.commit("toggle_screenshot");
    },
  },
};
</script>

<style lang="scss">
@import "src/assets/style/header.scss";
</style>
