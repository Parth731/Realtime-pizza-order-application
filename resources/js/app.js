import axios from "axios";
import Noty from "noty";

let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector("#cartCounter");

// let selection = document.querySelector("#list");
// let result = document.querySelector(".price");

function updateCart(pizza) {
  axios
    .post("/update-cart", pizza)
    .then((res) => {
      console.log(res);
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

// selection.addEventListener("change", () => {
//   result.innerText = selection.options[selection.selectedIndex].text;
// });
