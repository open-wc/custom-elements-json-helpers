# @custom-elements-json/helpers

> ⚠️ Experimental

## Development

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

- Get all information for a given class (this should include the information of any superclasses or mixins)
- Get all information for a given tagName (this should include the information of any superclasses or mixins)
- Get attributes for a given class or tagName
- Get properties for a given class or tagName
- Get cssProperties for a given class or tagName
- Get cssParts for a given class or tagName
- Get events for a given class or tagName
- Get slots for a given class or tagName
- more? What sort of things would be helpful? Create an issue if you have any ideas

## Goals

- It'd be nice to have this library be fully isomorphic (runs in node and the browser)