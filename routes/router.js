// routes/router.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.post('/generate-text', controller.generateText);

module.exports = router;