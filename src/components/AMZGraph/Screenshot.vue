<template>
  <div>
    <md-dialog
      @md-clicked-oustide="toggleScreenshot"
      :md-active.sync="screenshot"
    >
      <Header />
      <Container />

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
import { Header, Container } from "@/components/Screenshot/";
// import Container from "@components/Screenshot/Container.vue";
export default {
  name: "Screenshot",
  components: { Header, Container },
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
      src: {
        get() {
          return this.currentScreen.UrlScreenshot;
        },
        set(newValue) {
          return newValue;
        },
      },
    },
  },
};
</script>

<style lang="scss">
@import "src/assets/style/screenshot.scss";
</style>
