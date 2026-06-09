import manifest from './entries/manifest.json'
import type { CssCatalogCategory, CssCatalogEntry, CssCatalogKind, CssCatalogManifest } from './types'

type CatalogJsonModule = {
  default: unknown
}

export const cssCatalogManifest = manifest as CssCatalogManifest

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

export const cssCatalogCategoryCounts: Record<CssCatalogCategory, number> = {
  layout: 20,
  colors: 22,
  functions: 91,
  selectors: 119,
  typography: 15,
  motion: 21,
  components: 1,
  effects: 12,
  architecture: 567,
}

const entryLoaders = {
  property: () => import('./entries/property.json'),
  'at-rule': () => import('./entries/at-rule.json'),
  descriptor: () => import('./entries/descriptor.json'),
  selector: () => import('./entries/selector.json'),
  'pseudo-class': () => import('./entries/pseudo-class.json'),
  'pseudo-element': () => import('./entries/pseudo-element.json'),
  function: () => import('./entries/function.json'),
  'data-type': () => import('./entries/data-type.json'),
  value: () => import('./entries/value.json'),
  concept: () => import('./entries/concept.json'),
} satisfies Record<CssCatalogKind, () => Promise<CatalogJsonModule>>

const kindEntryCache = new Map<CssCatalogKind, Promise<CssCatalogEntry[]>>()
let allEntriesCache: Promise<CssCatalogEntry[]> | undefined

export function loadCssCatalogKind(kind: CssCatalogKind) {
  const cached = kindEntryCache.get(kind)
  if (cached) return cached

  const promise = entryLoaders[kind]().then((module) => module.default as CssCatalogEntry[])
  kindEntryCache.set(kind, promise)
  return promise
}

export function loadAllCssCatalogEntries() {
  allEntriesCache ??= Promise.all(cssCatalogKinds.map((kind) => loadCssCatalogKind(kind))).then((chunks) =>
    chunks.flat(),
  )

  return allEntriesCache
}

export async function loadCssCatalogEntry(slug: string) {
  const allEntries = await allEntriesCache
  const cachedEntry = allEntries?.find((entry) => entry.slug === slug)
  if (cachedEntry) return cachedEntry

  for (const kind of cssCatalogKinds) {
    const entries = await loadCssCatalogKind(kind)
    const entry = entries.find((candidate) => candidate.slug === slug)
    if (entry) return entry
  }

  return undefined
}

export async function loadCssCatalogEntriesByCategory(category: CssCatalogCategory) {
  const entries = await loadAllCssCatalogEntries()
  return entries.filter((entry) => entry.category === category)
}
