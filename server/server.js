const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const loadDefaultData = require("./config/dbConnection");

const app = express();
const port = 5000;

app.use(express.json());
loadDefaultData();
app.use("/api/shops", require("./routes/shopRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running: ${port}`);
});

