<template>
  <div
    :id="router == 'Login' ? 'nav' : ''"
    class="page-container main-container"
  >
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar
        v-show="router != 'Main' && router != 'Login'"
        class="md-primary topbar md-elevation-1"
      >
        <md-button
          v-if="!menuVisible"
          class="md-icon-button"
          @click="toggleMenu"
          :md-ripple="false"
        >
          <md-icon class="hamburger-menu">menu</md-icon>
        </md-button>
        <span class="md-title logo"
          ><router-link to="/"
            ><img src="/assets/img/logo.png" alt="logo" /></router-link
        ></span>
        <div class="login">
          <!-- <md-avatar>
            <img src="/assets/img/avatar.png" alt="Avatar" />
          </md-avatar> -->

          <span v-if="isLoggedIn"><a @click="logout">Logout</a></span>
        </div>
      </md-app-toolbar>

      <md-app-drawer
        v-if="router != 'Login'"
        :md-active.sync="menuVisible"
        md-persistent="mini"
      >
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Menu</span>

          <div class="md-toolbar-section-end">
            <md-button
              class="md-icon-button md-dense"
              :md-ripple="false"
              @click="toggleMenu"
            >
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-content v-show="menuVisible" class="main-menu">
          <md-list id="sidebar" class="main-navigation">
            <md-list-item
              ><a
                id="drawers"
                href="https://reevo.io"
                target="_blank"
                @click="toggleMenu"
                ><span>Reevo.io</span></a
              ></md-list-item
            >
            <md-list-item
              ><a
                id="drawers"
                target="_blank"
                href="https://reevo.io/assistenza"
                @click="toggleMenu"
                ><span>Centro Assistenza</span></a
              ></md-list-item
            >
            <md-list-item
              ><router-link id="drawers" to="/input" @click.native="toggleMenu"
                ><span>Articoli</span></router-link
              ></md-list-item
            >
            <md-list-item
              ><router-link
                id="drawers"
                to="/parametri"
                @click.native="toggleMenu"
                ><span>Parametri</span></router-link
              ></md-list-item
            >
          </md-list>
        </md-content>
        <md-divider v-show="menuVisible"></md-divider>

        <md-list :class="menuVisible ? 'quick' : ''">
          <md-list-item
            :class="router == 'Main' ? 'amz-active' : 'quick-navigation'"
            ><router-link id="drawer" to="/">
              <md-icon md-src="/assets/img/home-solid.svg" />
              <span class="md-list-item-text" @click="toggleMenu"
                >Home</span
              ></router-link
            >
          </md-list-item>
          <md-list-item
            class="dashboard"
            :class="isHome ? 'amz-active' : 'quick-navigation'"
          >
            <router-link id="drawer" to="/amz">
              <md-icon md-src="/assets/img/amazon-brands.svg" />

              <span class="md-list-item-text" @click="toggleMenu"
                >Amazon Dashboard</span
              ></router-link
            >
          </md-list-item>

          <md-list-item
            class="dashboard"
            :class="router == 'Items' ? 'amz-active' : 'quick-navigation'"
          >
            <router-link id="drawer" to="/items">
              <md-icon md-src="/assets/img/table-solid.svg" />
              <span class="md-list-item-text" @click="toggleMenu"
                >Items Dashboard</span
              ></router-link
            >
          </md-list-item>

          <md-list-item
            :class="router == 'Price' ? 'amz-active' : 'quick-navigation'"
            ><router-link to="/price" id="drawer">
              <md-icon md-src="/assets/img/chart-area-solid.svg" />
              <span class="md-list-item-text" @click="toggleMenu"
                >Price Graph</span
              ></router-link
            >
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content :class="router == 'Login' ? 'main-login' : 'table'">
        <router-view class="view" />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
      menuVisible: "menuVisible",
    }),
    isHome() {
      if (this.$route.name == "Amz" || this.$route.name == "Dashboard") {
        return true;
      }
      return false;
    },
    router: {
      get() {
        return this.$route.name;
      },
      set(newValue) {
        return newValue;
      },
    },
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      // eslint-disable-next-line no-unused-vars
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout");
        }
        throw err;
      });
    });
  },
  methods: {
    logout: function () {
      sessionStorage.removeItem("token");
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login", () => {});
      });
    },
    toggleMenu() {
      this.$store.commit("toggleMenu");
    },
  },
};
</script>

<style lang="scss">
@import "src/assets/style/toolbar.scss";
@import "src/assets/style/global.scss";
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap");
@import url("https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css");
</style>
