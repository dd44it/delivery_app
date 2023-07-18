const axios = require('axios')

const handler = async (event) => {
  const API_SECRET = process.env.API_MAP;
  const userIp = event.headers['client-ip'];
  let url =`https://api.geoapify.com/v1/ipinfo?apiKey=${API_SECRET}`;

  if(userIp !== '127.0.0.1'){
    url +=`&ip=${userIp}`;
  }

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