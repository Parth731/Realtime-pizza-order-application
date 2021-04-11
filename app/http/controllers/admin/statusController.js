const Orders = require("../../../models/orders");

function statusController() {
  return {
    update(req, res) {
      Orders.updateOne(
        { _id: req.body.orderId },
        { status: req.body.status },
        (err, updatedata) => {
          if (err) {
            return res.redirect("/admin/orders");
          }

          // emit events
          // get eventEmitter event with sending orderid and status to server.js
          const eventEmitter = req.app.get("eventEmitter");
          eventEmitter.emit("orderUpdated", {
            id: req.body.orderId,
            status: req.body.status,
          });

          return res.redirect("/admin/orders");
        }
      );
    },
  };
}

module.exports = statusController;
