<template>
  <div class="loading-price">
    <div class="loading-overlay">
      <md-progress-spinner
        md-mode="indeterminate"
        :md-stroke="2"
      ></md-progress-spinner>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Spinner",
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
