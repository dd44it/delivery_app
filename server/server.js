const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const loadDefaultData = require("./config/dbConnection");

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
loadDefaultData();
app.use("/api/shops", require("./routes/shopRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));
app.use("/api/coupons", require("./routes/couponRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running: ${port}`);
});

