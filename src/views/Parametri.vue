<template>
  <div class="md-layout md-alignment-center-center">
    <md-dialog
      :md-active.sync="loading"
      class="graph md-scrollbar loading"
      :md-backdrop="false"
    >
      <spinner />
    </md-dialog>
    <div class="md-layout-item">
      <Form />
    </div>
  </div>
</template>

<script>
import { Form, spinner } from "@/components/Parametri/";
export default {
  name: "Parametri",
  components: {
    Form,
    spinner,
  },
  data() {
    return {
      parametri: {
        ArticoliTOP: "",
        Prezzo1: "",
        Prezzo2: "",
        SR1: "",
        SR2: "",
        ListPriceUP: "",
        ListPriceDOWN: "",
        PriceVariation: "",
        TopAlertItems: "",
        TopInStockItems: "",
      },
    };
  },
  created() {
    this.parametri_call();
  },
  methods: {
    parametri_call() {
      this.$store.dispatch("parametri_call");
    },
  },
};
</script>

<style lang="scss">
@import "src/assets/style/parametri.scss";
</style>
