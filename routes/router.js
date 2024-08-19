// routes/router.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.post('/generate-text', controller.generateText);
router.post('/SimpanICD', controller.simpanICD);

module.exports = router;