const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  shop: {
    type: String,
    required: true,
  },
  coupon_code: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  }
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = { Coupon };
