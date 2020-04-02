<template>
  <div>
    <md-dialog
      @md-clicked-oustide="toggleScreenshot"
      :md-active.sync="screenshot"
    >
      <div class="md-layout">
        <div class="md-layout-item">
          <img :src="currentScreen.UrlImmagine" alt="Screenshot" />
        </div>
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

  data: () => ({}),
  methods: {
    toggleScreenshot() {
      this.$store.commit("toggle_screenshot");
    },
  },
  computed: {
    ...mapGetters({
      screenshotVisible: "screenshotVisible",
      currentScreen: "currentScreen",
    }),
    screenshot: {
      get() {
        return this.screenshotVisible;
      },
      set(newValue) {
        return newValue;
      },
    },
  },
};
</script>

<style lang="scss">
@import "src/assets/style/toolbar.scss";
</style>
