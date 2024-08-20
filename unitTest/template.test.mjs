import { expect } from 'chai';
import sinon from 'sinon';
import fs from 'fs';
import { renderTemplateWithText } from '../functions/template.js'; // Adjust the path to your module

describe('renderTemplateWithText', () => {
  let readFileSyncStub;

  beforeEach(() => {
    // Stub fs.readFileSync before each test
    readFileSyncStub = sinon.stub(fs, 'readFileSync');
  });

  afterEach(() => {
    // Restore the original method after each test
    readFileSyncStub.restore();
  });

  it('should replace placeholder with provided text', () => {
    const templatePath = 'template.html';
    const text = 'Hello, world!';
    const templateHtml = '<div>${text}</div>';

    // Stub readFileSync to return the template HTML
    readFileSyncStub.withArgs(templatePath, 'utf8').returns(templateHtml);

    const result = renderTemplateWithText(templatePath, text);
    const expected = `<div>${text}</div>`;

    expect(result).to.equal(expected);
  });

  it('should throw an error if reading the template fails', () => {
    const templatePath = 'template.html';
    const text = 'Hello, world!';

    // Stub readFileSync to throw an error
    readFileSyncStub.withArgs(templatePath, 'utf8').throws(new Error('File not found'));

    expect(() => renderTemplateWithText(templatePath, text)).to.throw('Error rendering template');
  });
});
