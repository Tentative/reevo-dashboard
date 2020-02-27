import auth from "./auth.js";
import amz from "./amz.js";
export default {
  isLoggedIn: () =>
    !!localStorage.getItem("token") || !!sessionStorage.getItem("token"),
  authStatus: () => auth.state.status,
  amz: () => amz.state.amz
};
