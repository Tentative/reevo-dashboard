<template>
  <div>
    <div class="md-title">Price Graph</div>
    <spinner />
    <LineChart :chartdata="chartdata" :options="options"></LineChart>
  </div>
</template>

<script>
import { LineChart, spinner } from "@/components/PriceGraph";
export default {
  name: "Price",
  components: { LineChart, spinner },

  data() {
    return {};
  },

  created() {
    this.prc_call();
  },
  methods: {
    prc_call() {
      this.$store.dispatch("prc_call");
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/style/price.scss";
</style>
