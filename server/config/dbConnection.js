const mongoose = require("mongoose");
const { Shops } = require("../models/shopModel");
const defData = require("./defualtData");

// local connect to mongo db
// const url = "mongodb://localhost:27017/delivery_app";
// global connect to mongo db cluster
const url = process.env.MONGODB_URI;

async function loadDefaultData() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const count = await Shops.countDocuments();
    if (count) return;
    await Shops.insertMany(defData);
    console.log("Default data inserted successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB or retrieving count", error);
  }
}

module.exports = loadDefaultData;
