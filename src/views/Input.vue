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
    <p>{{ message }}</p>
    <div class="md-title">Caricamento articoli:</div>
    <label>File</label>
    <form id="uploadForm" name="uploadForm" enctype="multipart/form-data">
      <input id="file" ref="file" type="file" @change="handleFileUpload" />
      <input type="button" value="Upload" @click="submitFile" />
    </form>

    <FilePond
      ref="pond"
      name="upload"
      :server="path"
      :files="filess"
      @init="handleFilePondInit"
      @change="handleFilePondInit"
    />

    <a href="http://data.reevo.io/reevoimport/template.xlsx"
      >Scarica Template</a
    >
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
      replace: false,
      file: null,
      isValid: null,
      message: "",
      path: `https://data.reevo.io/`,
      params: {
        NomeFile: "ALL MusicaT",
        Tipologia: "ALL",
      },
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
    },
    handleFilePondInit: function () {
      console.log("FilePond has initialized");
      this.$refs.pond.getFiles();

      // FilePond instance methods are available on `this.$refs.pond`
    },
    validate() {
      this.message = "";
      if (!this.add && !this.replace) {
        this.message = "selezionare almeno un opzione";
        return;
      }
      this.submitFile();
    },
    submitFile() {
      // const config = { headers: { "Content-Type": "multipart/form-data" } };
      // const data = new FormData(document.getElementById("uploadForm"));
      // var imagefile = document.querySelector("#file");
      // data.append("file", imagefile.files[0]);
      // console.log(imagefile);
      let nomeAzienda = this.nomeAzienda;
      // formData.append("file", this.file);
      // var EasyFtp = require("easy-ftp");
      // var ftp = new EasyFtp();
      // var config = {
      //   host: "data.reevo.io",
      //   port: 21,
      //   username: "FrontEnd",
      //   password: "Reevolacerba2020",
      //   type: "ftp",
      // };
      // ftp.connect(config);
      // ftp.upload(
      //   `${this.file}`,
      //   `/reevoimport/${nomeAzienda}/ALL ${nomeAzienda}`,
      //   function (err) {
      //     console.log(err);
      //   }
      // );

      //   if (this.add) {
      //     this.params.NomeFile = `ADD ${nomeAzienda}`;
      //     this.params.Tipologia = "ADD";
      //   } else if (this.replace) {
      //     this.params.NomeFile = `ALL ${nomeAzienda}`;
      //     this.params.Tipologia = "ALL";
      //   }
      const fd = new FormData();
      fd.append("file", this.file, this.file.name);
      axios
        .post(`/reevoimport/${nomeAzienda}/`, fd)
        .then((res) => {
          console.log(res);
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },
    input() {
      this.$store.dispatch("input_call");
    },
  },
};
</script>
