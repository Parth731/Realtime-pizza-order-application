// pizza ordered admin pannel
const order = require("../../../models/orders");


function orderController() {
  return {
    index(req, res) {
      order
        .find({ status: { $ne: "completed" } }, null, {
          sort: { "createdAt": -1 },
        })
        .exec((err, orders) => {
          
          // here use ajax call of xhr is true then come all orders data in json format
          // xhr is flase then rendering admin orders web page 
          if (req.xhr) {
            return res.json(orders);
          }
          else{
            return res.render('admin/orders');
          }
        })
        
    },
  };
}

module.exports = orderController;
