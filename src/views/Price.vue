<template>
  <div>
    <div class="md-title">Price Graph</div>
  </div>
</template>

<script>
export default {
  name: "Price",
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
