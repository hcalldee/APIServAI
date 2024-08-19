// controllers/controller.js
let promp;
const config = require('../config');
const path = require('path');
const { renderTemplateWithText } = require('../functions/template')
const { insertDiagnosaPasien,checkRecordExists } = require('../functions/database');

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


const simpanICD = async (req, res) => {
  const { no_rawat, kode_icd } = req.body;

  try {
    const exists = await checkRecordExists(no_rawat, kode_icd);
    if (exists) {
      return res.status(400).json({ success: false, message: 'Record already exists' });
    }

    await insertDiagnosaPasien(no_rawat, kode_icd);
    res.json({ success: true, message: 'Data inserted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error processing request' });
  }
};

module.exports = {
  generateText,
  simpanICD
};