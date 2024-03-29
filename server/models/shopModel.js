const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  shop: {
    type: String,
    required: true,
  },
});

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add the name shop"],
  },
  address: {
    type: String,
    required: [true, "Please add the address"],
  },
  products: [productSchema],
});

const Product = mongoose.model("Product", productSchema);
const Shops = mongoose.model("Shops", shopSchema);

module.exports = { Shops, Product, productSchema };
