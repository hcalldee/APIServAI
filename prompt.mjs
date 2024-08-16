import { GoogleGenerativeAI } from '@google/generative-ai';

export default class Promp {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async generateText(prompt) {
    try {
      // Append additional instructions to the prompt
      const additionalInstructions = `
        buatkan referensi ICD-10 yang paling relevan. 
        kemudian buat prakiraan tarif inacbgs untuk rumah sakit tipe c 
        di daerah kalimantan selatan, kab banjar. 
        return only icd-10 serta deskripsi pendek dan hanya prakiraan tarif dalam rupiah, 
        return dalam 100 kata saja`;

      // Check if the initial prompt is less than 50 words
      const wordCount = prompt.split(' ').length;
      if (wordCount >= 50) {
        throw new Error('Prompt exceeds the maximum length of 50 words');
      }

      const fullPrompt = prompt + additionalInstructions;

      // Generate content using the model
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const text = await response.text();
      return text;
    } catch (error) {
      console.error('Error generating text:', error);
      throw new Error('Failed to generate text');
    }
  }
}
