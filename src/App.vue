<template>
  <div class="page-container main-container md-layout-column">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary" v-show="router != 'Login'">
        <md-button class="md-icon-button" @click="toggleNavigation()">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Dashboard</span>
        <span v-if="isLoggedIn" to="/login" class="login " flex
          ><a @click="logout"> Logout</a></span
        >
      </md-app-toolbar>

      <md-app-drawer
        v-show="router != 'Login'"
        :md-active.sync="showNavigation"
        md-swipeable
        md-persistent="mini"
      >
        <md-app-toolbar class="md-transparent" md-elevation="0">
          <span class="md-title">Reevo Dashboard</span>
        </md-app-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>trending_up</md-icon>
            <router-link to="/amz"
              ><span class="md-list-item-text"
                >Amazon Dashboard</span
              ></router-link
            >
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

      <md-app-content :class="router == 'Login' ? 'main-login' : ''">
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
      showNavigation: false,
      showSidepanel: false
    };
  },
  methods: {
    logout: function() {
      sessionStorage.removeItem("token");
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login", () => {});
      });
    },
    toggleNavigation() {
      this.showNavigation = !this.showNavigation;
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
