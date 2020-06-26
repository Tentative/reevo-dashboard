<template>
  <div class="md-layout md-alignment-center-center">
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
      loading: false,
      loaded: false,
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
  methods: {},
};
</script>

<style lang="scss">
@import "src/assets/style/parametri.scss";
</style>
