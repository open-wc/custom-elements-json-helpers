import { expect } from 'chai';
import { CustomElementsJson } from '../src/index';

const default_fixture = { version: '', modules: []};
const many_classes_and_superclasses = require('../fixtures/many_classes_and_superclasses.json');
const multiple_mixins = require('../fixtures/multiple_mixins.json');

describe('CustomElementsJson', () => {
  it('instantiates', () => {
    const customElementsJson = new CustomElementsJson(default_fixture);
    expect(customElementsJson.json).to.equal(default_fixture);
  });

  it('getByTagName', () => {
    const customElementsJson = new CustomElementsJson(many_classes_and_superclasses);
    expect(customElementsJson.getByTagName('c-c').name).to.equal('C');
    expect(customElementsJson.getByTagName('c-c').tagName).to.equal('c-c');

    expect(customElementsJson.getByTagName('a-a').name).to.equal('A');
    expect(customElementsJson.getByTagName('a-a').tagName).to.equal('a-a');
  });

  it('getByClassName', () => {
    const customElementsJson = new CustomElementsJson(many_classes_and_superclasses);
    expect(customElementsJson.getByClassName('C').name).to.equal('C');
    expect(customElementsJson.getByClassName('C').tagName).to.equal('c-c');

    expect(customElementsJson.getByClassName('A').name).to.equal('A');
    expect(customElementsJson.getByClassName('A').tagName).to.equal('a-a');
  });

  it('getByClassName - gets a superclass', () => {
    const customElementsJson = new CustomElementsJson(many_classes_and_superclasses);
    expect(customElementsJson.getByClassName('SuperB').name).to.equal('SuperB');
    expect(customElementsJson.getByClassName('SuperB').members!.length).to.equal(1);
  });

  it('getClasses - gets all classes', () => {
    const customElementsJson = new CustomElementsJson(many_classes_and_superclasses);
    expect(customElementsJson.getClasses().length).to.equal(4);
  });

  it('getDefinitions - gets all definitions', () => {
    const customElementsJson = new CustomElementsJson(many_classes_and_superclasses);
    expect(customElementsJson.getDefinitions().length).to.equal(2);
  });

  it('getMixins - gets all mixins', () => {
    const customElementsJson = new CustomElementsJson(multiple_mixins);
    expect(customElementsJson.getMixins().length).to.equal(2);
  });
});
