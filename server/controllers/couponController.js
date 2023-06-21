const asyncHandler = require("express-async-handler");
const { Coupon } = require("../models/couponModel");

// @desc Get all coupon
// @route GET /api/coupon
// @access public
const getCoupons = asyncHandler(async (req, res) => {
  const coupon = await Coupon.find();
  res.set('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(coupon);
});

module.exports = { getCoupons };
