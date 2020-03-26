<template>
  <div class="page-container main-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary topbar" v-show="router != 'Login'">
        <md-button
          class="md-icon-button"
          @click="toggleMenu"
          v-if="!menuVisible"
        >
          <md-icon class="hamburger-menu">menu</md-icon>
        </md-button>
        <span class="md-title logo"
          ><img src="/assets/img/logo.png" alt="logo"
        /></span>
        <div class="login">
          <span v-if="isLoggedIn"><a @click="logout">Logout</a></span>
        </div>
      </md-app-toolbar>

      <md-app-drawer
        :md-active.sync="menuVisible"
        md-persistent="mini"
        v-if="router != 'Login'"
      >
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Menu</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-content class="main-menu" v-show="menuVisible">
          <md-list class="main-navigation">
            <md-list-item><span>F.A.Q</span></md-list-item>
            <md-list-item><span>Centro Assistenza</span></md-list-item>
            <md-list-item><span>Import Items</span></md-list-item>
          </md-list>
        </md-content>
        <md-divider></md-divider>

        <md-list :class="menuVisible ? 'quick' : ''">
          <md-list-item
            class="dashboard"
            :class="router == 'Dashboard' ? 'amz-active' : 'quick-navigation'"
          >
            <router-link to="/amz">
              <md-icon class="dashboard-icon"
                >move_to_inbox</md-icon
              ></router-link
            >
            <span class="md-list-item-text">Amazon Dashboard</span>
          </md-list-item>

          <md-list-item
            :class="router == '' ? 'amz-active' : 'quick-navigation'"
          >
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item
            :class="router == '' ? 'amz-active' : 'quick-navigation'"
          >
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item
            :class="router == '' ? 'amz-active' : 'quick-navigation'"
          >
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
  data() {
    return {
      menuVisible: false
    };
  },
  methods: {
    logout: function() {
      sessionStorage.removeItem("token");
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login", () => {});
      });
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
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
