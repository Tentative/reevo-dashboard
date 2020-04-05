<template>
  <div>
    <md-dialog
      @md-clicked-oustide="toggleScreenshot"
      :md-active.sync="screenshot"
      class="graph"
    >
      <Header />
      <Container />
      <Actions />
    </md-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Header, Container, Actions } from "@/components/Screenshot/";
export default {
  name: "Screenshot",
  components: { Header, Container, Actions },
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
