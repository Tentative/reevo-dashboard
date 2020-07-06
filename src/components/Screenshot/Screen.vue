<template>
  <div>
    <md-dialog
      id="screenshot"
      :md-active.sync="screenshot"
      class="graph md-scrollbar"
      @md-clicked-outside="toggleScreenshot"
    >
      <Header />
      <md-divider></md-divider>

      <Container v-if="loaded" :loaded="loaded" :message="message" />
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
    loaded: false,
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
    async toggleScreenshot() {
      this.loading = true;
      this.loaded = false;
      try {
        const { res } = await this.$store.commit("clear_screenshot");
        this.loaded = true;
        this.loading = false;
      } catch (e) {
        this.loading = false;
        // console.log(e);
      }
    },
  },
};
</script>

<style lang="scss">
@import "src/assets/style/screenshot.scss";
</style>
