// config.js
require('dotenv').config();

const config = {
    port: process.env.PORT,
    openaiApiKey: process.env.API_KEY,
    // You can add more configurations here if needed
  };
  
  module.exports = config;