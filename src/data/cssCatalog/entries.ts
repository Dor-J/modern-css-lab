import atRules from './entries/at-rule.json'
import concepts from './entries/concept.json'
import dataTypes from './entries/data-type.json'
import descriptors from './entries/descriptor.json'
import functions from './entries/function.json'
import manifest from './entries/manifest.json'
import properties from './entries/property.json'
import pseudoClasses from './entries/pseudo-class.json'
import pseudoElements from './entries/pseudo-element.json'
import selectors from './entries/selector.json'
import values from './entries/value.json'
import type { CssCatalogEntry, CssCatalogKind, CssCatalogManifest } from './types'

export const cssCatalogManifest = manifest as CssCatalogManifest

export const cssCatalogEntries = [
  ...properties,
  ...atRules,
  ...descriptors,
  ...selectors,
  ...pseudoClasses,
  ...pseudoElements,
  ...functions,
  ...dataTypes,
  ...values,
  ...concepts,
] as CssCatalogEntry[]

export const cssCatalogKinds: CssCatalogKind[] = [
  'property',
  'at-rule',
  'descriptor',
  'selector',
  'pseudo-class',
  'pseudo-element',
  'function',
  'data-type',
  'value',
  'concept',
]

export const cssCatalogCategories = [
  'layout',
  'colors',
  'functions',
  'selectors',
  'typography',
  'motion',
  'components',
  'effects',
  'architecture',
] as const

const entryBySlug = new Map(cssCatalogEntries.map((entry) => [entry.slug, entry]))

export function getCssCatalogEntry(slug: string) {
  return entryBySlug.get(slug)
}

export function getCssCatalogEntriesByCategory(category: CssCatalogEntry['category']) {
  return cssCatalogEntries.filter((entry) => entry.category === category)
}
