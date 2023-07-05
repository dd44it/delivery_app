const { productSchema } = require("./shopModel");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  products: [productSchema],
  finalPrice: {
    type: Number,
    required: true,
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
