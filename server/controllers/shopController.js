const asyncHandler = require("express-async-handler");
const { Shops } = require("../models/shopModel");

// @desc Get all shops
// @route GET /api/shops
// @access public
const getShops = asyncHandler(async (req, res) => {
  const shops = await Shops.find();
  res.set('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(shops);
});

module.exports = { getShops };
