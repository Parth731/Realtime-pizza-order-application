const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/cartController");
const orderController = require("../app/http/controllers/orderController");
const AdminOrderController = require("../app/http/controllers/admin/orderController");
const StatusOrderController = require("../app/http/controllers/admin/statusController");

// middleware
const guest = require("../app/http/middlewares/guest");
const auth = require("../app/http/middlewares/auth");
const admin = require("../app/http/middlewares/admin");

function initroutes(app) {
  app.get("/", homeController().index);

  app.get("/cart", cartController().cart);

  app.post("/update-cart", cartController().update);

  app.get("/login", guest, authController().login);
  app.post("/login", authController().postLogin);

  app.get("/register", guest, authController().register);
  app.post("/register", authController().postRegister);

  app.post("/logout", authController().logout);

  // customer route
  app.post("/orders", auth, orderController().store);
  app.get("/customer/orders", auth, orderController().index);
  app.get("/customer/orders/:__id", auth, orderController().show);

  // addmin routes
  app.get("/admin/orders", admin, AdminOrderController().index);
  app.post("/admin/order/status", admin, StatusOrderController().update);
}

module.exports = initroutes;
