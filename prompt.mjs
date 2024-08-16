// prompt.mjs
export default class OpenAIService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async generateText(prompt, token) {
    if (!prompt) {
      throw new Error('Prompt is required');
    }

    if (!token) {
      throw new Error('Token is required');
    }

    // Validate that the token is less than 50 words
    const tokenWordCount = token.trim().split(/\s+/).length;
    if (tokenWordCount > 50) {
      throw new Error('Token must be less than 50 words');
    }

    // Replace this with your actual API request logic
    try {
      // Mock API response for demonstration
      const response = await this.mockApiRequest(prompt, token);
      return response.data.choices[0].text;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async mockApiRequest(prompt, token) {
    // Simulate an API request
    if (token !== 'valid-token') {
      throw new Error('Invalid token');
    }
    return { data: { choices: [{ text: 'Generated text' }] } };
  }
}
