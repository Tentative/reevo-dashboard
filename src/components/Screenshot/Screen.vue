<template>
  <div>
    <md-dialog
      :md-active.sync="screenshot"
      class="graph md-scrollbar"
      @md-clicked-outside="toggleScreenshot"
    >
      <Header />
      <md-divider></md-divider>
      <Container :message="message" />
      <md-divider></md-divider>
      <Actions :message="message" />
    </md-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Header, Container, Actions } from "@/components/Screenshot/";
export default {
  name: "Screenshot",
  components: { Header, Container, Actions },
  data: () => ({
    message: "Screenshot non disponibile",
  }),
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
  methods: {
    toggleScreenshot() {
      this.$store.commit("clear_screenshot");
    },
  },
};
</script>

<style lang="scss">
@import "src/assets/style/screenshot.scss";
</style>
