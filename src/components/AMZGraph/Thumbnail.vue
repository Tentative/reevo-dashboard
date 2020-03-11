<template>
  <div class="md-layout-item">
    <img :src="currentItem.UrlImmagine" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Thumbnail",
  computed: {
    ...mapGetters({
      currentItem: "currentItem"
    })
  }
};
</script>

<style></style>
