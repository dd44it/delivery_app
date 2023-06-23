const asyncHandler = require("express-async-handler");
const { Coupon } = require("../models/couponModel");

// @desc Get all coupon
// @route GET /api/coupons/
// @access public
const getCoupons = asyncHandler(async (req, res) => {
  const coupon = await Coupon.find();
  res.set("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(coupon);
});

// @desc Get coupon by code
// @route GET /api/coupons/:id
// @access public

const getCoupon = asyncHandler(async (req, res) => {
  console.log("req.params:", req.params);
  const coupon = await Coupon.findOne({ coupon_code: req.params.id });
  if (!coupon) {
    res.status(200).json({ data: false });
  }
  if (coupon.count) {
    res.status(200).json({ data: true, coupon });
  } else {
    res.status(200).json({ data: false, coupon });
  }
});

// @desc Update coupon
// @route PUT /api/coupons/:id
// @access public

const updateCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findOne({ coupon_code: req.params.id });
  if (!coupon) {
    res.status(200).json({ data: false });
  }
  // Update the count property of the coupon
  if (coupon.count) coupon.count -= 1;

  await coupon.save();
  res.status(200).json({ data: true, coupon });
});

module.exports = { getCoupons, updateCoupon, getCoupon };
