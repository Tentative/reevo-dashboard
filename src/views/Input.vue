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
    <label
      >File
      <input
        id="file"
        ref="file"
        type="file"
        accept=".xls, .xlsx"
        @change="handleFileUpload()"
      />
    </label>
    <FilePond :server="path" />
    <button @click="submitFile()">Submit</button>

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
      file: "",
      isValid: null,
      message: "",
      path: "http://data.reevo.io/",
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
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
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
      let formData = new FormData();
      let nomeAzienda = this.nomeAzienda;
      formData.append("file", this.file);
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

      console.log(this.params.NomeFile);
      let call = {
        CodiceClient: "reevolacerba2020",
        VersioneClient: "0.9.8",
        CodiceRichiesta: "Upload",
        Url: window.location.href,
        JsonRichiesta: JSON.stringify(this.params),
      };
      axios
        .post(`/reevoimport/${nomeAzienda}`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
          data: call,
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
