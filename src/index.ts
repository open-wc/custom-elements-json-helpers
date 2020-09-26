import { PackageDoc, ModuleDoc, CustomElementDefinitionDoc, ExportDoc, ClassDoc, CustomElementDoc, VariableDoc, Reference } from './CustomElementsJson';
import * as h from './helpers';


export class CustomElementsJson {
  public json: PackageDoc;
  private classes = new Map();
  private tagNames = new Map();
  private mixins = new Map();

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

  private initClasses() {
    this.loopAllExports((_export) => {
      if (h.isClass(_export)) {
        const klass = _export as ClassDoc;
        this.classes.set(klass.name, klass);
      }
    });
  }

  private initDefinitions() {
    this.loopAllExports((_export) => {
      if (h.isDefinition(_export)) {
        const definition = _export as CustomElementDefinitionDoc;
        this.tagNames.set(definition.name, this.classes.get(definition.declaration.name));
      }
    });
  }

  private initMixins() {
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

    [...new Set([..._mixins])].forEach((mixin) => {
      this.mixins.set(mixin.name, mixin);
    });
  }

  private init() {
    this.initClasses();
    this.initDefinitions();
    this.initMixins();
  }

  getByTagName(tagName: string): CustomElementDoc {
    return this.tagNames.get(tagName);
  }

  getByClassName(className: string): CustomElementDoc {
    return this.classes.get(className);
  }

  getClasses(){
    const classes = [];
    for(let[key, val] of this.classes) {
      classes.push(val);
    }
    return classes;
  }

  getMixins(){
    const mixins = [];
    for(let[key, val] of this.mixins) {
      mixins.push(val);
    }
    return mixins;
  }

  getDefinitions(){
    const definitions: CustomElementDefinitionDoc[] = [];
    this.loopAllExports((_export) => {
      if (h.isDefinition(_export)) {
        definitions.push(_export as CustomElementDefinitionDoc);
      }
    });
    return definitions;
  }

  getInheritanceTree(className: string) {
    const tree: ClassDoc[] = [];

    let klass = this.classes.get(className);

    if(klass) {
      tree.push(klass);

      if(h.hasMixins(klass)) {
        klass.mixins.forEach((mixin: VariableDoc) => {
          tree.push(this.mixins.get(mixin.name));
        });
      }

      while(this.classes.has(klass.superclass.name)) {
        const newKlass = this.classes.get(klass.superclass.name)

        if(h.hasMixins(newKlass)) {
          newKlass.mixins.forEach((mixin: VariableDoc) => {
            tree.push(this.mixins.get(mixin.name));
          });
        }

        tree.push(newKlass);
        klass = newKlass;
      }

      return tree;
    } else {
      return [];
    }
  }
}

const json = require('../fixtures/inheritance/superclasses_and_mixins/custom-elements.json');
const customElementsJson = new CustomElementsJson(json);
console.log(customElementsJson.getInheritanceTree('MyComponent'));


export * from './helpers';
