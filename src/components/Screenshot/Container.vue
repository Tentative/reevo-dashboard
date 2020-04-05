<template>
  <div class="md-layout">
    <div class="md-layout-item">
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
