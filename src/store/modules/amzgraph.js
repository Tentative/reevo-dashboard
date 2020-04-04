/* eslint-disable prettier/prettier */
import axios from "axios";
import moment from "moment";
export default {
  state: {
    months: ["Gen", "Feb", "Mar", "Apr"],
    amzGraphVisible: false,
    currentDate: new Date(),
    graph_params: {},
    graph_res: {},
    graph_days: [],
    currentItem: {},
    checked: [],
    chartdata: {
      labels: [],
      datasets: [
        {
          label: "Prices",
          backgroundColor: "transparent",
          borderColor: "#409EFF",
          borderWidth: 3,
          borderSkipped: true,
          data: [],
          type: "line",
          pointBorderColor: "#409EFF",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#409EFF",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 10,
          lineTension: 0,
          order: 1,
          yAxisID: "prices",
          steppedLine: "before"
        },
        {
          label: "Sales Rank",
          backgroundColor: "transparent",
          borderColor: "red",
          borderWidth: 0.5,
          data: [],
          order: 2,
          yAxisID: "ranks",
          type: "line",
          lineTension: 0,
          steppedLine: "before",
          pointBorderColor: "red",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "red",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 2,
          pointHitRadius: 10
        },
        {
          label: "Out of stock",
          backgroundColor: "#ffb8ab",
          borderColor: "red",
          data: [],
          type: "bar",
          order: 3,
          yAxisID: "stock"
        }
      ]
    },
    options: {
      legend: {
        labels: {
          // boxWidth: 10,
          usePointStyle: true,
          // eslint-disable-next-line no-unused-vars
          filter: function (item, chart) {
            // Logic to remove a particular legend item goes here
            return !item.text.includes('Out of stock');
          }
        }
      },
      annotation: {
        annotations: [
          {
            id: "min-line",
            mode: "horizontal",
            type: "line",
            scaleID: "prices",
            value: "",
            borderColor: "rgba(255,0,0,0.4)",
            borderWidth: 2,
            borderDash: [2, 2]
          },
          {
            id: "max-line",
            mode: "horizontal",
            type: "line",
            scaleID: "prices",
            value: "",
            borderColor: "rgba(0,204,102,0.4)",
            borderWidth: 2,
            borderDash: [2, 2]
          }
        ],
        drawTime: "afterDraw"
      },
      responsive: true,
      maintainAspectRatio: false,
      showLines: true,
      scales: {
        yAxes: [
          {
            id: "prices",
            type: "linear",
            position: "left",
            gridLines: {
              display: false,
            },
            ticks: {
              display: true,
              // eslint-disable-next-line no-unused-vars
              callback: function (value, index, values) {
                return value + " " + "€";
              },
              // beginAtZero: true,
              source: "auto",
              min: "",
              max: "",
              precision: 0
            },
            afterTickToLabelConversion: function (scaleInstance) {
              // set the first and last tick to null so it does not display
              // note, ticks[0] is the last tick and ticks[length - 1] is the first
              scaleInstance.ticks[scaleInstance.ticks.length - 1] = null;

              // need to do the same thing for this similiar array which is used internally
              scaleInstance.ticksAsNumbers[scaleInstance.ticksAsNumbers.length - 1] = null;
            }
          },
          {
            id: "ranks",
            type: "linear",
            position: "right",
            gridLines: {
              display: true,
              drawBorder: true,
              lineWidth: 1,
              zeroLineWidth: 1,
            },
            ticks: {
              display: false,
              reverse: true,
              precision: 0,
              soruce: "auto"
            }
          },
          {
            id: "stock",
            distribution: "linear",
            gridLines: {
              display: false
            },
            ticks: {
              display: false,
              precision: 0,
              min: "",
              max: ""
            }
          }
        ],
        xAxes: [
          {
            type: "time",
            ticks: {
              min: "",
              max: ""
              // source: "data"
            },
            distribution: "linear",
            time: {
              displayFormats: {
                day: "D MMM"
              },
              stepSize: 3,
              unit: "day"
            },
            gridLines: {
              display: true,
              drawTicks: false,
              zeroLineWidth: 1
            }
          }
        ]
      },
      tooltips: {
        mode: "index",
        position: "nearest",
        callbacks: {
          title: tooltipItems => {
            return tooltipItems[0].xLabel;
          },

          // 
          // eslint-disable-next-line no-unused-vars
          label: function (t, d) {
            if (t.datasetIndex === 0) {
              return "Prezzo: " + t.yLabel.toFixed(2) + " " + "€"
            } else if (t.datasetIndex === 1) {
              return "Sales Rank: " + t.yLabel;
            }
          }
        }
      }
    },
    days: [],
    min_max: [],
    amzgraph_request: {
      CodiceClient: "reevolacerba2020",
      CodiceRichiesta: "AMZGraph",
      VersioneClient: "1.0.3",
      Url: window.location.href
      //define JsonRichiesta from mutations;
    }
  },

  mutations: {
    toggle_amz_graph(state) {
      state.amzGraphVisible = !state.amzGraphVisible;
    },
    get_current_item(state, { item }) {
      state.currentItem.UrlImmagine = item.UrlImmagine;
      state.graph_params.EAN = item.EAN;
      state.graph_params.FiltroGiorni = "30";
    },
    graph_request(state) {
      state.amzgraph_request.JsonRichiesta = JSON.stringify(state.graph_params);
    },
    graph_success(
      state,
      {
        labels,
        sales_rank,
        prezzo_giorno,
        in_stock_giorno,
        current_item,
        prezzoMin,
        prezzoMax,
        min_rank,
        max_rank,
        max,
        checked,
        // fullMin
        // fullMax
        minimo
        // maxx
      }
    ) {
      state.chartdata.labels = labels;
      state.chartdata.datasets[0].data = prezzo_giorno;
      state.chartdata.datasets[1].data = sales_rank;
      state.chartdata.datasets[2].data = in_stock_giorno;
      state.currentItem = current_item;
      state.options.annotation.annotations[0].value = prezzoMax;
      state.options.annotation.annotations[1].value = prezzoMin;
      state.options.scales.yAxes[0].ticks.min = parseInt(prezzoMin - 2);
      state.options.scales.yAxes[0].ticks.max = parseInt(prezzoMax + 2);
      state.options.scales.yAxes[1].ticks.min = parseInt(min_rank - 2);
      state.options.scales.yAxes[1].ticks.max = parseInt(max_rank + 2);
      state.options.scales.yAxes[2].ticks.min = parseInt(minimo);
      state.options.scales.yAxes[2].ticks.max = parseInt(max);
      state.checked = checked;

      // state.options.scales.xAxes[0].ticks.min = state.currentDate.setDate(
      //   state.currentDate.getDate() - 30
      // );

      // state.options.scales.xAxes[0].ticks.max = maxx;
      // state.options.scales.xAxes[0].ticks.min = min;
    },
    clear_chart(state) {
      state.chartdata = {
        labels: [],
        datasets: [
          {
            label: "Prices",
            backgroundColor: "transparent",
            borderColor: "#409EFF",
            borderWidth: 3,
            borderSkipped: true,
            data: [],
            type: "line",
            pointBorderColor: "#409EFF",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#409EFF",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            lineTension: 0,
            order: 1,
            yAxisID: "prices",
            steppedLine: "before"
          },
          {
            label: "Sales Rank",
            backgroundColor: "transparent",
            borderColor: "red",
            borderWidth: 0.5,
            data: [],
            order: 2,
            yAxisID: "ranks",
            type: "line",
            lineTension: 0,
            steppedLine: "before",
            pointBorderColor: "red",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "red",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10
          },
          {
            label: "Out of stock",
            backgroundColor: "#ffb8ab",
            borderColor: "red",
            data: [],
            type: "bar",
            order: 3,
            yAxisID: "stock"
          }
        ]

      };
    }
  },
  actions: {
    save_graph({ commit }, item) {
      commit("get_current_item", item);
      commit("toggle_amz_graph");
    },
    amz_graph({ commit, state }, item) {
      return new Promise((resolve, reject) => {
        commit("get_current_item", item);
        let graph_params = {
          EAN: state.currentItem.EAN,
          FiltroGiorni: "30"
        };
        commit("graph_request", graph_params);
        const richiesta = state.amzgraph_request;
        axios({
          url: "/",
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          params: JSON.stringify(richiesta)
        })
          .then(res => {
            let maxx = new Date();
            let min_temp = new Date().setDate(maxx.getDate() - 30);
            let min = new Date(min_temp);
            min.toISOString();
            const current_item = JSON.parse(res.data.JsonRisposta);
            const total_days = current_item.ListaPrezzi;
            total_days.reverse();
            let labels = [...new Array(30)].map((i, idx) =>
              moment.utc()
                .startOf("day")
                .subtract(idx, "days")
                .utcOffset(1)
               .format()
                
                
            );
            labels.reverse();
            let prezzo_giorno = [];
            let last_price = total_days[0].PrezzoGiorno;
            let checked = [];
 
            for (const day in total_days) {
              let data = total_days[day].DataPrezzo;
              let data_finale = data.toString().slice(0, 10);
              let next = parseInt(day) + 1
              let prev = parseInt(day) - 1
              let long = total_days.length
              if (day != long - 1){
                let data_due = total_days[next].DataPrezzo;
                let data_finale_due = data_due.toString().slice(0, 10);
                if (data_finale == data_finale_due){
                  // console.log("porcoddio")
                  checked.push(total_days[day])
                  if (total_days[prev] != undefined) {
                    let data_tre = total_days[prev].DataPrezzo;
                    let data_finale_tre = data_tre.toString().slice(0, 10);
                  if (data_finale == data_finale_tre){
                    checked.push(total_days[day])
                    // console.log("porcamadonna")
                  }
                }
                }
              }
              else{break}
            // console.log(total_days[day].DataPrezzo)
            }
            // for (const check of total_days){
            //   let next = check.indexOf(check) + 1
            //   console.log(next)
            //     // let stringa = total_days[datB].DataPrezzo;
            //     // let date = moment(stringa).format()
            //     // let lunghezza_x = labels[datA].length;
            //     // let lunghezza_risposta = date.length
            //     // let dataFinale = date.toString().slice(0, lunghezza_risposta -6)
            //   if (total_days[check +1] != undefined){
            //       if (total_days[check].DataPrezzo == total_days[check+ 1].DataPrezzo){
            //         checked.push(total_days[check])
            //       }
                
            //   }
              
            //   else {break};
              
            // }
            let sales_rank = [];
            for (const datA in labels) {
              for (const datB in total_days) {
                let stringa = total_days[datB].DataPrezzo;
                let date = moment(stringa).format()
                let dataControllo = moment(labels[datA]).format()

                if (moment(date).isSame(dataControllo, "day")) {

                  
                  last_price = total_days[datB].PrezzoGiorno;
                }
                if (moment(date).isSame(dataControllo)){
                  last_rank = total_days[datB].SalesRankGiorno
                  

                }
            
              
            }
              prezzo_giorno.push(last_price);
              sales_rank.push(last_rank);
              // console.log(last_price)
            }
            let prezzoMax = Math.max.apply(Math, prezzo_giorno);
            let prezzoMin = Math.min.apply(Math, prezzo_giorno);

            
            let in_stock_giorno = [];
            let last_rank = total_days[0].SalesRankGiorno;
            for (const rankA in labels) {
              for (const rankB in total_days) {
               let stringa = total_days[rankB].DataPrezzo;
                let date = moment(stringa).format()
                let dataControllo = moment(labels[rankA]).format()
                if (moment(date).isSame(dataControllo, "day")) {
                  
                  // last_price = total_days[rankB].PrezzoGiorno;
                  

                }
              }
              // sales_rank.push(last_rank);
            }

            let max_price = Math.max.apply(null, prezzo_giorno);
            let temp_rank = sales_rank.reverse();
            let max_rank = Math.max.apply(null, temp_rank);
            let min_rank = Math.min.apply(null, temp_rank);
            let max = Math.max(max_price, max_rank);
            let minimo = Math.min(prezzoMin, min_rank);
            for (const stock in labels) {
              if (total_days[stock]) {
                if (total_days[stock].InStockGiorno == "No") {
                  in_stock_giorno.push(max + 2);
                } else {
                  in_stock_giorno.push("");
                }
              } else {
                in_stock_giorno.push("");
              }
            }

            commit("graph_success", {
              labels,
              sales_rank,
              prezzo_giorno,
              in_stock_giorno,
              current_item,
              prezzoMax,
              prezzoMin,
              min_rank,
              max_rank,
              max,
              minimo,
              checked
              // maxx
            });

            resolve(res);
            commit("toggle_amz_graph");
            // console.log("ha finit?");
            })

          .catch(err => {
            reject(err);
            // console.log(err);
          });
      });
    }
  },
  getters: {}
};
