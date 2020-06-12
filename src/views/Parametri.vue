<template>
  <div class="md-layout md-alignment-center-center">
    <div class="md-layout-item">
      <Form />
    </div>
  </div>
</template>

<script>
import { Form } from "@/components/Parametri/";
export default {
  name: "Parametri",
  components: {
    Form,
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
