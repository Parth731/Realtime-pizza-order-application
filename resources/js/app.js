import axios from "axios";
import Noty from "noty";
// const moment = require("moment");

import { initAdmin } from "./admin";

let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector("#cartCounter");

function updateCart(pizza) {
  axios 
    .post("/update-cart", pizza)
    .then((res) => {
      // console.log(res);
      cartCounter.innerText = res.data.totalQty;
      new Noty({
        type: "success",
        timeout: 1000, //1sec
        text: "Item added to cart",
        progressBar: false,
        // layout: "bottomLeft",
      }).show();
    })
    .catch((err) => {
      new Noty({
        type: "error",
        timeout: 1000, //1sec
        text: "Somthing went wrong",
        progressBar: false,
        // layout: "bottomLeft",
      }).show();
    });
}

addToCart.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    let pizza = btn.dataset.pizza; // get data on btn click and receive data from database using json.stringify()
    let pizzaData = JSON.parse(pizza);


    updateCart(pizzaData);
  });
});

// remove alert message after x seconds

const alertMsg = document.querySelector("#success-alert");
if (alertMsg) {
  setTimeout(() => {
    alertMsg.remove();
  }, 3000);
}

/************************* */



initAdmin();
