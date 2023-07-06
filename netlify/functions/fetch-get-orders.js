const mongoose = require("mongoose");
const { Order } = require("./models/orderModel");

const uri = process.env.MONGODB_URI;

exports.handler = async function(event, context) {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    const { email, phone } = event.queryStringParameters;
    if (!email || !phone ) {
      return {statusCode: 400, error: "All fields are mandatory"}
    }
    try{
      const orderAvailable = await Order.find({ email, phone });
      const filerItems = orderAvailable.map(item => { return { finalPrice: item.finalPrice, products: item.products } });
      return { statusCode: 201, body: JSON.stringify(filerItems) }
    }
    catch(error){
      console.log("Error get data, error: ", error);
      return { statusCode: 404, body: "Error get, error: " + error };
    }

  } catch (error) {
    console.error("Error connecting to MongoDB or retrieving count", error);
    return { statusCode: 500, body: "Error connecting to MongoDB" };
  }
};