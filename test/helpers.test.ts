import { expect } from 'chai';
import {
  hasModules,
  isClass,
  hasExports,
  isDefinition,
  isFunction,
  isVariable,
  hasAttributes,
  hasEvents,
  hasSlots,
  hasMethods,
  hasFields,
  hasMixins,
  isField,
  isMethod,
} from '../src/helpers';
import { CustomElementDoc, ExportDoc, ModuleDoc, PackageDoc, ClassMember } from '../src/CustomElementsJson';

describe('helpers', () => {
  describe('PackageDoc', () => {
    describe('hasModules', () => {
      const fixture: PackageDoc = {version: '', modules: [{path: ''}]};

      it('hasModules - true', () => {
        expect(hasModules(fixture)).to.equal(true);
      });

      it('hasModules - false', () => {
        expect(hasModules({...fixture, modules: []})).to.equal(false);
      });
    });
  });

  describe('ModuleDoc', () => {
    describe('hasExports', () => {
      const fixture: ModuleDoc = {path: '', exports: [{kind: 'class', name: ''}]};

      it('hasExports - true', () => {
        expect(hasExports(fixture)).to.equal(true);
      });

      it('hasExports - false', () => {
        expect(hasExports({...fixture, exports: []})).to.equal(false);
      });
    });
  });

  describe('ExportDoc', () => {
    describe('isClass', () => {
      const fixture: ExportDoc = {kind: 'class', name: ''};

      it('isClass - true', () => {
        expect(isClass(fixture)).to.equal(true);
      });

      it('isClass - false', () => {
        expect(isClass({...fixture, kind: 'function'})).to.equal(false);
      });
    });

    describe('isFunction', () => {
      const fixture: ExportDoc = {kind: 'function', name: ''};

      it('isFunction - true', () => {
        expect(isFunction(fixture)).to.equal(true);
      });

      it('isFunction - false', () => {
        expect(isFunction({...fixture, kind: 'class'})).to.equal(false);
      });
    });

    describe('isVariable', () => {
      const fixture: ExportDoc = {kind: 'variable', name: ''};

      it('isVariable - true', () => {
        expect(isVariable(fixture)).to.equal(true);
      });

      it('isVariable - false', () => {
        expect(isVariable({...fixture, kind: 'class'})).to.equal(false);
      });
    });

    describe('isDefinition', () => {
      const fixture: ExportDoc = {kind: 'definition', name: '', declaration: {name:''}};

      it('isDefinition - true', () => {
        expect(isDefinition(fixture)).to.equal(true);
      });

      it('isDefinition - false', () => {
        expect(isDefinition({...fixture, kind: 'function'})).to.equal(false);
      });
    });
  });

  describe('CustomElementDoc', () => {
    const fixture: CustomElementDoc = {
      tagName: '',
      kind: 'class',
      name: '',
      attributes: [{name:'foo'}],
      events: [{name:'foo', description: '', type:'CustomEvent'}],
      slots: [{name: ''}],
      members: [{kind:'field', name:''}, {kind:'method', name:''}],
      mixins: [{name:''}]
    };

    describe('hasAttributes', () => {
      it('hasAttributes - true', () => {
        expect(hasAttributes(fixture)).to.equal(true);
      });

      it('hasAttributes - false', () => {
        expect(hasAttributes({...fixture, attributes: []})).to.equal(false);
      });
    });

    describe('hasEvents', () => {
      it('hasEvents - true', () => {
        expect(hasEvents(fixture)).to.equal(true);
      });

      it('hasEvents - false', () => {
        expect(hasEvents({...fixture, events: []})).to.equal(false);
      });
    });

    describe('hasSlots', () => {
      it('hasSlots - true', () => {
        expect(hasSlots(fixture)).to.equal(true);
      });

      it('hasSlots - false', () => {
        expect(hasSlots({...fixture, slots: []})).to.equal(false);
      });
    });

    describe('hasFields', () => {
      it('hasFields - true', () => {
        expect(hasFields({...fixture, members: [{kind:'field', name:''}]})).to.equal(true);
      });

      it('hasFields - false', () => {
        expect(hasFields({...fixture, members: []})).to.equal(false);
      });
    });

    describe('hasMethods', () => {
      it('hasMethods - true', () => {
        expect(hasMethods({...fixture, members: [{kind:'method', name:''}]})).to.equal(true);
      });

      it('hasMethods - false', () => {
        expect(hasMethods({...fixture, members: []})).to.equal(false);
      });
    });

    describe('hasMixins', () => {
      it('hasMixins - true', () => {
        expect(hasMixins(fixture)).to.equal(true);
      });

      it('hasMixins - false', () => {
        expect(hasMixins({...fixture, mixins: []})).to.equal(false);
      });
    });

    describe('isField', () => {
      const fixture: ClassMember = {kind: 'field', name: ''};

      it('isField - true', () => {
        expect(isField(fixture)).to.equal(true);
      });

      it('isField - false', () => {
        expect(isField({...fixture, kind: 'method'})).to.equal(false);
      });
    });

    describe('isMethod', () => {
      const fixture: ClassMember = {kind: 'method', name: ''};

      it('isMethod - true', () => {
        expect(isMethod(fixture)).to.equal(true);
      });

      it('isMethod - false', () => {
        expect(isMethod({...fixture, kind: 'field'})).to.equal(false);
      });
    });
  });
});
