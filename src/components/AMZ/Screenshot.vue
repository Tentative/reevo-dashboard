<template>
  <div>
    <md-dialog
      :md-active.sync="screenshotVisible"
      @md-clicked-oustide="toggleScreenshot"
    >
      <div class="md-layout ">
        <div class="md-layout-item ">
          <img :src="currentItem.UrlImmagine" style="width: 30%" />
        </div>
        <span> screenshot </span>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="toggleScreenshot"
          >Close</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "Screenshot",
  props: {
    screenshotVisible: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    screenshotVisible: false
  }),
  methods: {
    toggleScreenshot() {
      this.$store.commit("toggle_screenshot");
    }
  },
  computed: {
    showAmzGraph() {
      return this.$store.getters.screenshotVisible;
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
