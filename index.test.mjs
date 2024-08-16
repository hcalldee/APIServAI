// index.test.mjs
import { expect } from 'chai';
import sinon from 'sinon';

// Import your module
import OpenAIService from './prompt.mjs'; // Adjust path as needed

describe('OpenAIService', () => {
  let openAIService;

  beforeEach(() => {
    openAIService = new OpenAIService('fake-api-key');
  });

  it('should throw an error if prompt is not provided', async () => {
    try {
      await openAIService.generateText();
    } catch (error) {
      expect(error.message).to.equal('Prompt is required');
    }
  });

  it('should return generated text', async () => {
    const fakeResponse = {
      data: {
        choices: [{ text: 'Fake generated text' }],
      },
    };

    sinon.stub(OpenAIService.prototype, 'generateText').resolves(fakeResponse.data.choices[0].text);

    const text = await openAIService.generateText('Hello');
    expect(text).to.equal('Fake generated text');

    sinon.restore();
  });

  it('should handle errors from the OpenAI API', async () => {
    sinon.stub(OpenAIService.prototype, 'generateText').throws(new Error('API error'));

    try {
      await openAIService.generateText('Hello');
    } catch (error) {
      expect(error.message).to.equal('API error');
    }

    sinon.restore();
  });
});
