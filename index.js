// index.js
const express = require('express');
const config = require('./config'); // Assuming config is in CommonJS format
const router = require('./routes/router');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.listen(config.port, () => {
  console.log(`API service is running on http://localhost:${config.port}`);
});
