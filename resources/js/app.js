import axios from "axios";
import moment from "moment";

import Noty from "noty";
// const moment = require("moment");

import { initAdmin } from "./admin";
import { updateStatus } from "./updatestatus";

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

let hiddeninput = document.querySelector("#hiddenInput");
let order = hiddeninput ? hiddeninput.value : null;
// receiving data from database is string formate it is convertred to the object
order = JSON.parse(order);

updateStatus(order);

// client socket
let socket = io();
initAdmin(socket);

// join
// order_hdjhjdjdjfjjdjdjdb
if (order) {
  socket.emit("join", `order_${order._id}`);
}

// check for admin is connected or not
// here room created
let adminAreaPath = window.location.pathname;
if (adminAreaPath.includes("admin")) {
  socket.emit("join", "adminRoom");
}

// receving orderUpdated data from server.js
socket.on("orderUpdated", (data) => {
  const updatedOrder = { ...order };
  updatedOrder.updatedAt = moment().format();
  updatedOrder.status = data.status;
  updateStatus(updatedOrder);
  new Noty({
    type: "success",
    timeout: 1000, //1sec
    text: "Order Updated successfully",
    progressBar: false,
  }).show();
});
