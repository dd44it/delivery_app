const axios = require('axios')

const handler = async (event) => {
  const { userAddress } = event.queryStringParameters;
  const API_SECRET = process.env.API_MAP;
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${userAddress}&lang=uk&type=amenity&format=json&limit=5&apiKey=${API_SECRET}`;
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
