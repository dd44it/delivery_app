const axios = require('axios')

const handler = async (event) => {
  const { address } = event.queryStringParameters;
  const API_SECRET = process.env.API_MAP;
  console.log("API_SECRET", API_SECRET)
  const url = `https://api.geoapify.com/v1/geocode/search?text=${address}&format=json&apiKey=${API_SECRET}`;

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
