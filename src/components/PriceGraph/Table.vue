<template>
  <div>
    <md-table class="amz">
      <md-table-row v-for="retailer of listaRetailers" :key="retailer.id">
        <md-table-head>{{ retailer }}</md-table-head>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    listaRetailers: {
      type: Array,
      required: true,
    },
  },
};
</script>
