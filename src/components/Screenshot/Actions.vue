<template>
  <md-dialog-actions class="screen-actions">
    <md-button
      v-show="attr != ''"
      class="md-dense md-raised md-primary apply-button"
      @click="saveFile"
      >Salva</md-button
    >
    <md-button
      v-show="attr != '' || Object.keys(currentScreen).length > 0"
      class="md-dense md-raised md-primary apply-button"
      :href="mail"
    >
      Invia Email</md-button
    >
    <md-button
      class="md-dense md-raised md-primary apply-button"
      @click="openProductPage"
      >Pagina Prodotto</md-button
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
    computedScreen() {
      return this.$store.getters.currentScreen.UrlScreenshot;
    },
    computedLink() {
      return this.$store.getters.currentScreen
        ? this.$store.getters.currentScreen.UrlItem
        : "#";
    },
    mail() {
      return (
        "mailto:@?subject=" +
        this.$store.getters.currentScreen.NomeItem +
        "&body=" +
        this.$store.getters.currentScreen.UrlScreenshot
      );
    },
  },
  created() {
    this.computedScreen;
  },
  methods: {
    openProductPage() {
      window.open(this.computedLink, "_blank");
    },
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
  },
};
</script>

<style lang="scss">
@import "src/assets/style/toolbar.scss";
</style>
