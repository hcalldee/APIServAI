// OpenAIService.mjs
import { OpenAI } from 'openai';

class OpenAIService {
  constructor(apiKey) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  async generateText(prompt) {
    if (!prompt) {
      throw new Error('Prompt is required');
    }

    try {
      const response = await this.openai.completions.create({
        model: 'text-davinci-003', // Adjust the model as needed
        prompt: prompt,
        max_tokens: 100,
      });

      return response.choices[0].text.trim();
    } catch (error) {
      console.error('Error generating text:', error);
      throw error;
    }
  }
}

export default OpenAIService;
