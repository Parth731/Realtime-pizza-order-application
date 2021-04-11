// change order status

// create time
import moment from "moment";
let time = document.createElement("small");

let statuses = document.querySelectorAll(".status-line");

export function updateStatus(order) {
  statuses.forEach((currentStatus) => {
    currentStatus.classList.remove("step-completed");
    currentStatus.classList.remove("current-status");
  });

  let stepCompleted = true;
  statuses.forEach((currentStatus) => {
    // here received data-status  => (dataset.status)
    let dataProp = currentStatus.dataset.status;
    if (stepCompleted) {
      currentStatus.classList.add("step-completed");
    }

    // order_placed === order_placed -> true
    if (dataProp === order.status) {
      stepCompleted = false;
      time.innerText = moment(order.updatedAt).format("hh:mm: A");
      currentStatus.appendChild(time);
      // last sibling
      if (currentStatus.nextElementSibling) {
        currentStatus.nextElementSibling.classList.add("current-status");
      }
    }
  });
}
