const express = require("express");
const router = express.Router();
const { getCoupons } = require("../controllers/couponController");

router.route("/").get(getCoupons);

module.exports = router;
