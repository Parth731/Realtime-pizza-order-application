const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    customerId: {
      // database me userId hai uske sath connect kiya hai
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
     name: {
      // database me userId hai uske sath connect kiya hai
      type: mongoose.Schema.Types.String,
      ref: "User",
      required: true,
    },
    items: {
      type: Object,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    paymenttype: {
      type: String,
      default: "COD",
    },
    status: {
      type: String,
      default: "order_placed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
