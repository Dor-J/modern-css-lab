import type { FeatureControl, FeatureSupportQuery } from '../features'
import type { CssCatalogEntry, CssDemoSpec } from './types'

const defaultSupportQueryFor = (entry: CssCatalogEntry): FeatureSupportQuery[] => {
  const syntax = entry.syntax

  if (entry.kind === 'selector' || entry.kind === 'pseudo-class' || entry.kind === 'pseudo-element') {
    return [
      {
        id: `${entry.slug}-selector-support`,
        label: syntax,
        query: `selector(${syntax.includes(' ') ? ':is(*)' : syntax})`,
        syntax,
      },
    ]
  }

  if (entry.kind === 'property') {
    const property = entry.title
    return [
      {
        id: `${entry.slug}-property-support`,
        label: property,
        query: `(${property}: var(--demo-value))`,
        syntax,
        note: 'If the property requires a special value grammar, the demo also exposes the authored fallback path.',
      },
    ]
  }

  if (entry.kind === 'function') {
    return [
      {
        id: `${entry.slug}-function-support`,
        label: syntax,
        query: `(width: ${syntax.includes('()') ? syntax.replace('()', '(1px)') : syntax})`,
        syntax,
        note: 'Function support depends on the consuming property value grammar.',
      },
    ]
  }

  return [
    {
      id: `${entry.slug}-syntax-support`,
      label: syntax,
      syntax,
      note: 'This syntax is not reliably detectable with CSS.supports(); the playground treats it as syntax preview plus fallback.',
    },
  ]
}

const controlsFor = (entry: CssCatalogEntry): FeatureControl[] => [
  {
    id: 'demoValue',
    label: 'Feature value',
    type: 'select',
    cssVar: '--demo-value',
    defaultValue: valueFor(entry, 'primary'),
    options: [
      { label: 'Primary', value: valueFor(entry, 'primary') },
      { label: 'Alternate', value: valueFor(entry, 'alternate') },
      { label: 'Fallback', value: valueFor(entry, 'fallback') },
    ],
  },
  {
    id: 'intensity',
    label: 'Intensity',
    type: 'range',
    cssVar: '--demo-intensity',
    defaultValue: '1',
    min: 0.5,
    max: 1.8,
    step: 0.05,
  },
  {
    id: 'space',
    label: 'Spacing',
    type: 'range',
    cssVar: '--demo-space',
    defaultValue: '1',
    min: 0.5,
    max: 2.5,
    step: 0.05,
    unit: 'rem',
  },
]

function valueFor(entry: CssCatalogEntry, mode: 'primary' | 'alternate' | 'fallback') {
  const title = entry.title.toLowerCase()

  if (entry.kind === 'selector' || entry.kind === 'pseudo-class' || entry.kind === 'pseudo-element') {
    return mode === 'primary' ? 'var(--color-accent)' : mode === 'alternate' ? 'var(--color-accent-2)' : 'var(--surface-3)'
  }

  if (/color|palette|fill|stroke|accent/.test(title)) {
    return mode === 'primary' ? 'oklch(62% 0.21 286)' : mode === 'alternate' ? 'oklch(68% 0.16 165)' : '#6d5dfc'
  }

  if (/width|height|size|gap|margin|padding|inset|radius|spacing|offset|position|top|right|bottom|left/.test(title)) {
    return mode === 'primary' ? '2rem' : mode === 'alternate' ? '4rem' : '1rem'
  }

  if (/duration|delay|time/.test(title)) {
    return mode === 'primary' ? '600ms' : mode === 'alternate' ? '1200ms' : '250ms'
  }

  if (/display/.test(title)) {
    return mode === 'primary' ? 'grid' : mode === 'alternate' ? 'flex' : 'block'
  }

  if (/font|text/.test(title)) {
    return mode === 'primary' ? 'clamp(1rem, 3vw, 2rem)' : mode === 'alternate' ? '1.25rem' : '1rem'
  }

  if (/transform|rotate|scale|translate/.test(title)) {
    return mode === 'primary' ? 'rotate(6deg) scale(1.04)' : mode === 'alternate' ? 'translateY(-0.5rem)' : 'none'
  }

  if (/opacity/.test(title)) {
    return mode === 'primary' ? '0.72' : mode === 'alternate' ? '1' : '0.5'
  }

  if (entry.kind === 'function') {
    return mode === 'primary' ? functionValue(entry) : mode === 'alternate' ? 'calc(100% - 2rem)' : 'auto'
  }

  return mode === 'primary' ? 'initial' : mode === 'alternate' ? 'inherit' : 'unset'
}

function functionValue(entry: CssCatalogEntry) {
  const name = entry.title.replace(/\(\)$/, '')
  const numeric = new Set(['abs', 'acos', 'asin', 'atan', 'atan2', 'cos', 'sin', 'tan', 'exp', 'hypot', 'log', 'mod', 'pow', 'rem', 'round', 'sign', 'sqrt'])
  if (name === 'clamp') return 'clamp(1rem, 4vw, 3rem)'
  if (name === 'min') return 'min(50%, 18rem)'
  if (name === 'max') return 'max(12rem, 40%)'
  if (name === 'calc') return 'calc(100% - 2rem)'
  if (name === 'color-mix') return 'color-mix(in oklch, var(--color-accent), white 30%)'
  if (name.includes('gradient')) return `${name}(90deg, var(--color-accent), var(--color-accent-2))`
  if (numeric.has(name)) return `calc(${name}(1) * 1rem)`
  return `${name}(var(--demo-value))`
}

