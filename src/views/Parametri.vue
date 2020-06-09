<template>
  <div class="md-title">
    Parametri
  </div>
</template>

<script>
export default {
  name: "Parametri",
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
