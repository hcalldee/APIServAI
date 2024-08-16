const fs = require('fs');
const path = require('path');

const renderTemplateWithText = (templatePath, text) => {
  try {
    // Read the template HTML file
    const templateHtml = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholder in template with generated text
    const htmlContent = templateHtml.replace('${text}', text);

    return htmlContent;
  } catch (error) {
    console.error('Error reading or rendering template:', error);
    throw new Error('Error rendering template');
  }
};

module.exports = { renderTemplateWithText };
