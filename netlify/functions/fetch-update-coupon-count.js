const mongoose = require("mongoose");
const { Coupon } = require("../functions/models/couponModel");

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
      return {statusCode: 400, error: "Id is required"}
    }
    try{
      const coupon = await Coupon.findOne({ coupon_code: id });
      if (coupon.count) coupon.count -= 1;
      await coupon.save();
      return { statusCode: 200, body: JSON.stringify({ data: true, coupon }) }
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