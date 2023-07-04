const mongoose = require("mongoose");
const { Shops } = require("../functions/models/shopModel");

const uri = process.env.MONGODB_URI;

exports.handler = async function(event, context) {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    const shops = await Shops.find();
    return { statusCode: 200, body: JSON.stringify(shops) }
  } catch (error) {
    console.error("Error connecting to MongoDB or retrieving count", error);
    return { statusCode: 500, body: "Error connecting to MongoDB" };
  }
};
