const mongoose = require("mongoose");
const { Shop } = require("../models/shopModel");
const defData = require("./defualtData");

const url = "mongodb://localhost:27017/delivery_app";

async function connectToDB() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

async function loadDefaultData() {
  try {
    await connectToDB();
    const count = await Shop.countDocuments({});
    console.log("count", count);
    if (count) return;
    await Shop.insertMany(defData);
    console.log("Default data inserted successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB or retrieving count", error);
  }
}

module.exports = loadDefaultData;
