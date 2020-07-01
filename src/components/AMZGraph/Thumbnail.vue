<template>
  <div
    id="amzthumbnail"
    class="md-layout-item md-size-30 thumbnail screen-container"
  >
    <img :src="currentItem.UrlImmagine" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Thumbnail",
  computed: {
    ...mapGetters({
      currentItem: "currentItem",
    }),
    getBackground() {
      return (
        "background: url(" +
        this.currentItem.UrlImmagine +
        ");" +
        " " +
        "background-size: contain;" +
        "background-repeat: no-repeat;" +
        "background-position: center;"
      );
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/amzgraph.scss";
</style>
