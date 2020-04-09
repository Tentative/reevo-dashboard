<template>
  <div>
    <div class="centered-container">
      <md-content class="md-elevation-3">
        <div class="title">
          <img src="/assets/img/logo.png" alt="logo" />
          <div class="md-body-1 signup">Accedi</div>
        </div>

        <div class="form">
          <md-field>
            <label>E-mail</label>
            <md-input v-model="login.email" autofocus></md-input>
          </md-field>

          <md-field md-has-password>
            <label>Password</label>
            <md-input v-model="login.password" type="password"></md-input>
          </md-field>
          <center>
            <span v-if="authStatus == 'error'" class="errors md-body-1">{{
              errors
            }}</span>
            <span v-if="authStatus == 'Unauthorized'" class="errors md-body-1"
              >Email o Password errate</span
            >
          </center>
        </div>

        <div class="actions md-layout md-alignment-center-center">
          <md-checkbox v-model="login.IsMemorizzaPassword" class="md-primary"
            >Ricordami</md-checkbox
          >

          <md-button
            class="md-raised login-button md-primary md-alignment-center-space-between"
            @click="login_request"
            >Log in</md-button
          >
        </div>

        <div v-if="authStatus == 'loading'" class="loading-overlay">
          <md-progress-spinner
            md-mode="indeterminate"
            :md-stroke="2"
          ></md-progress-spinner>
        </div>
      </md-content>
      <div class="background" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      errors: "",
      loading: false,
      login: {
        email: "",
        password: "",
        IsMemorizzaPassword: false,
      },
    };
  },
  computed: {
    ...mapGetters({
      authStatus: "authStatus",
      isLoggedIn: "isLoggedIn",
    }),
  },

  methods: {
    login_request() {
      this.loading = true;
      let NomeUtente = this.login.email;
      let Password = this.login.password;
      let IsMemorizzaPassword = this.login.IsMemorizzaPassword;
      if (NomeUtente == "" || Password == "") {
        this.errors = "Email / Password necessarie!";
      }
      this.$store
        .dispatch("login", {
          NomeUtente,
          Password,
          IsMemorizzaPassword,
        })
        .then(() => {
          this.loading = false;
          this.$router.push("/amz", () => {});
        });
      // .catch(err => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/login.scss";
</style>
