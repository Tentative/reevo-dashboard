<template>
  <div class="md-layout md-gutter header">
    <div class="md-layout-item screen-name">
      <span>{{ currentItem.NomeItem }}</span>
    </div>

    <div class="md-layout-item item-date">
      <md-dialog-actions>
        <md-button class="md-button" @click="toggleAmzGraph"
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
  computed: {
    ...mapGetters({
      currentItem: "currentItem",
      amzGraphVisible: "amzGraphVisible",
    }),
    computedDate() {
      moment.locale("IT");
      let cDate = moment(this.currentItem.UltimaData).format(
        "DD/MM/YYYY HH:MM"
      );
      return cDate;
    },
  },
  methods: {
    toggleAmzGraph() {
      this.$store.commit("toggle_amz_graph");
    },
  },
};
</script>

<style lang="scss">
@import "src/assets/style/header.scss";
</style>
