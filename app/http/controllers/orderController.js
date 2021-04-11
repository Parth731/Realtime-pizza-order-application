const { Result } = require("postcss");
const Order = require("../../models/orders");
const moment = require("moment");

function orderController() {
  return {
    store(req, res) {
      //   validate request
      const { phone, address } = req.body;
      if (!phone || !address) {
        req.flash("error", "all fields are required");
        return res.redirect("/cart");
      }
      const order = new Order({
        customerId: req.user._id,
        name: req.user.name,
        items: req.session.cart.items,
        phone,
        address,
      });
      order
        .save()
        .then((result) => {
          req.flash("success", "Order placed successfully");
          delete req.session.cart;

          // get eventEmitter event then listening to server.js
          const eventEmitter = req.app.get("eventEmitter");
          eventEmitter.emit("orderPlaced", result);

          return res.redirect("/customer/orders");
        })
        .catch((err) => {
          req.flash("error", "Something went to wrong");
          return res.redirect("/cart");
        });
    },
    async index(req, res) {
      const orders = await Order.find({ customerId: req.user._id }, null, {
        sort: {
          createdAt: -1,
        },
      });
      res.header(
        "Cache-control",
        "no-cache,private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
      );
      res.render("customers/orders", {
        orders: orders,
        moment: moment,
      });
    },
    async show(req, res) {
      // all orders receive using user ID
      // req.param.id => it is parameter id
      const order = await Order.findById(req.params.__id);

      // authorize user id
      // jo id par order fetch kar rahe hai user ki hai ya nai
      // req.user._id -> data is object form so converted in string
      if (req.user._id.toString() === order.customerId.toString()) {
        return res.render("customers/singleOrder", {
          singleorder: order,
        });
      } else {
        return res.redirect("/");
      }
    },
  };
}

module.exports = orderController;
