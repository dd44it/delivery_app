const express = require("express");
const router = express.Router();
const { getShops } = require("../controllers/shopController");

router.route("/").get(getShops);

module.exports = router;
