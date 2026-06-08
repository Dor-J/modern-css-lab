import type {
  FeatureControl,
  FeatureSnippetTemplate,
  FeatureSupportQuery,
  FeatureTarget,
} from '../features'

export type CssCatalogKind =
  | 'property'
  | 'at-rule'
  | 'descriptor'
  | 'selector'
  | 'pseudo-class'
  | 'pseudo-element'
  | 'function'
  | 'data-type'
  | 'value'
  | 'concept'

export type CssCatalogCategory =
  | 'layout'
  | 'colors'
  | 'functions'
  | 'selectors'
  | 'typography'
  | 'motion'
  | 'components'
  | 'effects'
  | 'architecture'

export type CssCatalogStatus = 'standard' | 'deprecated' | 'experimental'

export type CssCatalogEntry = {
  slug: string
  title: string
  kind: CssCatalogKind
  syntax: string
  category: CssCatalogCategory
  status: CssCatalogStatus
  mdnUrl: string
  summary: string
  specNotes: string
  browserNotes: string
  fallbackStrategy: string
  tags: string[]
}

export type CssDemoSpec = {
  entrySlug: string
  controls: FeatureControl[]
  targets: FeatureTarget[]
  htmlTemplate: string
  cssRules: string
  snippetTemplates: FeatureSnippetTemplate[]
  computedProperties: string[]
  supportQueries: FeatureSupportQuery[]
  edgeCases: string[]
  accessibilityNotes: string[]
}

export type CssCatalogManifest = {
  source: string
  sourceUrl: string
  snapshotDate: string
  excluded: string[]
  totalEntries: number
  countsByKind: Record<CssCatalogKind, number>
}
