<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <img :src="currentScreen.UrlImmagine" alt="Screenshot" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Container",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      currentScreen: "currentScreen",
    }),
  },
};
</script>
