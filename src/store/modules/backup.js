.then((res) => {
  //   let maxx = new Date();
  //   let min_temp = new Date().setDate(maxx.getDate() - 30);
  //   let min = new Date(min_temp);
  //   min.toISOString();
  //   const current_item = JSON.parse(res.data.JsonRisposta);
  //   const total_days = current_item.ListaPrezzi;
  //   total_days.reverse();
  //   console.log(current_item);
  //   let labels = [...new Array(31)].map((i, idx) =>
  //     moment
  //       .utc()
  //       .startOf("day")
  //       .subtract(idx, "days")
  //       .utcOffset(1)
  //       .format()
  //   );
  //   labels.reverse();
  //   let prezzo_giorno = [];
  //   let last_price = null;
  //   let checked = [];

  //   for (const day in total_days) {
  //     let data = total_days[day].DataPrezzo;
  //     let data_finale = data.toString().slice(0, 10);
  //     let next = parseInt(day) + 1;
  //     let prev = parseInt(day) - 1;
  //     let long = total_days.length;
  //     if (day != long - 1) {
  //       let data_due = total_days[next].DataPrezzo;
  //       let data_finale_due = data_due.toString().slice(0, 10);
  //       if (data_finale == data_finale_due) {
  //         checked.push(total_days[day]);
  //         if (total_days[prev] != undefined) {
  //           let data_tre = total_days[prev].DataPrezzo;
  //           let data_finale_tre = data_tre.toString().slice(0, 10);
  //           if (data_finale == data_finale_tre) {
  //             checked.push(total_days[day]);
  //           }
  //         }
  //       }
  //     } else {
  //       break;
  //     }
  //   }
  //   // for (const check of total_days){
  //   //   let next = check.indexOf(check) + 1
  //   //     // let stringa = total_days[datB].DataPrezzo;
  //   //     // let date = moment(stringa).format()
  //   //     // let lunghezza_x = labels[datA].length;
  //   //     // let lunghezza_risposta = date.length
  //   //     // let dataFinale = date.toString().slice(0, lunghezza_risposta -6)
  //   //   if (total_days[check +1] != undefined){
  //   //       if (total_days[check].DataPrezzo == total_days[check+ 1].DataPrezzo){
  //   //         checked.push(total_days[check])
  //   //       }

  //   //   }

  //   //   else {break};

  //   // }
  //   let total_ranks = [];
  //   let total_prices = [];
  //   for (const rankA in total_days) {
  //     let rank = total_days[rankA].SalesRankGiorno;
  //     let price = total_days[rankA].PrezzoGiorno;
  //     total_ranks.push(rank);
  //     total_prices.push(price);
  //   }
  //   let max_price = Math.max.apply(null, total_prices);
  //   let max_rank = Math.max.apply(null, total_ranks);
  //   let max = Math.max(max_price, max_rank);
  //   let sales_rank = [];
  //   let last_rank = null;
  //   let last_stock = null;
  //   let in_stock_giorno = [];
  //   for (const datA in labels) {
  //     for (const datB in total_days) {
  //       let stringa = total_days[datB].DataPrezzo;
  //       var date = moment(stringa).format();
  //       var dataControllo = moment(labels[datA]).format();

  //       if (moment(date).isSame(dataControllo, "day")) {
  //         if (total_days[datB].InStockGiorno == "No") {
  //           last_stock = current_item.PrezzoMax;
  //         } else {
  //           last_stock = "";
  //         }

  //         last_rank = total_days[datB].SalesRankGiorno;
  //         last_price = total_days[datB].PrezzoGiorno;
  //       }
  //     }
  //     in_stock_giorno.push(last_stock);
  //     prezzo_giorno.push(last_price);
  //     sales_rank.push(last_rank);
  //   }
  //   in_stock_giorno.pop();
  //   sales_rank.reverse();
  //   let prezzoMax = Math.max.apply(Math, prezzo_giorno);
  //   let prezzoMin = Math.min.apply(Math, prezzo_giorno);

  //   for (const rankA in labels) {
  //     for (const rankB in total_days) {
  //       let stringa = total_days[rankB].DataPrezzo;
  //       let date = moment(stringa).format();
  //       let dataControllo = moment(labels[rankA]).format();
  //       if (moment(date).isSame(dataControllo, "day")) {
  //         // last_price = total_days[rankB].PrezzoGiorno;
  //       }
  //     }
  //     // sales_rank.push(last_rank);
  //   }

  //   let temp_rank = sales_rank.reverse();
  //   let min_rank = Math.min.apply(null, temp_rank);
  //   let minimo = Math.min(prezzoMin, min_rank);
  //   // for (const stock in labels) {
  //   //   if (total_days[stock]) {
  //   //     if (total_days[stock].InStockGiorno == "No") {
  //   //       in_stock_giorno.push(max + 2);
  //   //     } else {
  //   //       in_stock_giorno.push("");
  //   //     }
  //   //   } else {
  //   //     in_stock_giorno.push("");
  //   //   }
  //   // }

  //   commit("graph_success", {
  //     labels,
  //     sales_rank,
  //     prezzo_giorno,
  //     in_stock_giorno,
  //     current_item,
  //     prezzoMax,
  //     prezzoMin,
  //     min_rank,
  //     max_rank,
  //     max,
  //     minimo,
  //     checked,
  //     // maxx
  //   });

  //   resolve(res);
  //   commit("toggle_amz_graph");
  // })


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
          steppedLine: "before",
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
          pointHitRadius: 10,
        },
        {
          label: "Out of stock",
          backgroundColor: "#ffb8ab",
          borderColor: "red",
          data: [],
          type: "bar",
          order: 3,
          yAxisID: "stock",
          categoryPercentage: 1.1,
          barPercentage: 1.1,
        },
      ],
    };
  },