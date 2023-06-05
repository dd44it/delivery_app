const asyncHandler = require("express-async-handler");
const { Shops } = require("../models/shopModel");

// @desc Get all shops
// @route GET /api/shops
// @access public
const getShops = asyncHandler(async (req, res) => {
  console.log("here");
  const shops = await Shops.find();
  res.status(200).json(shops);
});

module.exports = { getShops };
