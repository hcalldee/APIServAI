const express = require('express');
const config = require('./config'); // Assuming config is in CommonJS format

const app = express();
app.use(express.json());

let promp;

const loadModules = async () => {
  const { default: Promp } = await import('./prompt.mjs');
  promp = new Promp(config.apiKey);
};

app.post('/generate-text', async (req, res) => {
  const { prompt } = req.body;

  try {
    if (!promp) await loadModules(); // Ensure the module is loaded before using it

    const text = await promp.generateText(prompt);
    res.json({ text });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error generating text');
  }
});

app.listen(config.port, () => {
  console.log(`API service is running on http://localhost:${config.port}`);
});
