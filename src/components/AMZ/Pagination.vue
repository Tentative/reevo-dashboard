<template>
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :pager-count="5"
      :page-size.sync="pagination.itemsPerPage"
      :page-count="pagination.totalPages"
      :current-page.sync="pagination.currentPage"
      :total="pagination.totalPages"
      @prev-click="prevPage()"
      @next-click="nextPage()"
      @current-change="onChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Paginate",
  props: {
    value: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      pagination: {
        currentPage: this.value.currentPage,
        totalPages: this.value.totalPages,
        itemsPerPage: this.value.itemsPerPage,
      },
    };
  },
  watch: {
    pagination: {
      deep: true,
      handler(v) {
        this.$emit("change-page", v);
      },
    },
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters({
      amzdata: "amzdata",
      itemsPerPage: "itemsPerPage",
      thisPage: "thisPage",
    }),
  },
  methods: {
    onChange(v) {
      this.pagination.currentPage = v;
    },
    nextPage() {
      if (this.pagination.currentPage !== this.pagination.totalPages) {
        this.pagination.currentPage++;
      }
    },
    prevPage() {
      if (this.pagination.currentPage !== 1) this.pagination.currentPage--;
    },
  }
};
</script>

<style lang="scss">
@import "@/assets/style/pagination.scss";
</style>
