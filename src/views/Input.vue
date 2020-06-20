<template>
  <div>
    <div class="alert-wrapper">
      <div class="md-title">Gestione articoli</div>
    </div>
    <div class="alert-wrapper">
      <div class="md-subheading">Tipologia di caricamento:</div>
    </div>
    <div class="alert-wrapper">
      <md-checkbox v-model="add" class="md-primary" :disabled="all"
        >Aggiungi alla mia lista di articoli</md-checkbox
      >
      <md-checkbox v-model="all" class="md-primary" :disabled="add"
        >Sostituisci la mia lista con gli articoli caricati</md-checkbox
      >
      <p class="md-error">{{ message }}</p>
    </div>
    <div class="md-layout">
      <div class="md-layout-item">
        <div class="alert-wrapper">
          <div class="md-subheading">Caricamento articoli:</div>
        </div>
      </div>
    </div>
    <form
      class="md-layout"
      id="uploadForm"
      name="uploadForm"
      enctype="multipart/form-data"
    >
      <md-field class="md-layout-item md-size-50">
        <md-file id="file" ref="file" type="file" @change="handleFileUpload" />
        <label id="select" for="file"
          >Seleziona il file con la lista dei tuoi articoli
        </label>
      </md-field>
    </form>
    <p>
      oppure
      <a href="http://data.reevo.io/reevoimport/template.xlsx"
        >Scarica il Template</a
      >
    </p>

    <input type="button" value="Upload" @click="submitFile" />

    <!-- FilePond
      ref="pond"
      name="upload"
      :server="path"
      :files="filess"
      @init="handleFilePondInit"
      @change="handleFilePondInit"
    / -->
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "Input",
  data() {
    return {
      add: false,
      all: false,
      file: null,
      isValid: null,
      message: "",
      path: `https://data.reevo.io/`,
    };
  },
  computed: {
    ...mapGetters({
      nomeAzienda: "nomeAzienda",
      linkFile: "linkFile",
    }),
  },
  created() {
    this.input();
  },

  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];

      console.log(this.file.name);
    },

    submitFile() {
      if (!this.all && !this.add) {
        this.message = "Selezionare almeno un opzione";
        return;
      } else if (this.file == null) {
        this.message = "Selezionare un file";
        return;
      } else {
        let nomeAzienda = this.nomeAzienda;

        const fd = new FormData();
        let name = this.all
          ? (name = "ALL" + " " + nomeAzienda)
          : this.add
          ? (name = "ADD" + " " + nomeAzienda)
          : "";
        let extension = this.file.name.split(".").pop();
        console.log(extension);
        fd.append("file", this.file, name + "." + extension);
        console.log(this.file);
        console.log(fd.get("file"));
        let params = {
          CodiceClient: "reevolacerba2020",
          CodiceRichiesta: "Upload",
          VersioneClient: "0.9.8",
          Url: window.location.href,
          JsonRichiesta: JSON.stringify({
            NomeFile: name + "." + extension,
            Tipologia: this.all ? "ALL" : "ADD",
          }),
        };

        // axios({
        //   url: `/reevoimport/${nomeAzienda}/`,
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        //   params: JSON.stringify(params),
        //   data: fd,
        // })
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch(function () {
        //     console.log("FAILURE!!");
        //   });
        axios({
          url: "/upload.aspx",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: fd,
        })
          .then((res) => {
            axios({
              url: "/",
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              params: JSON.stringify(params),
            })
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                console.log(err);
              });
            console.log(res);
          })
          .catch(function () {
            console.log("fail");
          });
        this.message = "";
      }
    },
    input() {
      this.$store.dispatch("input_call");
    },
  },
};
</script>

<style lang="scss">
@import "src/assets/style/input.scss";
</style>
