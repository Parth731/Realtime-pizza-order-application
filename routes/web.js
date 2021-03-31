const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/cartController");

function initroutes(app) {
  app.get("/", homeController().index);

  app.get("/cart", cartController().cart);

  app.post("/update-cart", cartController().update);

  app.get("/login", authController().login);

  app.get("/register", authController().register);
}

module.exports = initroutes;
