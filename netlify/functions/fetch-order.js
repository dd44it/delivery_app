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
    const { name, email, phone, address, products, finalPrice } = event.queryStringParameters;
    if (!name || !email || !phone || !address || !products.length || !finalPrice) {
      return {statusCode: 400, error: "All fields are mandatory"}
    }
    try{
      const order = await Order.create({
        name,
        email,
        phone,
        address,
        products: JSON.parse(products),
        finalPrice
      });
      return {statusCode: 201, body: JSON.stringify(order)};
    }
    catch(error){
      console.log("Error posting data, error: ", error);
      return { statusCode: 404, body: "Error posting" };
    }

  } catch (error) {
    console.error("Error connecting to MongoDB or retrieving count", error);
    return { statusCode: 500, body: "Error connecting to MongoDB" };
  }
};