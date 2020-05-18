<template>
  <div>
    <div class="md-title">
      Main
    </div>
    <md-dialog
      :md-active.sync="loading"
      class="graph md-scrollbar loading"
      :md-backdrop="false"
    >
      <spinner />
    </md-dialog>
    <Table />
  </div>
</template>

<script>
import { Table, spinner } from "@/components/Main";
export default {
  name: "Main",
  components: {
    Table,
    spinner,
  },
  data() {
    return {
      loading: false,
      main: {
        Categoria: "null",
      },
      maindata: {},
    };
  },
  async mounted() {
    this.main_call();
  },
  methods: {
    async main_call() {
      this.loading = true;
      this.loaded = false;
      let main = this.main;
      try {
        const { res } = await this.$store.dispatch("main_call", { main });
        this.maindata = res;
        this.loaded = true;
        this.loading = false;
      } catch (e) {
        this.loading = false;
        // console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/main.scss";
</style>
