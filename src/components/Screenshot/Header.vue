<template>
  <div class="md-layout header md-gutter">
    <div class="md-layout-item screen-name">
      <span>{{ nomeItem }}</span>
      <md-tooltip md-direction="bottom">{{ nomeItem }}</md-tooltip>
    </div>
    <div class="md-layout-item screen-retailer" :style="visible">
      <span>{{ retailer }}</span>
    </div>
    <div class="md-layout-item screen-date" :style="visible">
      <span>{{ date }}</span>
    </div>

    <div class="md-layout-item item-date">
      <md-dialog-actions>
        <md-button class="md-button" @click="toggleScreenshot"
          ><md-icon>close</md-icon></md-button
        >
      </md-dialog-actions>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "Header",
  created() {
    this.computedScreen();
  },
  data() {
    return {
      retailer: "",
      date: "",
      nomeItem: "",
      visible: "",
    };
  },
  computed: {
    ...mapGetters({
      currentScreenItem: "currentScreenItem",
      currentScreen: "currentScreen",
      amzGraphVisible: "amzGraphVisible",
    }),
  },
  methods: {
    toggleScreenshot() {
      this.$store.commit("clear_screenshot");
    },
    computedScreen() {
      if (Object.keys(this.currentScreen).length != 0) {
        console.log("screen");
        this.nomeItem = this.currentScreen.NomeItem;
        this.retailer = this.currentScreen.Retailer;
        moment.locale("IT");
        let cDate = moment(this.currentScreen.Data).format("DD/MM/YYYY HH:MM");
        this.date = cDate;
        this.visible = "display:inline-block";
      } else {
        this.nomeItem = this.currentScreenItem.NomeItem;
        this.retailer = null;
        this.date = null;
        this.visible = "display:none";
      }
    },
    // computedDate() {
    //   if (Object.keys(this.currentScreen).length != 0) {

    //   } else {
    //     return null;
    //   }
    // },
  },
};
</script>

<style lang="scss">
@import "src/assets/style/header.scss";
</style>
