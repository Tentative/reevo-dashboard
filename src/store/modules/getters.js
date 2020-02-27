import auth from "./auth.js";
export default {
  isLoggedIn: () =>
    !!localStorage.getItem("token") || !!sessionStorage.getItem("token"),
  authStatus: () => auth.state.status
};
