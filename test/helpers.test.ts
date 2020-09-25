import { expect } from 'chai';
import { isClass, hasExports, isDefinition } from '../src/helpers';
import { ExportDoc, ModuleDoc } from '../src/CustomElementsJson';

describe('helpers', () => {
  describe('isClass', () => {
    it('isClass - true', () => {
      const fixture: ExportDoc = {kind: 'class', name: ''};
      expect(isClass(fixture)).to.equal(true);
    });

    it('isClass - false', () => {
      const fixture: ExportDoc = {kind: 'function', name: ''};
      expect(isClass(fixture)).to.equal(false);
    });
  });

  describe('isDefinition', () => {
    it('isDefinition - true', () => {
      const fixture: ExportDoc = {kind: 'definition', name: '', declaration: {name:''}};
      expect(isDefinition(fixture)).to.equal(true);
    });

    it('isDefinition - false', () => {
      const fixture: ExportDoc = {kind: 'function', name: '', declaration: {name:''}};
      expect(isDefinition(fixture)).to.equal(false);
    });
  });

  describe('hasExports', () => {
    it('hasExports - true', () => {
      const fixture: ModuleDoc = {path: '', exports: [{kind:'class', name: ''}]};
      expect(hasExports(fixture)).to.equal(true);
    });

    it('hasExports - false, no exports', () => {
      const fixture: ModuleDoc = {path: ''};
      expect(hasExports(fixture)).to.equal(false);
    });

    it('hasExports - false, empty array', () => {
      const fixture: ModuleDoc = {path: '', exports: []};
      expect(hasExports(fixture)).to.equal(false);
    });
  });
});
