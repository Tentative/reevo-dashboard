<template>
  <div class="md-layout header md-gutter">
    <div class="md-layout-item screen-name">
      <span>{{ currentScreen.NomeItem }}</span>
    </div>
    <div class="md-layout-item screen-retailer">
      <span>{{ currentScreen.Retailer }}</span>
    </div>
    <div class="md-layout-item screen-date">
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
      let cDate = moment(this.currentScreen.Data).format("DD/MM/YYYY HH:MM");

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
