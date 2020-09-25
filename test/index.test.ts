import { expect } from 'chai';
import { CustomElementsJson } from '../src/index';

const default_fixture = { version: '', modules: []};
const many_classes_and_superclasses = require('../fixtures/many_classes_and_superclasses.json');

describe('basic', () => {
  it('instantiates', () => {
    const customElementsJson = new CustomElementsJson(default_fixture);
    expect(customElementsJson.json).to.equal(default_fixture);
  });

  it('getByTagName', () => {
    const customElementsJson = new CustomElementsJson(many_classes_and_superclasses);
    expect(customElementsJson.getByTagName('c-c').name).to.equal('C');
    expect(customElementsJson.getByTagName('c-c').tagName).to.equal('c-c');
  });

  it('getByClassName', () => {
    const customElementsJson = new CustomElementsJson(many_classes_and_superclasses);
    expect(customElementsJson.getByClassName('C').name).to.equal('C');
    expect(customElementsJson.getByClassName('C').tagName).to.equal('c-c');
  });
});
