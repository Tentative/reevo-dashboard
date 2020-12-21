<template>
  <div>
    <div class="alert-wrapper">
      <div class="md-title">I miei articoli</div>
    </div>
    <div>
      <div class="links">
        <a :href="url">Scarica la lista completa dei miei articoli</a>
      </div>
      <div>
        <a href="http://data.reevo.io/reevoimport/template.xlsx"
          >Scarica il template per il caricamento</a
        >
      </div>
    </div>
    <div class="alert-wrapper">
      <div class="md-subheading">Caricamento articoli:</div>
    </div>
    <div class="alert-wrapper md-layout">
      <md-checkbox
        v-model="add"
        class="md-primary md-layout-item"
        :disabled="all"
        >Aggiungi alla mia lista di articoli</md-checkbox
      >
    </div>
    <div class="alert-wrapper md-layout">
      <md-checkbox
        v-model="all"
        class="md-primary md-layout-item"
        :disabled="add"
        >Sostituisci la mia lista con gli articoli caricati</md-checkbox
      >
    </div>
    <p class="md-error">{{ message }}</p>
    <div class="md-layout">
      <div class="md-layout-item">
        <div class="alert-wrapper">
          <div class="md-subheading">Caricamento articoli:</div>
        </div>
      </div>
    </div>
    <form
      id="uploadForm"
      class="md-layout"
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
    <md-button
      class="md-raised md-dense md-primary apply-button"
      @click="submitFile"
      >Carica File</md-button
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
      all: false,
      link: '',
      file: null,
      isValid: null,
      message: "",
      ref: "",
      path: `https://data.reevo.io/`,
    };
  },
  computed: {
    ...mapGetters({
      nomeAzienda: "nomeAzienda",
      linkFile: "linkFile",
    }),
    url() {
      return this.path + this.link;
    },
  },
  // async mounted() {
  //   await this.input();
  // },

  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];

      console.log(this.file.name);
    },

    async submitFile() {
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
        await axios({
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
            this.$toast.success('File caricato con successo')
            setTimeout(() => this.$router.go(), 2000)
            .catch(function () {
            console.log("fail");
            this.$toast.error('Si è verificato un errore')
          });
        this.message = "";
      }
    },
    async input() {
      await this.$store.dispatch("input_call");
    },
  },
  async mounted() {
    let dispatch = await this.$store.dispatch("input_call");
    let ress = JSON.parse(dispatch.data.JsonRisposta);
    this.link = ress.LinkListaArticoli;
    console.log(ress);
  },
};
</script>

<style lang="scss">
@import "src/assets/style/input.scss";
</style>
