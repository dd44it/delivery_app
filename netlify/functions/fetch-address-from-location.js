const axios = require('axios')

const handler = async (event) => {
  const { lat, lon } = event.queryStringParameters;
  const API_SECRET = process.env.API_MAP;
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${+lat}&lon=${+lon}&format=json&apiKey=${API_SECRET}&lang=uk`;

  try {
    const { data } = await axios.get(url);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    const { status, statusText, headers, data } = error.response;
    return {
      statusCode: status,
      body: JSON.stringify({ status, statusText, headers, data }),
    }
  }
}

module.exports = { handler }
