<template>
  <div>
    <md-dialog
      @md-clicked-oustide="toggleScreenshot"
      :md-active.sync="screenshot"
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
import { mapGetters } from "vuex";
export default {
  name: "Screenshot",

  data: () => ({
    // screenshotVisible: false
  }),
  methods: {
    toggleScreenshot() {
      this.$store.commit("toggle_screenshot");
    }
  },
  computed: {
    ...mapGetters({
      screenshotVisible: "screenshotVisible",
      currentItem: "currentItem"
    }),
    screenshot: {
      get() {
        return this.screenshotVisible;
      },
      set(newValue) {
        return newValue;
      }
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/style/toolbar.scss";
</style>
