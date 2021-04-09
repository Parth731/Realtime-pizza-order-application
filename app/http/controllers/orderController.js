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
  };
}

module.exports = orderController;
