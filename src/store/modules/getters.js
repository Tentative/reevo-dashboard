import auth from "./auth.js";
import amz from "./amz.js";
import amzgraph from "./amzgraph.js";
import screenshot from "./screenshot.js";
export default {
  isLoggedIn: () => !!auth.state.token || !!sessionStorage.getItem("token"),
  authStatus: () => auth.state.status,
  amz: () => amz.state.amz,
  items: () => amz.state.items,
  amzdata: () => amz.state.amzdata,
  itemsPerPage: () => amz.state.amzdata.ItemsPerPagina,
  thisPage: () => amz.state.amz.NumeroPagina,
  totalPages: () => amz.state.amz.QtaPagine,
  amzGraphVisible: () => amzgraph.state.amzGraphVisible,
  currentItem: () => amzgraph.state.currentItem,
  graph_data: () => amzgraph.state.graph_data,
  days: () => amzgraph.state.days,
  graphParams: () => amzgraph.state.graph_params,
  chartdata: () => amzgraph.state.chartdata,
  options: () => amzgraph.state.options,
  minMax: () => amzgraph.state.min_max,
  dataPrezzo: () => amzgraph.state.data_prezzo,
  screenshotVisible: () => screenshot.state.screenshotVisible
};
