const express = require("express");
const router = express.Router();
const { orderProduct } = require("../controllers/orderController");

router.route("/").post(orderProduct);

module.exports = router;
