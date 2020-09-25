import { ModuleDoc, ExportDoc } from './CustomElementsJson';

export function hasExports(_module: ModuleDoc): boolean {
  return Array.isArray(_module?.exports) && (_module?.exports.length > 0);
}

export function isClass(_export: ExportDoc): boolean {
  return _export.kind === 'class';
}

export function isDefinition(_export: ExportDoc): boolean {
  return _export.kind === 'definition';
}