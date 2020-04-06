<template>
  <div class="md-layout">
    <div class="md-layout-item screen-container md-alignment-center-center">
      <img v-if="url" :src="url" alt="Screenshot" />
      <h1 v-if="url == null">{{ message }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Container",
  props: {
    message: {
      type: String,
      required: true,
    },
  },
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
