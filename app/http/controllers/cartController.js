function cartController() {
  return {
    cart(req, res) {
      res.render("customers/cart");
    },
    update(req, res) {
      // console.log("update..........");

      // let cart = {
      //   items: {
      //     pizzaid: { item: pizzaObject, qty: 0 },
      //   },
      //   totalQty: 0,
      //   totalPrice: 0,
      // };

      // for the first time creating cart and adding basic object structure
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0,
        };
      }

      // console.log(req.body);           // jis pizza par click kiya usaka data
      // console.log(req.session.cart);   // {}
      let cart = req.session.cart;
      console.log("cart - items => ", cart.items);

      // check if items does not exist in cart then add it and exist pizza qty and price change
      if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
          item: req.body,
          qty: 1,
        };
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      } else {
        cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      }

      return res.json({ totalQty: req.session.cart.totalQty });
    },
  };
}

module.exports = cartController;
