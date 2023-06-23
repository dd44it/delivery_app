const express = require("express");
const router = express.Router();
const { getCoupons, updateCoupon, getCoupon } = require("../controllers/couponController");

router.route("/").get(getCoupons);
router.route("/:id").put(updateCoupon);
router.route("/:id").get(getCoupon);

module.exports = router;
