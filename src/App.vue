<template>
  <div class="page-container main-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary topbar" v-show="router != 'Login'">
        <md-menu md-size="auto">
          <md-button md-menu-trigger
            ><md-icon class="hamburger-menu">menu</md-icon></md-button
          >

          <md-menu-content>
            <md-menu-item>Pagina 1</md-menu-item>
            <md-menu-item>Pagina 2</md-menu-item>
            <md-menu-item>Pagina 3 - Titolo più lungo </md-menu-item>
          </md-menu-content>
        </md-menu>
        <span class="md-title logo"
          ><img src="@/assets/img/logo.png" alt="logo"
        /></span>
        <span v-if="isLoggedIn" to="/login" class="login " flex
          ><a @click="logout"> Logout</a></span
        >
      </md-app-toolbar>

      <md-app-drawer
        v-if="router != 'Login'"
        md-persistent="mini"
        md-permanent="full"
      >
        <md-toolbar class="md-transparent" md-elevation="0">
          Navigation
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content :class="router == 'Login' ? 'main-login' : 'table'">
        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  created: function() {
    this.$http.interceptors.response.use(undefined, function(err) {
      // eslint-disable-next-line no-unused-vars
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout");
        }
        throw err;
      });
    });
  },

  methods: {
    logout: function() {
      sessionStorage.removeItem("token");
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login", () => {});
      });
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn"
    }),
    router: {
      get() {
        return this.$route.name;
      },
      set(newValue) {
        return newValue;
      }
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/style/toolbar.scss";
</style>
