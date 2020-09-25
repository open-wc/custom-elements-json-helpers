import { ModuleDoc, ExportDoc, PackageDoc, CustomElementDoc, ClassMember } from './CustomElementsJson';

/** PackageDoc */
export function hasModules(_package: PackageDoc): boolean {
  return Array.isArray(_package?.modules) && (_package?.modules.length > 0);
}

/** ModuleDoc */
export function hasExports(_module: ModuleDoc): boolean {
  return Array.isArray(_module?.exports) && (_module?.exports.length > 0);
}

/** ExportDoc */
export function isClass(_export: ExportDoc): boolean {
  return _export.kind === 'class';
}

export function isMixin(_export: ExportDoc): boolean {
  return _export.kind === 'mixin';
}

export function isFunction(_export: ExportDoc): boolean {
  return _export.kind === 'function';
}

export function isVariable(_export: ExportDoc): boolean {
  return _export.kind === 'variable';
}

export function isDefinition(_export: ExportDoc): boolean {
  return _export.kind === 'definition';
}

/** CustomElementDoc */
export function hasAttributes(customElement: CustomElementDoc): boolean {
  return Array.isArray(customElement?.attributes) && (customElement?.attributes.length > 0);
}

export function hasEvents(customElement: CustomElementDoc): boolean {
  return Array.isArray(customElement?.events) && (customElement?.events.length > 0);
}

export function hasSlots(customElement: CustomElementDoc): boolean {
  return Array.isArray(customElement?.slots) && (customElement?.slots.length > 0);
}

export function hasMethods(customElement: CustomElementDoc): boolean {
  return Array.isArray(customElement?.members) && (customElement?.members.length > 0) && customElement?.members.some(member => member.kind === "method");
}

export function hasFields(customElement: CustomElementDoc): boolean {
  return Array.isArray(customElement?.members) && (customElement?.members.length > 0) && customElement?.members.some(member => member.kind === "field");
}

export function hasMixins(customElement: CustomElementDoc): boolean {
  return Array.isArray(customElement?.mixins) && (customElement?.mixins.length > 0);
}

/** ClassMember */
export function isField(member: ClassMember): boolean {
  return member.kind === "field";
}

export function isMethod(member: ClassMember): boolean {
  return member.kind === "method";
}
