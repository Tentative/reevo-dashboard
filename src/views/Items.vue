<template>
  <div class="md-alignment-center-center">
    <Table />
    <Pagination />
    <Jumper />
  </div>
</template>

<script>
import { Table } from "@/components/Items/Table.vue";
export default {
  name: "Items",
  components: { Table },
  data() {
    return {};
  },
};
</script>
