/**
 * The top-level interface of a custom-elements.json file.
 *
 * custom-elements.json documents all the elements in a single npm package,
 * across all modules within the package. Elements may be exported from multiple
 * modules with re-exports, but as a rule, elements in this file should be
 * included once in the "canonical" module that they're exported from.
 */
export interface PackageDoc {
  version: string;

  /**
   * An array of the modules this package contains.
   */
  modules: Array<ModuleDoc>;
}

export interface ModuleDoc {
  path: string;

  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string;

  /**
   * A markdown description of the module.
   */
  description?: string;

  exports?: Array<ExportDoc>;
}

export type ExportDoc = ClassDoc | FunctionDoc | VariableDoc | CustomElementDefinitionDoc;

export interface CustomElementDefinitionDoc {
  kind: 'definition';
  /** Custom-element name */
  name: string;
  /** Reference to the class this custom element is registered with, and its module */
  declaration: Reference;
}

/**
 * A reference to an export of a module.
 *
 * All references are required to be publically accessible, so the canonical
 * representation of a reference is the export it's available from.
 */
export interface Reference {
  name: string;
  package?: string;
  module?: string;
}

/**
 * Description of a custom element class.
 *
 * Custom elements are JavaScript classes, so this extends from `ClassDoc` and
 * adds custom-element-specific features like attributes, events, and slots.
 *
 * Note that `tagName` in this interface is optional. Tag names are not
 * neccessarily part of a custom element class, but belong to the definition
 * (often called the "registration") or the `customElements.define()` call.
 *
 * Because classes and tag anmes can only be registered once, there's a
 * one-to-one relationship between classes and tag names. For ease of use,
 * we allow the tag name here.
 *
 * Some packages define and register custom elements in separate modules. In
 * these cases one `ModuleDoc` should contain the `CustomElementDoc` without a
 * tagName, and another `ModuleDoc` should contain the
 * `CustomElementDefintionDoc`.
 */
export interface CustomElementDoc extends ClassDoc {
  /**
   * An optional tag name that should be specified if this is a
   * self-registering element.
   *
   * Self-registering elements must also include a CustomElementDefintionDoc
   * in the module's exports.
   */
  tagName?: string;

  /**
   * The attributes that this element is known to understand.
   */
  attributes?: AttributeDoc[];

  /** The events that this element fires. */
  events?: EventDoc[];

  /**
   * The shadow dom content slots that this element accepts.
   */
  slots?: SlotDoc[];

  demos?: Demo[];
}

export interface AttributeDoc {
  name: string;

  /**
   * A markdown description for the attribute.
   */
  description?: string;

  /**
   * The type that the attribute will be serialized/deserialized as.
   */
  type?: string;

  /**
   * The default value of the attribute, if any.
   *
   * As attributes are always strings, this is the actual value, not a human
   * readable description.
   */
  defaultValue?: string;

  /**
   * The name of the field this attribute is associated with, if any.
   */
  fieldName?: string;
}

export interface EventDoc {
  name: string;

  /**
   * A markdown description of the event.
   */
  description?: string;

  /**
   * The type of the event object that's fired.
   *
   * If the event type is built-in, this is a string, e.g. `Event`,
   * `CustomEvent`, `KeyboardEvent`. If the event type is an event class defined
   * in a module, the reference to it.
   */
  type: Reference|string;

  /**
   * If the event is a CustomEvent, the type of `detail` field.
   */
  detailType?: string;
}

export interface SlotDoc {
  /**
   * The slot name, or the empty string for an unnamed slot.
   */
  name: string;

  /**
   * A markdown description of the part.
   */
  description?: string;
}

/**
 * The description of a CSS Part
 */
export interface CssPartDoc {
  name: string;

  /**
   * A markdown description for the CSS property.
   */
  description?: string;
}

export interface CssCustomPropertyDoc {
  /**
   * The name of the property, including leading `--`.
   */
  name: string;

  defaultValue?: string;

  /**
   * A markdown description for the attribute.
   */
  description?: string;
}

export interface ClassDoc {
  kind: 'class';
  name: string;

  /**
   * A markdown summary suitable for display in a listing.
   * TODO: restrictions on markdown/markup. ie, no headings, only inline
   *       formatting?
   */
  summary?: string;

  /**
   * A markdown description of the class.
   */
  description?: string;
  superclass?: Reference;
  mixins?: Array<Reference>;
  members?: Array<ClassMember>;
}

export type ClassMember = FieldDoc|MethodDoc;

export interface FieldDoc {
  kind: 'field';
  name: string;
  static?: boolean;

  /**
   * A markdown summary suitable for display in a listing.
   * TODO: restrictions on markdown/markup. ie, no headings, only inline
   *       formatting?
   */
  summary?: string;

  /**
   * A markdown description of the field.
   */
  description?: string;
  privacy?: Privacy;
  type?: string;
}

export interface MethodDoc extends FunctionLike {
  kind: 'method';

  static?: boolean;
}

/**
 * TODO: tighter definition of mixin:
 *  - Should it only accept a single argument?
 *  - Should it not extend ClassDoc so it doesn't has a superclass?
 *  - What's TypeScript's exact definition?
 */
export interface MixinDoc extends ClassDoc {}

export interface VariableDoc {
  kind: 'variable';

  name: string;

  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string;

  /**
   * A markdown description of the class.
   */
  description?: string;
  type?: string;
}

export interface FunctionDoc extends FunctionLike {
  kind: 'function';
}

export interface FunctionLike {
  name: string;

  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string;

  /**
   * A markdown description of the class.
   */
  description?: string;

  parameters?: {
    name: string,
    type?: string,
    description?: string,
  }[];

  return?: {
    type?: string,
    description?: string,
  };

  privacy?: Privacy;
  type?: string;
}

export type Privacy = 'public'|'private'|'protected';

export interface Demo {
  /**
   * A markdown description of the demo.
   */
  description?: string;

  /**
   * Relative URL of the demo if it's published with the package. Absolute URL
   * if it's hosted.
   */
  url: string;
}