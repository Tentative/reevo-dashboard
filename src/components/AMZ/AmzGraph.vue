<template>
  <div>
    <md-dialog :md-active.sync="graph">
      <div class="md-layout ">
        <div class="md-layout-item md-size-15 thumb-md">
          <img :src="currentItem.UrlImmagine" />
        </div>
        <AmzChart :graphRes="graphRes" :currentItem="currentItem" />
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="toggleAmzGraph">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import AmzChart from "@/components/AMZ/AmzChart.vue";
import { mapGetters } from "vuex";
export default {
  name: "AmzGraph",

  components: { AmzChart },
  data: () => ({}),
  methods: {
    toggleAmzGraph() {
      this.$store.commit("toggle_amz_graph");
    }
  },
  computed: {
    ...mapGetters({
      amzGraphVisible: "amzGraphVisible"
    }),
    graph: {
      get() {
        return this.amzGraphVisible;
      },
      set(newValue) {
        return newValue;
      }
    },
    currentItem() {
      return this.$store.getters.currentItem;
    },
    graphRes() {
      return this.$store.getters.graphRes;
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/style/toolbar.scss";
</style>
