<template>
  <div>
    <md-dialog :md-active.sync="showAmzGraph">
      <md-dialog-title>Preferences</md-dialog-title>

      <md-tabs md-dynamic-height>
        <md-tab md-label="General">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
            mollitia dolorum dolores quae commodi impedit possimus qui, atque at
            voluptates cupiditate. Neque quae culpa suscipit praesentium
            inventore ducimus ipsa aut.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
            mollitia dolorum dolores quae commodi impedit possimus qui, atque at
            voluptates cupiditate. Neque quae culpa suscipit praesentium
            inventore ducimus ipsa aut.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
            mollitia dolorum dolores quae commodi impedit possimus qui, atque at
            voluptates cupiditate. Neque quae culpa suscipit praesentium
            inventore ducimus ipsa aut.
          </p>
        </md-tab>

        <md-tab md-label="Activity">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
            mollitia dolorum dolores quae commodi impedit possimus qui, atque at
            voluptates cupiditate. Neque quae culpa suscipit praesentium
            inventore ducimus ipsa aut.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
            mollitia dolorum dolores quae commodi impedit possimus qui, atque at
            voluptates cupiditate. Neque quae culpa suscipit praesentium
            inventore ducimus ipsa aut.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
            mollitia dolorum dolores quae commodi impedit possimus qui, atque at
            voluptates cupiditate. Neque quae culpa suscipit praesentium
            inventore ducimus ipsa aut.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
            mollitia dolorum dolores quae commodi impedit possimus qui, atque at
            voluptates cupiditate. Neque quae culpa suscipit praesentium
            inventore ducimus ipsa aut.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
            mollitia dolorum dolores quae commodi impedit possimus qui, atque at
            voluptates cupiditate. Neque quae culpa suscipit praesentium
            inventore ducimus ipsa aut.
          </p>
        </md-tab>

        <md-tab md-label="Account">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
            mollitia dolorum dolores quae commodi impedit possimus qui, atque at
            voluptates cupiditate. Neque quae culpa suscipit praesentium
            inventore ducimus ipsa aut.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
            mollitia dolorum dolores quae commodi impedit possimus qui, atque at
            voluptates cupiditate. Neque quae culpa suscipit praesentium
            inventore ducimus ipsa aut.
          </p>
        </md-tab>
      </md-tabs>

      <md-dialog-actions>
        <md-button class="md-primary" @click="toggleAmzGraph">Close</md-button>
        <md-button class="md-primary">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "AmzGraph",

  data: () => ({
    amzGraphVisible: false
  }),
  methods: {
    saveDialog() {
      let amz = this.amz;
      this.showDialog = false;
      this.$store.dispatch("amz_request", { amz });
    },
    toggleAmzGraph() {
      this.$store.commit("toggle_amz_graph");
    }
  },
  computed: {
    showAmzGraph() {
      return this.$store.getters.amzGraphVisible;
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/style/toolbar.scss";
</style>
