<template>
  <div class="md-layout">
    <div class="md-layout-item screen-container md-alignment-center-center">
      <img :src="url" alt="Screenshot" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Container",
  data() {
    return {};
  },
  computed: {
    url() {
      return this.$store.getters.currentScreen.UrlScreenshot;
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/style/screenshot.scss";
</style>
