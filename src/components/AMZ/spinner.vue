<template>
  <div class="loading-price">
    <div class="loading-overlay">
      <md-progress-bar md-mode="indeterminate"></md-progress-bar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // eslint-disable-next-line vue/name-property-casing
  name: "spinner",
  computed: {
    ...mapGetters({
      status: "status",
    }),
  },
};
</script>

<style lang="scss">
@import "@/assets/style/spinner.scss";
</style>
