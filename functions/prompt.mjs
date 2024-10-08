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
          buatkan hanya 3 atau kurang referensi ICD-10 yang paling relevan. 
          kemudian buat prakiraan tarif inacbgs pasien rawat jalan untuk rumah sakit tipe c 
          di daerah kalimantan selatan, kab banjar. 
          return only icd-10 serta deskripsi pendek dan hanya prakiraan tarif dalam rupiah, 
          return dalam 100 kata saja. {{Return dalam bentuk table html beri class html khusus 
          "ICD-items" untuk data kode ICD, bagian prakiraan tarif dalam
          tag paragraf html dengan id "panel-body-content" dan sytle "white-space: pre-line;"}}`;
  
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
      if (prompt === null || prompt === undefined) {
        throw new Error('Prompt cannot be null or undefined');
      }
      if (typeof prompt !== 'string') {
        throw new Error('Prompt must be a string');
      }
      if (prompt.trim() === '') {
        throw new Error('Prompt cannot be empty');
      }
      else{
        throw new Error('Failed to generate text');
      }
    }
  }
}