function cssFor(entry: CssCatalogEntry) {
  const scope = `[data-css-demo="${entry.slug}"]`

  if (entry.kind === 'property') {
    return `
${scope} .css-demo-subject {
  ${entry.title}: var(--demo-value);
}

${scope} .css-demo-edge {
  ${entry.title}: var(--demo-value);
  padding: var(--demo-space);
}
`
  }

  if (entry.kind === 'selector' || entry.kind === 'pseudo-class' || entry.kind === 'pseudo-element') {
    const selector = selectorForDemo(entry)
    return `
${scope} ${selector} {
  outline: calc(3px * var(--demo-intensity)) solid var(--demo-value);
  background: color-mix(in srgb, var(--demo-value), transparent 86%);
}

${scope} .css-demo-edge {
  border-color: var(--demo-value);
}
`
  }

  if (entry.kind === 'function') {
    return `
${scope} .css-demo-subject {
  inline-size: min(100%, var(--demo-value));
  transform: translateY(calc(var(--demo-intensity) * -0.25rem));
}

${scope} .css-demo-edge {
  background: color-mix(in srgb, var(--color-accent), transparent 84%);
}
`
  }

  return `
${scope} .css-demo-subject {
  border-color: var(--color-accent);
  padding: var(--demo-space);
}

${scope} .css-demo-edge {
  color: var(--color-text);
  background: color-mix(in srgb, var(--color-accent), transparent 88%);
}
`
}

function selectorForDemo(entry: CssCatalogEntry) {
  if (entry.kind === 'pseudo-class') {
    if (entry.title === ':hover') return '.css-demo-subject:hover'
    if (entry.title === ':focus' || entry.title === ':focus-visible') return '.css-demo-subject:focus-visible'
    if (entry.title === ':checked') return 'input:checked + .css-demo-subject'
    if (entry.title === ':has()') return '.css-demo-subject:has(input:checked)'
    return '.css-demo-subject'
  }

  if (entry.kind === 'pseudo-element') {
    if (entry.title === '::before' || entry.title === '::after') return `.css-demo-subject${entry.title}`
    if (entry.title === '::selection') return '.css-demo-subject::selection'
    if (entry.title === '::marker') return '.css-demo-list li::marker'
    return '.css-demo-subject::before'
  }

  if (entry.title === 'Attribute selectors') return '.css-demo-subject[data-state="active"]'
  if (entry.title === 'Class selectors') return '.css-demo-subject'
  if (entry.title === 'ID selectors') return '#css-demo-id-target'
  return '.css-demo-subject'
}

function htmlFor(entry: CssCatalogEntry) {
  const escapedSyntax = escapeHtml(entry.syntax)

  if (entry.kind === 'pseudo-class' && entry.title === ':checked') {
    return `
<label class="css-demo-toggle">
  <input type="checkbox" checked />
  <span class="css-demo-subject">Checked-state subject</span>
</label>
<div class="css-demo-edge">Edge state target</div>
`
  }

  if (entry.kind === 'pseudo-element' && entry.title === '::marker') {
    return `
<ul class="css-demo-list">
  <li class="css-demo-subject">Marker subject</li>
  <li class="css-demo-edge">Fallback list item</li>
</ul>
`
  }

  return `
<div class="css-demo-subject" id="css-demo-id-target" data-state="active" tabindex="0">
  <strong>${escapedSyntax}</strong>
  <span>${entry.kind} demo target</span>
</div>
<div class="css-demo-edge" tabindex="0">
  Edge case and fallback target
</div>
`
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export function createCssDemoSpec(entry: CssCatalogEntry): CssDemoSpec {
  const cssRules = cssFor(entry)
  const htmlTemplate = htmlFor(entry)
  const controls = controlsFor(entry)

  return {
    entrySlug: entry.slug,
    controls,
    targets: [
      { id: 'subject', label: 'Primary target', selector: `[data-css-demo="${entry.slug}"] .css-demo-subject` },
      { id: 'edge', label: 'Edge case target', selector: `[data-css-demo="${entry.slug}"] .css-demo-edge` },
    ],
    htmlTemplate,
    cssRules,
    snippetTemplates: [
      {
        id: `${entry.slug}-css`,
        title: 'Live CSS',
        template: cssRules,
      },
      {
        id: `${entry.slug}-html`,
        title: 'Live HTML',
        language: 'html',
        template: htmlTemplate,
      },
      {
        id: `${entry.slug}-fallback`,
        title: 'Fallback CSS',
        template: `
/* Fallback for ${entry.title} */
[data-css-demo="${entry.slug}"] .css-demo-subject {
  border: 1px solid var(--border-subtle);
  background: var(--surface-2);
}
`,
      },
    ],
    computedProperties: [
      entry.kind === 'property' ? entry.title : 'display',
      'color',
      'background-color',
      'border-color',
      'inline-size',
      'block-size',
      'transform',
      'outline-color',
    ],
    supportQueries: defaultSupportQueryFor(entry),
    edgeCases: [
      'The secondary target shows the fallback or edge-state treatment.',
      entry.status === 'experimental'
        ? 'Experimental entries are labeled and should not be used as the only production path.'
        : 'Use browser support data before relying on this behavior for critical UX.',
    ],
    accessibilityNotes: [
      'Demo controls are native form controls.',
      'Inspectable targets are keyboard focusable where interaction state matters.',
      'Motion-heavy behavior must respect the global reduced-motion media query.',
    ],
  }
}
