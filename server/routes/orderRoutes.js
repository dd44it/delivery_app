const express = require("express");
const router = express.Router();
const { orderProduct, getOrders } = require("../controllers/orderController");

router.route("/").post(orderProduct);
router.route("/orders/").post(getOrders);

module.exports = router;
