# @custom-elements-json/helpers

> ⚠️ Very experimental and very unfinished

## Usage

```js
// Node
import { CustomElementsJson } from '@custom-elements-json/helpers';

const json = require('./custom-elements.json');
const customElementsJson = new CustomElementsJson(json);

// Browser
import { CustomElementsJson } from 'https://unpkg.com/@custom-elements-json/helpers';

const json = await (await fetch('./custom-elements.json')).json();
const customElementsJson = new CustomElementsJson(json);
```

### Methods

<hr>

#### `getByTagName`

Returns all information for element `<foo-bar>`.
```js
customElementsJson.getByTagName('foo-bar');
```

<hr>

#### `getByClass`

Returns all information for class `MyElement`.
```js
customElementsJson.getByClass('MyElement');
```

<hr>

#### `getClasses`

Returns all classes in a `custom-elements.json`
```js
customElementsJson.getClasses();
```

<hr>

#### `getMixins`

Returns all mixins in a `custom-elements.json`
```js
customElementsJson.getMixins();
```

<hr>

#### `getDefinitions`

Returns all custom element definitions in a `custom-elements.json`
```js
customElementsJson.getDefinitions();
```

<hr>

## Helper functions

Additionally the following helper functions are available. These functions can help you when developing custom tooling for `custom-elements.json`, and make your code more declarative.

Demo:

```js
import * as h from '@custom-elements-json/helpers';

const json = require('./custom-elements.json');

if (h.hasModules(json)) {
  json.modules.forEach(_module => {
    if (h.hasExports(_module)) {
      _module.exports.forEach(_export => {
        if (h.isClass(_export) && h.hasAttributes(_export)) {
          const attrs = _export.attributes;
          // do something with attributes
        }
      });
    }
  });
});

```

### Package
- `hasModules(package: PackageDoc) => boolean`

### Module
- `hasExports(module: ModuleDoc) => boolean`

### Export
- `isClass(export: ExportDoc) => boolean`
- `isMixin(export: ExportDoc) => boolean`
- `isFunction(export: ExportDoc) => boolean`
- `isVariable(export: ExportDoc) => boolean`
- `isDefinition(export: ExportDoc) => boolean`

### CustomElement
- `hasAttributes(customElement: CustomElementDoc) => boolean`
- `hasEvents(customElement: CustomElementDoc) => boolean`
- `hasSlots(customElement: CustomElementDoc) => boolean`
- `hasMethods(customElement: CustomElementDoc) => boolean`
- `hasFields(customElement: CustomElementDoc) => boolean`
- `hasMixins(customElement: CustomElementDoc) => boolean`

### ClassMember
- `isField(member: ClassMember) => boolean`
- `isMethod(member: ClassMember) => boolean`

## Contributing

Developing:

```bash
npm run tsc:watch
# in a separate terminal
npm run start
```

Testing:

```bash
npm test
```

## Usecases

- [x] Get all information for a given class (this should include the information of any superclasses or mixins)
- [x] Get all information for a given tagName (this should include the information of any superclasses or mixins)
- [x] Get all mixins
- [x] Get all classes
- [x] Get all definitions
- [ ] Get attributes for a given class or tagName
- [ ] Get properties for a given class or tagName
- [ ] Get cssProperties for a given class or tagName
- [ ] Get cssParts for a given class or tagName
- [ ] Get events for a given class or tagName
- [ ] Get slots for a given class or tagName
- more? What sort of things would be helpful? Create an issue if you have any ideas

## Goals

- It'd be nice to have this library be fully isomorphic (runs in node and the browser)