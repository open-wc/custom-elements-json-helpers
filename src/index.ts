import { PackageDoc, ModuleDoc, DefinitionDoc, ExportDoc, ClassDoc, CustomElementDoc } from './CustomElementsJson';
import * as h from './helpers';

export class CustomElementsJson {
  public json: PackageDoc;
  private classes = new Map();
  private tagNames = new Map();

  constructor(customElementsJson: PackageDoc) {
    this.json = customElementsJson;
    this.init();
  }

  private loopAllExports(cb: (_export: ExportDoc) => void) {
    this.json.modules.forEach((_module: ModuleDoc) => {
      if(h.hasExports(_module)) {
        _module.exports!.forEach((_export: ExportDoc) => {
          cb(_export);
        });
      }
    });
  }

  private init() {
    this.loopAllExports((_export) => {
      if (h.isClass(_export)) {
        const klass = _export as ClassDoc;
        this.classes.set(klass.name, klass);
      }
    });

    this.loopAllExports((_export) => {
      if (h.isDefinition(_export)) {
        const definition = _export as DefinitionDoc;
        this.tagNames.set(definition.name, this.classes.get(definition.declaration.name));
      }
    });
  }

  getByTagName(tagName: string): CustomElementDoc {
    return this.tagNames.get(tagName);
  }

  getByClassName(className: string): CustomElementDoc {
    return this.classes.get(className);
  }
}

const customElementsJson = new CustomElementsJson(require('../fixtures/many_classes_and_superclasses.json'));
console.log(customElementsJson.getByTagName('c-c'));
console.log(customElementsJson.getByClassName('C'));