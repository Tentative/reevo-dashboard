<template>
  <div>
    <md-table class="amz">
      <md-table-row>
        <md-table-head></md-table-head>
        <md-table-head class="name">Articolo</md-table-head>
        <md-table-head
          v-for="(item, index) in table_items.ListaRetailers"
          :key="index"
          colspan="3"
        >
          <span v-if="index <= '3'">{{ item }}</span></md-table-head
        >
      </md-table-row>
      <md-table-row v-for="(item, index) in lista_items" :key="index"
        ><md-table-cell class="thumb"
          ><a><img :src="item.UrlImmagine" /></a></md-table-cell
        ><md-table-cell class="item"
          ><span>{{ item.NomeItem }}</span></md-table-cell
        ><md-table-cell class="prezzo fix"
          ><span v-if="index < lista_items.length">{{
            lista_items[index].ListaInfo[0].Prezzo
          }}</span>
          <span v-else>/</span></md-table-cell
        ></md-table-row
      >
    </md-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Table",
  data() {
    return {
      // retailers: [],
    };
  },

  computed: {
    ...mapGetters({
      table_items: "table_items",
      lista_items: "lista_items",
      retailers: "retailers",
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
<style lang="scss">
@import "@/assets/style/toolbar.scss";
@import "@/assets/style/table.scss";
</style>
