<template>
  <div class="md-title">
    Main
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {};
  },
  created() {
    this.main_call();
  },
  methods: {
    main_call() {
      this.$store.dispatch("main_call");
    },
  },
};
</script>
