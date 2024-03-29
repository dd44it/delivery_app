const asyncHandler = require("express-async-handler");
const { Order } = require("../models/orderModel");

// @desc Post order of user
// @route POST /api/order
// @access public
const orderProduct = asyncHandler(async (req, res) => {
  const { name, email, phone, address, products, finalPrice } = req.body;
  if (!name || !email || !phone || !address || !products.length || !finalPrice) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const order = await Order.create({
    name,
    email,
    phone,
    address,
    products,
    finalPrice
  });
  res.set("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.status(201).json(order);
});

const getOrders = asyncHandler(async (req, res) => {
  const { email, phone } = req.body;
  if (!email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await Order.find({ email, phone });
  res.set("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  const filerItems = userAvailable.map(item => { return { finalPrice: item.finalPrice, products: item.products } });
  res.status(201).json(filerItems);
})

module.exports = { orderProduct, getOrders };
