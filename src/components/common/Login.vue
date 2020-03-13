<template>
  <div>
    <div class="centered-container">
      <md-content class="md-elevation-3">
        <div class="title">
          <img src="@/assets/img/logo.webp" />
          <div class="md-body-1">You are not logged in</div>
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
        </div>

        <div class="actions md-layout md-alignment-center-center">
          <md-checkbox v-model="login.IsMemorizzaPassword"
            >Keep logged in</md-checkbox
          >
          <center>
            <span class="errors md-body-1" v-html="errors"></span>
          </center>
          <md-button
            class="md-raised md-primary md-alignment-center-space-between"
            @click="login_request"
            >Log in</md-button
          >
        </div>

        <div class="loading-overlay" v-if="authStatus == 'loading'">
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
  computed: {
    ...mapGetters({
      authStatus: "authStatus",
      isLoggedIn: "isLoggedIn"
    })
  },
  components: {},
  data() {
    return {
      errors: "",
      loading: false,
      login: {
        email: "",
        password: "",
        IsMemorizzaPassword: false
      }
    };
  },
  methods: {
    login_request() {
      this.loading = true;
      let NomeUtente = this.login.email;
      let Password = this.login.password;
      let IsMemorizzaPassword = this.login.IsMemorizzaPassword;
      if (NomeUtente == "") {
        this.errors = "Username is required!";
      } else if (Password == "") {
        this.errors = "Please enter your password";
      }
      this.$store
        .dispatch("login", {
          NomeUtente,
          Password,
          IsMemorizzaPassword
        })
        .then(() => {
          this.loading = false;
          this.$router.push("/amz", () => {});
        });
      // .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/login.scss";
</style>
