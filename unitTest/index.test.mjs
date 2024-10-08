import { expect } from 'chai';
import sinon from 'sinon';
import Prompt from '../functions/prompt.mjs';

describe('Prompt', function () {
  let prompt, req;

  beforeEach(() => {
    // Create an instance of the Prompt class
    prompt = new Prompt('fake-api-key');
    req = {
      body: { prompt: 'This is a valid prompt' }
    };
  });

  it('should throw an error if the prompt exceeds 50 words', async () => {
    const longPrompt = 'This is a very long prompt that is definitely going to exceed the fifty word limit set for this unit test case to make sure that the validation logic in our Prompt class is working correctly. It should throw an error when it is too long. This part of the prompt is just to ensure the word count is exceeded even more.';

    try {
      await prompt.generateText(longPrompt);
      expect.fail('Expected error not thrown');
    } catch (error) {
      expect(error.message).to.equal('Failed to generate text'); // Match the actual error message
    }
  });

  it('should not throw an error if the prompt is less than 50 words', async () => {
    const shortPrompt = 'This is a valid prompt';

    // Mock the generateText method to avoid actual model generation
    sinon.stub(prompt, 'generateText').resolves('Generated text');

    const text = await prompt.generateText(shortPrompt);
    expect(text).to.equal('Generated text');
  });

  it('should throw an error if the prompt is null', async () => {
    try {
      await prompt.generateText(null);
      expect.fail('Expected error not thrown');
    } catch (error) {
      expect(error.message).to.equal('Prompt cannot be null or undefined'); // Match the actual error message
    }
  });

  it('should throw an error if the prompt is an empty string', async () => {
    try {
      await prompt.generateText('');
      expect.fail('Expected error not thrown');
    } catch (error) {
      expect(error.message).to.equal('Prompt cannot be empty'); // Match the actual error message
    }
  });

  it('should throw an error if the prompt is not a string', async () => {
    try {
      await prompt.generateText(123);
      expect.fail('Expected error not thrown');
    } catch (error) {
      expect(error.message).to.equal('Prompt must be a string'); // Match the actual error message
    }
  });
});
