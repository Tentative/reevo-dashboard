<template>
  <div class="page-container md-layout-column">
    <md-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">Dashboard</span>
    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation" md-swipeable>
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Reevo Dashboard</span>
      </md-toolbar>

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
    </md-drawer>

    <md-content>
      <router-view />
    </md-content>
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
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn"
    })
  }
};
</script>

<style lang="scss">
@import "src/assets/style/toolbar.scss";
</style>
