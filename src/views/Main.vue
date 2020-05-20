<template>
  <div>
    <div class="alert-wrapper">
      <div class="md-title">
        Main
      </div>
    </div>

    <md-dialog
      :md-active.sync="loading"
      class="graph md-scrollbar loading"
      :md-backdrop="false"
    >
      <spinner />
    </md-dialog>
    <Tables :maindata="maindata" />
    <div class="sub-wrapper md-layout md-gutter">
      <div class="md-layout-item">
        <span>Andamento Prezzi Retailers</span>
      </div>
    </div>
    <LineChart
      v-if="loaded"
      :chartdata.sync="maindata_graph"
      :options.sync="mainoptions"
      style="width: 100%; margin-top: 20px;"
    ></LineChart>
    <div class="sub-wrapper md-layout md-gutter">
      <div class="md-layout-item">
        <span>Distribuzione Articoli</span>
      </div>
    </div>
    <Table :maindata="maindata" />
  </div>
</template>

<script>
import { Tables, spinner, LineChart, Table } from "@/components/Main";
import { mapGetters } from "vuex";
export default {
  name: "Main",
  components: {
    Tables,
    spinner,
    LineChart,
    Table,
  },

  data() {
    return {
      loading: false,
      loaded: false,
      main: {
        Categoria: "null",
      },
    };
  },
  computed: {
    ...mapGetters({
      maindata: "maindata",
      mainoptions: "mainoptions",
      maindata_graph: "maindata_graph",
    }),
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
