import auth from "./auth.js";
import amz from "./amz.js";
export default {
  isLoggedIn: () => !!auth.state.token || !!sessionStorage.getItem("token"),
  authStatus: () => auth.state.status,
  amz: () => amz.state.amz,
  items: () => amz.state.items,
  amzdata: () => amz.state.amzdata,
  itemsPerPage: () => amz.state.amzdata.ItemsPerPagina,
  currentPage: () => amz.state.amz.NumeroPagina
};
