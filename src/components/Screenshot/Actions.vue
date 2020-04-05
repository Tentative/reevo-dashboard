<template>
  <md-dialog-actions class="screen-actions">
    <md-button class="md-dense md-raised md-primary" @click="saveFile"
      >Salva</md-button
    >
  </md-dialog-actions>
</template>
<script>
import axios from "axios";
export default {
  name: "Actions",
  computed: {
    attr() {
      return this.$store.getters.currentScreen.UrlScreenshot;
    },
    name() {
      return this.$store.getters.currentScreen.NomeItem;
    },
  },
  methods: {
    saveFile() {
      axios({
        url: this.attr,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", this.name + ".jpg"); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    },
    itemName() {
      return this.$store.getters.currentScreen.NomeItem;
    },
  },
};
</script>
