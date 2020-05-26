<template>
  <div>
    <div>
      <div class="md-title">Gestione articoli</div>
    </div>

    <div class="md-title">Tipologia di caricamento:</div>
    <md-checkbox v-model="add">Aggiungi alla mia lista di articoli</md-checkbox>
    <md-checkbox v-model="replace"
      >Sostituisci la mia lista con gli articoli caricati</md-checkbox
    >
    <div class="md-title">Caricamento articoli:</div>
    <label
      >File
      <input id="file" ref="file" type="file" @change="handleFileUpload()" />
    </label>
    <button @click="submitFile()">Submit</button>
    <a href="http://data.reevo.io/reevoimport/template.xlsx"
      >Scarica Template</a
    >

    <div class="md-button" @click="upload">Carica</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Input",
  data() {
    return {
      add: false,
      replace: false,
      file: "",
    };
  },
  created() {
    this.input();
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      let formData = new FormData();
      formData.append("file", this.file);
      axios
        .post("/ReevoImport/MMMusica/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          // console.log("SUCCESS!!");
        })
        .catch(function () {
          // console.log("FAILURE!!");
        });
    },
    input() {
      this.$store.dispatch("input_call");
    },
  },
};
</script>
