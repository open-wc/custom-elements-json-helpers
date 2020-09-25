import { PackageDoc, ModuleDoc, DefinitionDoc, ExportDoc, ClassDoc, CustomElementDoc, VariableDoc, Reference } from './CustomElementsJson';
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

  getClasses(){
    const classes: ClassDoc[] = [];
    this.loopAllExports((_export) => {
      if (h.isClass(_export)) {
        classes.push(_export as ClassDoc);
      }
    });
    return classes;
  }

  getMixins(){
    let foundMixins = new Map();

    let _mixins: Reference[] = [];
    this.loopAllExports((_export) => {
      if (h.hasMixins(_export as CustomElementDoc)) {
        const { mixins } = _export as CustomElementDoc;

        [...<Reference[]>mixins].forEach((mixin) => {
          foundMixins.set(mixin.name, mixin);
        });
      }
    });

    this.loopAllExports((_export) => {
      if (h.isVariable(_export as VariableDoc)) {
        const mergedMixin = {
          ...foundMixins.get(_export.name),
          ..._export
        };

        _mixins.push(mergedMixin);
      }
    });

    return [...new Set([..._mixins])];
  }

  getDefinitions(){
    const definitions: DefinitionDoc[] = [];
    this.loopAllExports((_export) => {
      if (h.isDefinition(_export)) {
        definitions.push(_export as DefinitionDoc);
      }
    });
    return definitions;
  }
}

export * from './helpers';
