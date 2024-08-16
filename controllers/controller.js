// controllers/controller.js
let promp;
const config = require('../config');
const path = require('path');
const { renderTemplateWithText } = require('../functions/template')

const loadModules = async () => {
  const { default: Promp } = await import('../functions/prompt.mjs');
  promp = new Promp(config.apiKey);
};

const generateText = async (req, res) => {
  const { prompt } = req.body;

  try {
    if (!promp) await loadModules(); // Ensure the module is loaded before using it

        // Path to the HTML template
        const templatePath = path.join(__dirname, '../contents/modal.html');

        // Generate text (replace this with your actual logic)
        let generatedText = await promp.generateText(prompt); // Replace with your text generation logic
        generatedText = generatedText.replace(/##/g, '<br>');
        // Render the template with the generated text
        const htmlContent = renderTemplateWithText(templatePath, generatedText);
    
        // Send the modified HTML content as the response
        res.send(htmlContent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating text');
  }
};

module.exports = {
  generateText,
};