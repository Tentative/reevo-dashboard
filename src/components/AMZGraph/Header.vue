<template>
  <div class="md-layout  md-alignment-center-right header ">
    <div class="md-layout-item item-name md-size-60">
      <span>{{ currentItem.NomeItem }}</span>
    </div>
    <div class="md-layout-item item-date">
      <span class="item-update"
        >Aggiornato al {{ currentItem.UltimaData }}</span
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapGetters({
      currentItem: "currentItem"
    })
  }
};
</script>

<style lang="scss">
@import "src/assets/style/header.scss";
</style>
