<template>
  <div>
    <md-dialog :md-active.sync="showAmzGraph">
      <div class="md-layout ">
        <div class="md-layout-item md-size-15 thumb-md">
          <img :src="currentItem.UrlImmagine" />
        </div>
        <div class="md-layout-item md-size-15 thumb-md"></div>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="toggleAmzGraph">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "AmzGraph",

  data: () => ({
    amzGraphVisible: false
  }),
  methods: {
    saveDialog() {
      let amz = this.amz;
      this.showDialog = false;
      this.$store.dispatch("amz_request", { amz });
    },
    toggleAmzGraph() {
      this.$store.commit("toggle_amz_graph");
    }
  },
  computed: {
    showAmzGraph() {
      return this.$store.getters.amzGraphVisible;
    },
    currentItem() {
      return this.$store.getters.currentItem;
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/style/toolbar.scss";
</style>
