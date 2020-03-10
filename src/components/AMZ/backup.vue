<script>
async porcoddio() {
      console.log("è iniziato il porcodiddio");
      this.loaded = false;
      let amzgraph_request = {
        CodiceClient: "reevolacerba2020",
        CodiceRichiesta: "AMZGraph",
        VersioneClient: "1.0.3",
        Url: window.location.href,
        JsonRichiesta: JSON.stringify(this.graphParams)
      };
      try {
        await axios({
          url: "/",
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          params: JSON.stringify(amzgraph_request)
        }).then(res => {
          console.log("porcamadonna" + "" + res);
          let lista_prezzi = JSON.parse(res.data.JsonRisposta);
          console.log(lista_prezzi);
          let lista_giorni = lista_prezzi.ListaPrezzi;
          let data_prezzi = [];
          for (const data in lista_giorni) {
            data_prezzi.push(lista_giorni[data].DataPrezzo);
          }
          this.chartdata.labels = data_prezzi;
        });
        this.loaded = true;
      } catch (e) {
        console.error(e);
      }
    },
</script>
