// config.js
require('dotenv').config(); // Load environment variables from .env file

const config = {
  apiKey: process.env.API_KEY,
  model: process.env.MODEL,
  port:process.env.PORT
};

module.exports = config;
