const express = require('express');
const config = require('./config');
const OpenAIService = require('./prompt.mjs');

const app = express();
app.use(express.json());

const openAIService = new OpenAIService(config.openaiApiKey);

app.post('/generate-text', async (req, res) => {
  const { prompt } = req.body;

  try {
    const text = await openAIService.generateText(prompt);
    res.json({ text });
  } catch (error) {
    res.status(500).send('Error generating text');
  }
});

app.listen(config.port, () => {
  console.log(`API service is running on http://localhost:${config.port}`);
});
