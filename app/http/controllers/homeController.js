const menu = require("../../models/menu");

function homeController() {
  return {
    async index(req, res) {
      //   using promise

      // menu.find().then((pizzas) => {
      //   console.log(pizzas);
      //   return res.render("home", {
      //     pizzas: pizzas,
      //   });
      // });

      //   using asysnc await
      const pizzas = await menu.find();
      // console.log(pizzas);
      return res.render("home", {
        pizzas: pizzas,
      });
    },
  };
}

module.exports = homeController;
