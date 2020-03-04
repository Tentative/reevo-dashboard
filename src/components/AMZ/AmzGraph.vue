<template>
  <div>
    <md-dialog :md-active.sync="amzgraphVisible">
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
        <md-button class="md-primary" @click="graphClose">Close</md-button>
        <md-button class="md-primary" @click="graphClose">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "AmzGraph",
  props: {
    amzGraphVisible: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    amzGraphVisible: false
  }),
  methods: {
    saveDialog() {
      let amz = this.amz;
      this.showDialog = false;
      this.$store.dispatch("amz_request", { amz });
    },
    graphClose() {
      this.amzGraphVisible = false;
      // this.$emit("close-graph");
    }
  },
  computed: {
    amzgraphVisible() {
      return this.amzGraphVisible;
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/style/toolbar.scss";
</style>
