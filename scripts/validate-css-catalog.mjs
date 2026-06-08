import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const entryDir = 'src/data/cssCatalog/entries'
const entryFiles = [
  'property.json',
  'at-rule.json',
  'descriptor.json',
  'selector.json',
  'pseudo-class.json',
  'pseudo-element.json',
  'function.json',
  'data-type.json',
  'value.json',
  'concept.json',
]

const errors = []
const entries = []

for (const file of entryFiles) {
  const path = join(entryDir, file)
  if (!existsSync(path)) {
    errors.push(`Missing catalog entry file: ${path}`)
    continue
  }
  const parsed = JSON.parse(readFileSync(path, 'utf8'))
  if (!Array.isArray(parsed)) {
    errors.push(`${path} must export a JSON array`)
    continue
  }
  entries.push(...parsed)
}

const manifest = JSON.parse(readFileSync(join(entryDir, 'manifest.json'), 'utf8'))
const slugs = new Set()

for (const entry of entries) {
  for (const field of [
    'slug',
    'title',
    'kind',
    'syntax',
    'category',
    'status',
    'mdnUrl',
    'summary',
    'specNotes',
    'browserNotes',
    'fallbackStrategy',
  ]) {
    if (!entry[field]) errors.push(`${entry.slug ?? entry.title ?? 'unknown'} is missing ${field}`)
  }

  if (slugs.has(entry.slug)) errors.push(`Duplicate slug: ${entry.slug}`)
  slugs.add(entry.slug)

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug)) {
    errors.push(`Route-unsafe slug: ${entry.slug}`)
  }

  if (!entry.mdnUrl?.startsWith('https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/')) {
    errors.push(`Invalid MDN URL for ${entry.slug}: ${entry.mdnUrl}`)
  }

  if (entry.title?.startsWith('-webkit-')) {
    errors.push(`Vendor-prefixed entry should be excluded: ${entry.title}`)
  }
}

if (manifest.totalEntries !== entries.length) {
  errors.push(`Manifest totalEntries ${manifest.totalEntries} does not match actual ${entries.length}`)
}

const demoSpecSource = readFileSync('src/data/cssCatalog/demoSpecs.ts', 'utf8')
for (const expected of [
  'createCssDemoSpec',
  'controlsFor',
  'htmlTemplate',
  'cssRules',
  'snippetTemplates',
  'computedProperties',
  'supportQueries',
  'edgeCases',
  'accessibilityNotes',
]) {
  if (!demoSpecSource.includes(expected)) errors.push(`Demo spec factory missing ${expected}`)
}

if (errors.length > 0) {
  console.error(`CSS catalog validation failed with ${errors.length} error(s):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`CSS catalog validation passed for ${entries.length} entries.`)
