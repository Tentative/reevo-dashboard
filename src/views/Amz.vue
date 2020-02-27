<template>
  <div class="md-alignment-center-center">
    <Table :items="items" :amzdata="amzdata" :loading="loading" />
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import { mapGetters } from "vuex";
export default {
  name: "Amz",
  components: { Table },
  created() {
    this.table_request();
  },
  data() {
    return {
      items: [],
      amzdata: {},
      loading: false
    };
  },
  computed: {
    ...mapGetters({
      amz: "amz"
    })
  },
  methods: {
    table_request() {
      this.loading = true;
      let amz = amz;
      this.$store
        .dispatch("amz_request", {
          amz
        })
        .then(res => {
          this.loading = false;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style></style>
