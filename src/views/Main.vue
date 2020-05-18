<template>
  <div class="container">
    <div class="md-title">
      Main
    </div>
    <Table />
  </div>
</template>

<script>
import { Table } from "@/components/Main";
export default {
  name: "Main",
  components: {
    Table,
  },
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

<style lang="scss">
@import "@/assets/style/main.scss";
</style>
