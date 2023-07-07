const mongoose = require("mongoose");
const { Coupon } = require("./models/couponModel");

const uri = process.env.MONGODB_URI;

exports.handler = async function(event, context) {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    const { id } = event.queryStringParameters;
    if (!id) {
      return { statusCode: 400, error: "This id not found" }
    }
    try{
      const coupon = await Coupon.findOne({ coupon_code: id });
      if (!coupon) {
        return { statusCode: 200, body: { data: false } }
      }
      if (coupon.count) {
        return { statusCode: 200, body: JSON.stringify({ data: true, coupon }) }
      } else {
        return { statusCode: 200, body: JSON.stringify({ data: false, coupon }) }
      }
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