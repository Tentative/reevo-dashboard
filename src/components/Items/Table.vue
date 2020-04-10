<template>
  <div>
    <md-table class="items-dashboard">
      <md-table-row>
        <md-table-head></md-table-head>
        <md-table-head>Articolo</md-table-head>
        <md-table-head
          v-for="(item, index) in table_items.ListaRetailers"
          :key="index"
          colspan="3"
          >{{ item }}</md-table-head
        >
      </md-table-row>
      <md-table-row> </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Table",
  data() {
    return {
      retailers: [],
    };
  },

  computed: {
    ...mapGetters({
      table_items: "table_items",
      lista_items: "lista_items",
    }),
  },
  beforeCreate() {
    this.retailer;
  },
  methods: {
    retailer() {
      let retailers = this.table_items.ListaRetailers;
      for (let retailer in retailers) {
        this.retailers.push(retailer);
      }
    },
  },
};
</script>
