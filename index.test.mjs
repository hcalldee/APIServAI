// index.test.mjs
import { expect } from 'chai';
import sinon from 'sinon';
import OpenAIService from './prompt.mjs'; // Adjust path as needed

describe('OpenAIService', () => {
  let openAIService;

  beforeEach(() => {
    openAIService = new OpenAIService('fake-api-key');
  });

  it('should throw an error if prompt is not provided', async () => {
    try {
      await openAIService.generateText(null, 'valid-token');
    } catch (error) {
      expect(error.message).to.equal('Prompt is required');
    }
  });

  it('should throw an error if token is not provided', async () => {
    try {
      await openAIService.generateText('Hello');
    } catch (error) {
      expect(error.message).to.equal('Token is required');
    }
  });

  it('should throw an error if token is more than 50 words', async () => {
    const longToken = 'word '.repeat(51).trim(); // Token with 51 words
    try {
      await openAIService.generateText('Hello', longToken);
    } catch (error) {
      expect(error.message).to.equal('Token must be less than 50 words');
    }
  });

  it('should return generated text', async () => {
    const fakeResponse = {
      data: {
        choices: [{ text: 'Fake generated text' }],
      },
    };

    sinon.stub(OpenAIService.prototype, 'mockApiRequest').resolves(fakeResponse);

    const text = await openAIService.generateText('Hello', 'valid-token');
    expect(text).to.equal('Fake generated text');

    sinon.restore();
  });

  it('should handle errors from the OpenAI API', async () => {
    sinon.stub(OpenAIService.prototype, 'mockApiRequest').throws(new Error('API error'));

    try {
      await openAIService.generateText('Hello', 'valid-token');
    } catch (error) {
      expect(error.message).to.equal('API error');
    }

    sinon.restore();
  });

  it('should handle invalid tokens', async () => {
    sinon.stub(OpenAIService.prototype, 'mockApiRequest').throws(new Error('Invalid token'));

    try {
      await openAIService.generateText('Hello', 'invalid-token');
    } catch (error) {
      expect(error.message).to.equal('Invalid token');
    }

    sinon.restore();
  });
});
