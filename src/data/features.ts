export type FeatureCategory =
  | 'layout'
  | 'colors'
  | 'functions'
  | 'selectors'
  | 'typography'
  | 'motion'
  | 'components'
  | 'effects'
  | 'architecture'
  | 'games'

export type FeatureSupport =
  | 'baseline-widely'
  | 'baseline-newly'
  | 'progressive'
  | 'experimental'

export type FeatureInteractiveLevel = 'inspector' | 'custom-demo' | 'snippet-only'

export type FeatureControlOption = {
  label: string
  value: string
}

export type FeatureControl = {
  id: string
  label: string
  type: 'range' | 'select' | 'color' | 'text' | 'checkbox'
  cssVar?: `--${string}`
  defaultValue: string
  min?: number
  max?: number
  step?: number
  unit?: string
  options?: FeatureControlOption[]
  trueValue?: string
  falseValue?: string
}

export type FeatureTarget = {
  id: string
  label: string
  selector: string
}

export type FeatureSnippetTemplate = {
  id: string
  title: string
  language?: string
  template: string
}

export type FeatureSupportQuery = {
  id: string
  label: string
  query?: string
  syntax: string
  note?: string
}

export type FeatureInteraction = {
  interactiveLevel: FeatureInteractiveLevel
  controls: FeatureControl[]
  targets: FeatureTarget[]
  snippetTemplates: FeatureSnippetTemplate[]
  computedProperties: string[]
  supportQueries: FeatureSupportQuery[]
}

export type Feature = {
  slug: string
  title: string
  category: FeatureCategory
  support: FeatureSupport
  baselineYear?: 2023 | 2024 | 2025 | 2026
  summary: string
  whyItMatters: string
  cssFeatures: string[]
  demoIdeas: string[]
  fallbackStrategy: string
  browserNotes: string
  tags: string[]
  interaction: FeatureInteraction
}

type FeatureSeed = Omit<
  Feature,
  'whyItMatters' | 'demoIdeas' | 'fallbackStrategy' | 'browserNotes' | 'tags' | 'interaction'
> &
  Partial<Pick<Feature, 'whyItMatters' | 'demoIdeas' | 'fallbackStrategy' | 'browserNotes' | 'tags' | 'interaction'>>

export const supportMeta: Record<
  FeatureSupport,
  { label: string; shortLabel: string; description: string }
> = {
  'baseline-widely': {
    label: 'Safe for modern production',
    shortLabel: 'Baseline widely',
    description: 'Solid default for evergreen browsers, with normal CSS fallbacks for older environments.',
  },
  'baseline-newly': {
    label: 'Modern cross-browser',
    shortLabel: 'Baseline newly',
    description: 'Good modern support, but verify your browser matrix before using as the only path.',
  },
  progressive: {
    label: 'Use with fallback',
    shortLabel: 'Progressive',
    description: 'Ship the base experience first, then enhance behind @supports or native capability checks.',
  },
  experimental: {
    label: 'Limited support / demo only',
    shortLabel: 'Experimental',
    description: 'Best treated as a lab feature until support and syntax settle.',
  },
}

const fallbackNotes: Record<FeatureSupport, string> = {
  'baseline-widely':
    'Write ordinary CSS first, then layer the modern syntax where it improves clarity or removes JavaScript.',
  'baseline-newly':
    'Keep a readable base style before the enhanced declaration and test current Chrome, Edge, Safari, and Firefox.',
  progressive:
    'Guard the enhanced version with @supports where possible and keep a visually complete fallback.',
  experimental:
    'Do not depend on this for core UX. Show the syntax, keep a static or class-based fallback, and label the caveat clearly.',
}

const browserNotes: Record<FeatureSupport, string> = {
  'baseline-widely':
    'Available across current evergreen browsers. Older enterprise browsers may need the fallback path.',
  'baseline-newly':
    'Recently became broadly viable in modern browsers. Keep QA focused on the versions in your support policy.',
  progressive:
    'Support is uneven or still maturing. The demo keeps the core visual result without relying on the feature.',
  experimental:
    'Limited support, often Chromium-forward or behind flags. This lab treats it as demo-only syntax.',
}

const customDemoSlugs = [
  'container-size-queries',
  'container-style-queries',
  'scroll-state-queries',
  'oklch',
  'light-dark',
  'sin',
  'clamp',
  'has',
  'starting-style',
  'scroll-driven-animations',
  'view-timeline',
  'cascade-layers',
  'text-wrap-balance',
  'popover',
  'backdrop-filter',
]

const customDemoSlugSet = new Set(customDemoSlugs)

const accentControl = {
  id: 'accent',
  label: 'Accent',
  type: 'select',
  cssVar: '--playground-accent',
  defaultValue: 'var(--color-accent)',
  options: [
    { label: 'Violet', value: 'var(--color-accent)' },
    { label: 'Mint', value: 'var(--color-accent-2)' },
    { label: 'Copper', value: 'var(--color-accent-3)' },
  ],
} satisfies FeatureControl

const defaultControlsFor = (feature: FeatureSeed): FeatureControl[] => {
  switch (feature.category) {
    case 'layout':
      return [
        accentControl,
        {
          id: 'demoWidth',
          label: 'Container',
          type: 'range',
          cssVar: '--playground-demo-width',
          defaultValue: '28',
          min: 16,
          max: 48,
          step: 1,
          unit: 'rem',
        },
        {
          id: 'gap',
          label: 'Grid gap',
          type: 'range',
          cssVar: '--playground-gap',
          defaultValue: '1',
          min: 0.25,
          max: 2,
          step: 0.05,
          unit: 'rem',
        },
      ]
    case 'colors':
      return [
        {
          id: 'baseColor',
          label: 'Base color',
          type: 'select',
          cssVar: '--playground-base-color',
          defaultValue: 'oklch(62% 0.21 286)',
          options: [
            { label: 'Violet', value: 'oklch(62% 0.21 286)' },
            { label: 'Coral', value: 'oklch(66% 0.2 22)' },
            { label: 'Mint', value: 'oklch(70% 0.16 165)' },
          ],
        },
        {
          id: 'mix',
          label: 'Surface mix',
          type: 'range',
          cssVar: '--playground-mix',
          defaultValue: '72',
          min: 35,
          max: 90,
          step: 1,
          unit: '%',
        },
        {
          id: 'chroma',
          label: 'Chroma boost',
          type: 'range',
          cssVar: '--playground-chroma',
          defaultValue: '1',
          min: 0.5,
          max: 1.5,
          step: 0.05,
        },
      ]
    case 'functions':
      return [
        accentControl,
        {
          id: 'radius',
          label: 'Orbit radius',
          type: 'range',
          cssVar: '--playground-orbit-radius',
          defaultValue: '6',
          min: 3,
          max: 9,
          step: 0.25,
          unit: 'rem',
        },
        {
          id: 'angle',
          label: 'Angle',
          type: 'range',
          cssVar: '--playground-angle',
          defaultValue: '38',
          min: -180,
          max: 180,
          step: 2,
          unit: 'deg',
        },
      ]
    case 'selectors':
      return [
        accentControl,
        {
          id: 'focusSize',
          label: 'Focus ring',
          type: 'range',
          cssVar: '--playground-focus-size',
          defaultValue: '4',
          min: 0,
          max: 10,
          step: 1,
          unit: 'px',
        },
        {
          id: 'invalidTint',
          label: 'Invalid tint',
          type: 'range',
          cssVar: '--playground-invalid-alpha',
          defaultValue: '0.12',
          min: 0,
          max: 0.28,
          step: 0.01,
        },
      ]
    case 'typography':
      return [
        {
          id: 'measure',
          label: 'Measure',
          type: 'range',
          cssVar: '--playground-measure',
          defaultValue: '38',
          min: 22,
          max: 64,
          step: 1,
          unit: 'ch',
        },
        {
          id: 'leading',
          label: 'Line height',
          type: 'range',
          cssVar: '--playground-leading',
          defaultValue: '1.45',
          min: 1,
          max: 2,
          step: 0.05,
        },
        {
          id: 'wrapMode',
          label: 'Wrap mode',
          type: 'select',
          cssVar: '--playground-wrap-mode',
          defaultValue: 'balance',
          options: [
            { label: 'Balance', value: 'balance' },
            { label: 'Pretty', value: 'pretty' },
            { label: 'Wrap', value: 'wrap' },
          ],
        },
      ]
    case 'motion':
      return [
        accentControl,
        {
          id: 'duration',
          label: 'Duration',
          type: 'range',
          cssVar: '--playground-duration',
          defaultValue: '650',
          min: 120,
          max: 1600,
          step: 10,
          unit: 'ms',
        },
        {
          id: 'distance',
          label: 'Distance',
          type: 'range',
          cssVar: '--playground-distance',
          defaultValue: '1.4',
          min: 0,
          max: 4,
          step: 0.1,
          unit: 'rem',
        },
      ]
    case 'components':
      return [
        accentControl,
        {
          id: 'panelGap',
          label: 'Panel gap',
          type: 'range',
          cssVar: '--playground-panel-gap',
          defaultValue: '0.75',
          min: 0,
          max: 2,
          step: 0.05,
          unit: 'rem',
        },
        {
          id: 'slideSize',
          label: 'Slide size',
          type: 'range',
          cssVar: '--playground-slide-size',
          defaultValue: '14',
          min: 9,
          max: 22,
          step: 1,
          unit: 'rem',
        },
      ]
    case 'effects':
      return [
        accentControl,
        {
          id: 'blur',
          label: 'Blur',
          type: 'range',
          cssVar: '--playground-blur',
          defaultValue: '14',
          min: 0,
          max: 30,
          step: 1,
          unit: 'px',
        },
        {
          id: 'shape',
          label: 'Shape',
          type: 'range',
          cssVar: '--playground-shape',
          defaultValue: '12',
          min: 0,
          max: 28,
          step: 1,
          unit: '%',
        },
      ]
    case 'architecture':
      return [
        accentControl,
        {
          id: 'layerOrder',
          label: 'Layer order',
          type: 'select',
          cssVar: '--playground-layer-token',
          defaultValue: 'var(--color-accent)',
          options: [
            { label: 'Component wins', value: 'var(--color-accent)' },
            { label: 'Utility wins', value: 'var(--color-accent-2)' },
            { label: 'Override wins', value: 'var(--color-accent-3)' },
          ],
        },
        {
          id: 'scope',
          label: 'Scope radius',
          type: 'range',
          cssVar: '--playground-scope-radius',
          defaultValue: '14',
          min: 0,
          max: 28,
          step: 1,
          unit: 'px',
        },
      ]
    case 'games':
      return [
        accentControl,
        {
          id: 'cellSize',
          label: 'Cell size',
          type: 'range',
          cssVar: '--playground-cell-size',
          defaultValue: '2.3',
          min: 1.5,
          max: 3.5,
          step: 0.1,
          unit: 'rem',
        },
        {
          id: 'speed',
          label: 'Loop speed',
          type: 'range',
          cssVar: '--playground-duration',
          defaultValue: '900',
          min: 300,
          max: 1600,
          step: 50,
          unit: 'ms',
        },
      ]
  }
}

const defaultTargetsFor = (feature: FeatureSeed): FeatureTarget[] => {
  const common = [{ id: 'surface', label: 'Preview surface', selector: '.feature-playground__preview' }]

  switch (feature.category) {
    case 'layout':
      return [
        ...common,
        { id: 'grid', label: 'Responsive grid', selector: '.feature-playground__layout-grid' },
        { id: 'item', label: 'Adaptive item', selector: '.feature-playground__layout-item' },
      ]
    case 'colors':
      return [
        ...common,
        { id: 'palette', label: 'Generated palette', selector: '.feature-playground__palette' },
        { id: 'swatch', label: 'Derived swatch', selector: '.feature-playground__swatch' },
      ]
    case 'functions':
      return [
        ...common,
        { id: 'formula', label: 'Formula stage', selector: '.feature-playground__formula-stage' },
        { id: 'point', label: 'Math point', selector: '.feature-playground__math-point' },
      ]
    case 'selectors':
      return [
        ...common,
        { id: 'form', label: 'State form', selector: '.feature-playground__state-form' },
        { id: 'field', label: 'Interactive field', selector: '.feature-playground__state-form input' },
      ]
    case 'typography':
      return [
        ...common,
        { id: 'headline', label: 'Text headline', selector: '.feature-playground__type-headline' },
        { id: 'paragraph', label: 'Text paragraph', selector: '.feature-playground__type-copy' },
      ]
    case 'motion':
      return [
        ...common,
        { id: 'scroller', label: 'Timeline scroller', selector: '.feature-playground__motion-scroll' },
        { id: 'card', label: 'Animated card', selector: '.feature-playground__motion-card' },
      ]
    case 'components':
      return [
        ...common,
        { id: 'details', label: 'Native details', selector: '.feature-playground__native-details' },
        { id: 'carousel', label: 'Snap carousel', selector: '.feature-playground__native-carousel' },
      ]
    case 'effects':
      return [
        ...common,
        { id: 'glass', label: 'Glass panel', selector: '.feature-playground__effect-glass' },
        { id: 'shape', label: 'Effect shape', selector: '.feature-playground__effect-shape' },
      ]
    case 'architecture':
      return [
        ...common,
        { id: 'scoped', label: 'Scoped component', selector: '.feature-playground__scope-demo' },
        { id: 'token', label: 'Token output', selector: '.feature-playground__token-output' },
      ]
    case 'games':
      return [
        ...common,
        { id: 'board', label: 'CSS board', selector: '.feature-playground__game-board' },
        { id: 'cell', label: 'State cell', selector: '.feature-playground__game-cell' },
      ]
  }
}

const defaultComputedPropertiesFor = (feature: FeatureSeed) => {
  switch (feature.category) {
    case 'layout':
      return ['display', 'grid-template-columns', 'gap', 'container-type', 'inline-size', 'aspect-ratio']
    case 'colors':
      return ['color', 'background-color', 'border-color', 'box-shadow', 'color-scheme', 'accent-color']
    case 'functions':
      return ['transform', 'inline-size', 'rotate', 'translate', 'width', 'height']
    case 'selectors':
      return ['border-color', 'outline-color', 'box-shadow', 'background-color', 'color']
    case 'typography':
      return ['font-size', 'line-height', 'max-inline-size', 'text-wrap', 'hyphens', 'writing-mode']
    case 'motion':
      return ['animation-name', 'animation-duration', 'animation-timeline', 'animation-range-start', 'opacity', 'transform']
    case 'components':
      return ['display', 'scroll-snap-type', 'scroll-snap-align', 'anchor-name', 'position-anchor', 'overlay']
    case 'effects':
      return ['backdrop-filter', 'filter', 'clip-path', 'mask-image', 'mix-blend-mode', 'image-rendering']
    case 'architecture':
      return ['background-color', 'border-radius', 'color', 'transition-property', 'contain', 'content-visibility']
    case 'games':
      return ['display', 'grid-template-columns', 'animation-duration', 'transform', 'background-color']
  }
}

const supportsQueryFor = (syntax: string): string | undefined => {
  const normalized = syntax.toLowerCase()

  if (normalized.includes(':has')) return 'selector(:has(*))'
  if (normalized.includes(':is')) return 'selector(:is(*))'
  if (normalized.includes(':where')) return 'selector(:where(*))'
  if (normalized.includes(':focus-visible')) return 'selector(:focus-visible)'
  if (normalized.includes(':popover-open')) return 'selector(:popover-open)'
  if (normalized.includes(':modal')) return 'selector(:modal)'
  if (normalized.includes('::details-content')) return 'selector(::details-content)'
  if (normalized.includes('::target-text')) return 'selector(::target-text)'
  if (normalized.includes('::highlight')) return 'selector(::highlight(example))'
  if (normalized.includes('container-type: scroll-state')) return '(container-type: scroll-state)'
  if (normalized.includes('container-type') || normalized.includes('@container')) return '(container-type: inline-size)'
  if (normalized.includes('style(')) return '(container-type: inline-size)'
  if (normalized.includes('cqw')) return '(inline-size: 10cqw)'
  if (normalized.includes('subgrid')) return '(grid-template-columns: subgrid)'
  if (normalized.includes('anchor-name')) return '(anchor-name: --anchor)'
  if (normalized.includes('dvh')) return '(block-size: 100dvh)'
  if (normalized.includes('aspect-ratio')) return '(aspect-ratio: 1 / 1)'
  if (normalized.includes('display: inline flex')) return '(display: inline flex)'
  if (normalized.includes('content-visibility')) return '(content-visibility: auto)'
  if (normalized.includes('contain-intrinsic-size')) return '(contain-intrinsic-size: 10rem)'
  if (normalized.includes('oklch')) return '(color: oklch(60% 0.2 240))'
  if (normalized.includes('oklab')) return '(color: oklab(60% 0.1 0.1))'
  if (normalized.includes('color-mix')) return '(color: color-mix(in oklch, red, white))'
  if (normalized.includes('light-dark')) return '(color: light-dark(black, white))'
  if (normalized.includes('contrast-color')) return '(color: contrast-color(white))'
  if (normalized.includes('color-scheme')) return '(color-scheme: light dark)'
  if (normalized.includes('accent-color')) return '(accent-color: auto)'
  if (normalized.includes('display-p3')) return '(color: color(display-p3 1 0 0))'
  if (normalized.includes('clamp')) return '(inline-size: clamp(1rem, 10vw, 20rem))'
  if (normalized.includes('min()')) return '(inline-size: min(10px, 1rem))'
  if (normalized.includes('max()')) return '(inline-size: max(10px, 1rem))'
  if (normalized.includes('calc')) return '(inline-size: calc(100% - 1rem))'
  if (normalized.includes('round')) return '(inline-size: round(10.5px, 1px))'
  if (normalized.includes('mod')) return '(inline-size: mod(10px, 3px))'
  if (normalized === 'rem()' || normalized.includes('rem()')) return '(inline-size: rem(10px, 3px))'
  if (normalized.includes('abs')) return '(inline-size: abs(-10px))'
  if (normalized.includes('sign')) return '(--x: sign(1px))'
  if (normalized.includes('sin')) return '(top: calc(sin(1deg) * 1px))'
  if (normalized.includes('cos')) return '(top: calc(cos(1deg) * 1px))'
  if (normalized.includes('tan')) return '(top: calc(tan(1deg) * 1px))'
  if (normalized.includes('atan2')) return '(rotate: atan2(1, 1))'
  if (normalized.includes('pow')) return '(--x: pow(2, 3))'
  if (normalized.includes('sqrt')) return '(--x: sqrt(4))'
  if (normalized.includes('hypot')) return '(--x: hypot(3, 4))'
  if (normalized.includes('log')) return '(--x: log(10))'
  if (normalized.includes('exp')) return '(--x: exp(1))'
  if (normalized.includes('text-wrap')) return '(text-wrap: balance)'
  if (normalized.includes('white-space-collapse')) return '(white-space-collapse: preserve)'
  if (normalized.includes('font-size-adjust')) return '(font-size-adjust: 0.5)'
  if (normalized.includes('lh')) return '(margin-block: 1lh)'
  if (normalized.includes('rlh')) return '(margin-block: 1rlh)'
  if (normalized.includes('text-box')) return '(text-box-trim: trim-both)'
  if (normalized.includes('hyphens')) return '(hyphens: auto)'
  if (normalized.includes('initial-letter')) return '(initial-letter: 2)'
  if (normalized.includes('writing-mode')) return '(writing-mode: vertical-rl)'
  if (normalized.includes('scroll-timeline')) return '(scroll-timeline: --demo block)'
  if (normalized.includes('animation-timeline')) return '(animation-timeline: scroll())'
  if (normalized.includes('view-timeline')) return '(view-timeline-name: --card)'
  if (normalized.includes('animation-range')) return '(animation-range: entry 10% cover 40%)'
  if (normalized.includes('@starting-style')) return '(transition-behavior: allow-discrete)'
  if (normalized.includes('transition-behavior')) return '(transition-behavior: allow-discrete)'
  if (normalized.includes('view-transition-name')) return '(view-transition-name: demo-card)'
  if (normalized.includes('backdrop-filter')) return '(backdrop-filter: blur(1rem))'
  if (normalized.includes('filter')) return '(filter: blur(1px))'
  if (normalized.includes('mix-blend-mode')) return '(mix-blend-mode: multiply)'
  if (normalized.includes('isolation')) return '(isolation: isolate)'
  if (normalized.includes('mask-image')) return '(mask-image: linear-gradient(black, transparent))'
  if (normalized.includes('clip-path')) return '(clip-path: inset(10%))'
  if (normalized.includes('offset-path')) return '(offset-path: path("M 0 0 L 1 1"))'
  if (normalized.includes('corner-shape')) return '(corner-shape: bevel)'
  if (normalized.includes('image-rendering')) return '(image-rendering: pixelated)'
  if (normalized.includes('scrollbar-color')) return '(scrollbar-color: red blue)'
  if (normalized.includes('scrollbar-width')) return '(scrollbar-width: thin)'
  if (normalized.includes('scrollbar-gutter')) return '(scrollbar-gutter: stable)'

  return undefined
}

const defaultSupportQueries = (feature: FeatureSeed): FeatureSupportQuery[] =>
  feature.cssFeatures.slice(0, 4).map((syntax, index) => ({
    id: `${feature.slug}-support-${index}`,
    label: syntax,
    query: supportsQueryFor(syntax),
    syntax,
    note: supportsQueryFor(syntax)
      ? undefined
      : 'This syntax is an at-rule, pseudo-element, future proposal, or not reliably detectable with CSS.supports().',
  }))

const defaultSnippetTemplates = (feature: FeatureSeed): FeatureSnippetTemplate[] => [
  {
    id: `${feature.slug}-live-css`,
    title: 'Live CSS',
    template: snippetForCategory(feature),
  },
]

const defaultInteraction = (feature: FeatureSeed): FeatureInteraction => ({
  interactiveLevel: customDemoSlugSet.has(feature.slug)
    ? 'custom-demo'
    : feature.support === 'experimental'
      ? 'snippet-only'
      : 'inspector',
  controls: defaultControlsFor(feature),
  targets: defaultTargetsFor(feature),
  snippetTemplates: defaultSnippetTemplates(feature),
  computedProperties: defaultComputedPropertiesFor(feature),
  supportQueries: defaultSupportQueries(feature),
})

function snippetForCategory(feature: FeatureSeed) {
  const inspected = feature.cssFeatures.map((cssFeature) => `/* Inspect: ${cssFeature} */`).join('\n')

  switch (feature.category) {
    case 'layout':
      return `
/* ${feature.title}: component-owned layout controls */
.feature-playground__preview {
  --playground-accent: {{accent}};
  --playground-demo-width: {{demoWidth}};
  --playground-gap: {{gap}};
}

.feature-playground__subject--layout {
  container-type: inline-size;
  inline-size: min(100%, var(--playground-demo-width));
}

.feature-playground__layout-grid {
  display: grid;
  gap: var(--playground-gap);
}

@container (inline-size >= 32rem) {
  .feature-playground__layout-grid {
    grid-template-columns: 0.8fr 1.2fr;
  }
}

${inspected}
`
    case 'colors':
      return `
/* ${feature.title}: token derivation */
.feature-playground__preview {
  --playground-base-color: {{baseColor}};
  --playground-mix: {{mix}};
  --playground-chroma: {{chroma}};
}

@supports (color: color-mix(in oklch, red, white)) {
  .feature-playground__swatch {
    background: color-mix(in oklch, var(--playground-base-color), white var(--playground-mix));
    border-color: color-mix(in oklch, var(--playground-base-color), black 20%);
  }
}

${inspected}
`
    case 'functions':
      return `
/* ${feature.title}: CSS math as layout input */
.feature-playground__preview {
  --playground-accent: {{accent}};
  --playground-orbit-radius: {{radius}};
  --playground-angle: {{angle}};
}

@supports (top: calc(sin(1deg) * 1px)) {
  .feature-playground__math-point {
    transform: translate(
      calc(cos(var(--playground-angle)) * var(--playground-orbit-radius)),
      calc(sin(var(--playground-angle)) * var(--playground-orbit-radius))
    );
  }
}

${inspected}
`
    case 'selectors':
      return `
/* ${feature.title}: native state selectors */
.feature-playground__state-form {
  --playground-accent: {{accent}};
  --playground-focus-size: {{focusSize}};
  --playground-invalid-alpha: {{invalidTint}};
}

.feature-playground__state-form:has(:focus-visible) {
  box-shadow: 0 0 0 var(--playground-focus-size) color-mix(in srgb, var(--playground-accent), transparent 72%);
}

.feature-playground__state-form:has(input:not(:placeholder-shown):invalid) {
  background: rgb(255 80 80 / var(--playground-invalid-alpha));
}

${inspected}
`
    case 'typography':
      return `
/* ${feature.title}: readable text controls */
.feature-playground__type-headline {
  max-inline-size: {{measure}};
  text-wrap: {{wrapMode}};
}

.feature-playground__type-copy {
  max-inline-size: {{measure}};
  line-height: {{leading}};
  text-wrap: pretty;
  hyphens: auto;
}

${inspected}
`
    case 'motion':
      return `
/* ${feature.title}: motion timeline controls */
.feature-playground__preview {
  --playground-accent: {{accent}};
  --playground-duration: {{duration}};
  --playground-distance: {{distance}};
}

.feature-playground__motion-card {
  animation: playground-reveal var(--playground-duration) both;
  transform: translateY(var(--playground-distance));
}

@media (prefers-reduced-motion: reduce) {
  .feature-playground__motion-card {
    animation: none;
    transform: none;
  }
}

${inspected}
`
    case 'components':
      return `
/* ${feature.title}: native UI surface */
.feature-playground__preview {
  --playground-accent: {{accent}};
  --playground-panel-gap: {{panelGap}};
  --playground-slide-size: {{slideSize}};
}

.feature-playground__native-carousel {
  grid-auto-columns: var(--playground-slide-size);
  gap: var(--playground-panel-gap);
  scroll-snap-type: inline mandatory;
}

.feature-playground__native-slide {
  scroll-snap-align: start;
}

${inspected}
`
    case 'effects':
      return `
/* ${feature.title}: progressive visual effects */
.feature-playground__preview {
  --playground-accent: {{accent}};
  --playground-blur: {{blur}};
  --playground-shape: {{shape}};
}

.feature-playground__effect-glass {
  backdrop-filter: blur(var(--playground-blur));
}

.feature-playground__effect-shape {
  clip-path: inset(var(--playground-shape) round 1.4rem);
}

${inspected}
`
    case 'architecture':
      return `
/* ${feature.title}: cascade and token architecture */
.feature-playground__preview {
  --playground-accent: {{accent}};
  --playground-layer-token: {{layerOrder}};
  --playground-scope-radius: {{scope}};
}

@layer demo-base, demo-utilities {
  @layer demo-utilities {
    .feature-playground__token-output {
      background: var(--playground-layer-token);
    }
  }
}

@scope (.feature-playground__scope-demo) {
  .feature-playground__token-output {
    border-radius: var(--playground-scope-radius);
  }
}

${inspected}
`
    case 'games':
      return `
/* ${feature.title}: CSS state-machine board */
.feature-playground__preview {
  --playground-accent: {{accent}};
  --playground-cell-size: {{cellSize}};
  --playground-duration: {{speed}};
}

.feature-playground__game-board {
  display: grid;
  grid-template-columns: repeat(3, var(--playground-cell-size));
}

.feature-playground__game-cell:has(input:checked) {
  background: var(--playground-accent);
}

${inspected}
`
  }
}

const makeFeature = (feature: FeatureSeed): Feature => ({
  ...feature,
  whyItMatters:
    feature.whyItMatters ??
    `${feature.title} lets CSS own more layout, state, and visual behavior with less framework-specific code.`,
  demoIdeas: feature.demoIdeas ?? [`Use ${feature.title} in a realistic component demo.`],
  fallbackStrategy: feature.fallbackStrategy ?? fallbackNotes[feature.support],
  browserNotes: feature.browserNotes ?? browserNotes[feature.support],
  tags: feature.tags ?? [feature.category, feature.support],
  interaction: feature.interaction ?? defaultInteraction(feature),
})

export const features: Feature[] = [
  makeFeature({
    slug: 'cascade-layers',
    title: 'Cascade layers / @layer',
    category: 'architecture',
    support: 'baseline-widely',
    baselineYear: 2023,
    summary: 'Defines cascade priority buckets so resets, tokens, components, utilities, and overrides stay predictable.',
    cssFeatures: ['@layer', 'layer order', 'cascade'],
    demoIdeas: ['Show a utility selector losing to a later component layer by design.'],
    tags: ['architecture', 'cascade', 'layers'],
  }),
  makeFeature({
    slug: 'css-nesting',
    title: 'CSS nesting',
    category: 'architecture',
    support: 'baseline-newly',
    baselineYear: 2023,
    summary: 'Keeps component selectors close together without a preprocessor.',
    cssFeatures: ['native nesting', '& selector'],
    demoIdeas: ['Nest a feature card heading, badge row, and hover state in one block.'],
    tags: ['architecture', 'syntax'],
  }),
  makeFeature({
    slug: 'scope',
    title: '@scope',
    category: 'architecture',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Limits selector reach to a subtree without generating unique class names.',
    cssFeatures: ['@scope', ':scope'],
    demoIdeas: ['Scope demo card styles so two cards can use the same internal class names safely.'],
    tags: ['architecture', 'scope'],
  }),
  makeFeature({
    slug: 'supports',
    title: '@supports',
    category: 'architecture',
    support: 'baseline-widely',
    summary: 'Feature-detects CSS syntax before applying enhanced rules.',
    cssFeatures: ['@supports', 'not', 'selector()'],
    demoIdeas: ['Wrap an anchor-positioned tooltip enhancement around a static fallback.'],
    tags: ['architecture', 'fallbacks'],
  }),
  makeFeature({
    slug: 'custom-properties',
    title: 'Custom properties',
    category: 'architecture',
    support: 'baseline-widely',
    summary: 'Runtime design tokens that cascade through components.',
    cssFeatures: ['--tokens', 'var()'],
    demoIdeas: ['Drive a panel theme with inherited custom properties.'],
    tags: ['tokens', 'variables'],
  }),
  makeFeature({
    slug: 'registered-custom-properties',
    title: 'Registered custom properties / @property',
    category: 'architecture',
    support: 'baseline-newly',
    baselineYear: 2024,
    summary: 'Adds type, inheritance, initial values, and animation behavior to CSS variables.',
    cssFeatures: ['@property', 'syntax', 'inherits', 'initial-value'],
    demoIdeas: ['Animate a typed hue or progress number without JavaScript interpolation.'],
    tags: ['tokens', 'animation', 'property'],
  }),
  makeFeature({
    slug: 'logical-properties-architecture',
    title: 'Logical properties in systems',
    category: 'architecture',
    support: 'baseline-widely',
    summary: 'Uses writing-mode-aware spacing and borders in reusable component CSS.',
    cssFeatures: ['margin-inline', 'padding-block', 'inset-inline'],
    demoIdeas: ['Switch direction or writing mode without changing component CSS.'],
    tags: ['i18n', 'architecture'],
  }),
  makeFeature({
    slug: 'design-tokens-css-variables',
    title: 'Design tokens with CSS variables',
    category: 'architecture',
    support: 'baseline-widely',
    summary: 'Defines theme, spacing, radius, type, and elevation values as cascade-aware tokens.',
    cssFeatures: ['var()', '@layer tokens', 'color-scheme'],
    demoIdeas: ['Toggle theme tokens and let components inherit the result.'],
    tags: ['tokens', 'theme'],
  }),
  makeFeature({
    slug: 'container-size-queries',
    title: 'Container size queries',
    category: 'layout',
    support: 'baseline-widely',
    baselineYear: 2023,
    summary: 'Adapts a component to its own container size rather than the viewport.',
    cssFeatures: ['container-type: inline-size', '@container'],
    demoIdeas: ['Render the same product card in narrow and wide containers.'],
    tags: ['layout', 'responsive', 'mvp'],
  }),
  makeFeature({
    slug: 'container-style-queries',
    title: 'Container style queries',
    category: 'layout',
    support: 'progressive',
    baselineYear: 2025,
    summary: 'Lets descendants react to custom-property values on an ancestor container.',
    cssFeatures: ['@container style()', 'custom properties'],
    demoIdeas: ['Premium card variant changes without a descendant class.'],
    tags: ['layout', 'containers', 'mvp'],
  }),
  makeFeature({
    slug: 'scroll-state-queries',
    title: 'Scroll-state queries',
    category: 'layout',
    support: 'experimental',
    baselineYear: 2026,
    summary: 'Queries whether a sticky, snapped, or scrollable container is in a browser-managed scroll state.',
    cssFeatures: ['container-type: scroll-state', '@container scroll-state()'],
    demoIdeas: ['Give a sticky header a stronger shadow only while it is stuck.'],
    tags: ['layout', 'scroll', 'mvp'],
  }),
  makeFeature({
    slug: 'container-query-units',
    title: 'Container query units',
    category: 'layout',
    support: 'baseline-newly',
    baselineYear: 2023,
    summary: 'Uses cqw, cqh, cqi, cqb, cqmin, and cqmax units relative to a query container.',
    cssFeatures: ['cqw', 'cqh', 'cqi', 'cqb', 'cqmin', 'cqmax'],
    demoIdeas: ['Scale product-card spacing and icon size from the card container.'],
    tags: ['layout', 'units'],
  }),
  makeFeature({
    slug: 'subgrid',
    title: 'Subgrid',
    category: 'layout',
    support: 'baseline-newly',
    baselineYear: 2023,
    summary: 'Allows nested grid items to align to parent grid tracks.',
    cssFeatures: ['display: grid', 'grid-template-columns: subgrid'],
    demoIdeas: ['Align card content rows across nested card bodies.'],
    tags: ['layout', 'grid'],
  }),
  makeFeature({
    slug: 'anchor-positioning',
    title: 'Anchor positioning',
    category: 'layout',
    support: 'progressive',
    baselineYear: 2025,
    summary: 'Positions floating UI relative to an anchor element without layout-measuring JavaScript.',
    cssFeatures: ['anchor-name', 'position-anchor', 'position-area', 'anchor()'],
    demoIdeas: ['Attach a tooltip to a trigger with a static fallback below the button.'],
    tags: ['layout', 'popover'],
  }),
  makeFeature({
    slug: 'logical-properties-layout',
    title: 'Logical properties',
    category: 'layout',
    support: 'baseline-widely',
    summary: 'Uses flow-relative spacing, borders, sizing, and positioning.',
    cssFeatures: ['margin-inline', 'padding-block', 'border-start-start-radius'],
    demoIdeas: ['Flip a card between horizontal and vertical writing modes.'],
    tags: ['layout', 'i18n'],
  }),
  makeFeature({
    slug: 'dynamic-viewport-units',
    title: 'Dynamic viewport units',
    category: 'layout',
    support: 'baseline-newly',
    baselineYear: 2023,
    summary: 'Uses svh, lvh, and dvh to handle mobile browser UI changing the viewport.',
    cssFeatures: ['svh', 'lvh', 'dvh', 'vi', 'vb'],
    demoIdeas: ['Build a hero or app shell that avoids mobile address-bar jumps.'],
    tags: ['layout', 'viewport'],
  }),
  makeFeature({
    slug: 'aspect-ratio',
    title: 'aspect-ratio',
    category: 'layout',
    support: 'baseline-widely',
    summary: 'Reserves stable media and card proportions before content loads.',
    cssFeatures: ['aspect-ratio'],
    demoIdeas: ['Compare fixed-height media against aspect-ratio media.'],
    tags: ['layout', 'media'],
  }),
  makeFeature({
    slug: 'two-value-display',
    title: 'Two-value display syntax',
    category: 'layout',
    support: 'baseline-newly',
    baselineYear: 2023,
    summary: 'Separates outer and inner display behavior with values such as inline flex or block grid.',
    cssFeatures: ['display: inline flex', 'display: block grid'],
    demoIdeas: ['Show inline buttons with flex internals and grid cards with block outer display.'],
    tags: ['layout', 'display'],
  }),
  makeFeature({
    slug: 'content-visibility',
    title: 'content-visibility',
    category: 'layout',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Lets the browser skip rendering offscreen content until needed.',
    cssFeatures: ['content-visibility: auto'],
    demoIdeas: ['Optimize a long demo list while preserving a fallback for browsers that ignore it.'],
    tags: ['layout', 'performance'],
  }),
  makeFeature({
    slug: 'contain-intrinsic-size',
    title: 'contain-intrinsic-size',
    category: 'layout',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Provides a placeholder size for skipped content to avoid layout jumps.',
    cssFeatures: ['contain-intrinsic-size'],
    demoIdeas: ['Pair with content-visibility on long documentation sections.'],
    tags: ['layout', 'performance'],
  }),
  makeFeature({
    slug: 'masonry-layout',
    title: 'CSS masonry placeholder',
    category: 'layout',
    support: 'experimental',
    summary: 'Future masonry-style grid layout without JavaScript packing.',
    cssFeatures: ['grid-template-rows: masonry'],
    demoIdeas: ['Show static cards with the future syntax as demo-only code.'],
    tags: ['layout', 'future'],
  }),
  makeFeature({
    slug: 'oklch',
    title: 'OKLCH',
    category: 'colors',
    support: 'baseline-newly',
    baselineYear: 2023,
    summary: 'A perceptual color format with readable lightness, chroma, and hue channels.',
    cssFeatures: ['oklch()'],
    demoIdeas: ['Generate theme variants from a single base OKLCH token.'],
    tags: ['colors', 'tokens', 'mvp'],
  }),
  makeFeature({
    slug: 'oklab',
    title: 'OKLAB',
    category: 'colors',
    support: 'baseline-newly',
    baselineYear: 2023,
    summary: 'A perceptual color space useful for interpolation and color math.',
    cssFeatures: ['oklab()'],
    demoIdeas: ['Compare OKLAB interpolation with older sRGB gradients.'],
    tags: ['colors'],
  }),
  makeFeature({
    slug: 'color-mix',
    title: 'color-mix()',
    category: 'colors',
    support: 'baseline-newly',
    baselineYear: 2023,
    summary: 'Mixes colors in a chosen color space directly in CSS.',
    cssFeatures: ['color-mix()'],
    demoIdeas: ['Derive border, hover, muted, and shadow tokens from one accent color.'],
    tags: ['colors', 'tokens', 'mvp'],
  }),
  makeFeature({
    slug: 'relative-color-syntax',
    title: 'Relative color syntax',
    category: 'colors',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Creates a color by reading and modifying channels from another color.',
    cssFeatures: ['oklch(from ...)', 'rgb(from ...)'],
    demoIdeas: ['Lower chroma or raise lightness from a base token.'],
    tags: ['colors', 'progressive'],
  }),
  makeFeature({
    slug: 'light-dark',
    title: 'light-dark()',
    category: 'colors',
    support: 'baseline-newly',
    baselineYear: 2024,
    summary: 'Chooses a value based on the active color scheme.',
    cssFeatures: ['light-dark()', 'color-scheme'],
    demoIdeas: ['Show tokens changing with system preference and an app data-theme override.'],
    tags: ['colors', 'theme', 'mvp'],
  }),
  makeFeature({
    slug: 'contrast-color',
    title: 'contrast-color()',
    category: 'colors',
    support: 'experimental',
    baselineYear: 2026,
    summary: 'Future helper for choosing a readable foreground against a background color.',
    cssFeatures: ['contrast-color()'],
    demoIdeas: ['Show intended syntax with a static contrast fallback.'],
    tags: ['colors', 'accessibility', 'future'],
  }),
  makeFeature({
    slug: 'color-scheme',
    title: 'color-scheme',
    category: 'colors',
    support: 'baseline-widely',
    summary: 'Tells the browser which themes a component supports for native controls and UA surfaces.',
    cssFeatures: ['color-scheme'],
    demoIdeas: ['Switch a form panel between light and dark native UI.'],
    tags: ['colors', 'forms'],
  }),
  makeFeature({
    slug: 'accent-color',
    title: 'accent-color',
    category: 'colors',
    support: 'baseline-widely',
    baselineYear: 2023,
    summary: 'Tints supported form controls with a single CSS property.',
    cssFeatures: ['accent-color'],
    demoIdeas: ['Apply the lab accent to checkboxes, radios, and range controls.'],
    tags: ['colors', 'forms'],
  }),
  makeFeature({
    slug: 'gradient-interpolation',
    title: 'Gradient interpolation in OKLCH',
    category: 'colors',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Interpolates gradients in a perceptual color space for smoother ramps.',
    cssFeatures: ['linear-gradient(in oklch, ...)'],
    demoIdeas: ['Compare sRGB and OKLCH hue travel.'],
    tags: ['colors', 'gradients'],
  }),
  makeFeature({
    slug: 'wide-gamut-display-p3',
    title: 'Wide gamut color / display-p3',
    category: 'colors',
    support: 'progressive',
    baselineYear: 2023,
    summary: 'Uses colors outside sRGB on capable displays.',
    cssFeatures: ['color(display-p3 ...)'],
    demoIdeas: ['Enhance a swatch when wide gamut is supported.'],
    tags: ['colors', 'display-p3'],
  }),
  makeFeature({
    slug: 'clamp',
    title: 'clamp()',
    category: 'functions',
    support: 'baseline-widely',
    summary: 'Constrains a preferred fluid value between minimum and maximum bounds.',
    cssFeatures: ['clamp()'],
    demoIdeas: ['Build a fluid type scale without media queries.'],
    tags: ['functions', 'math', 'mvp'],
  }),
  makeFeature({
    slug: 'min',
    title: 'min()',
    category: 'functions',
    support: 'baseline-widely',
    summary: 'Chooses the smallest result from multiple values.',
    cssFeatures: ['min()'],
    demoIdeas: ['Cap a responsive card width against viewport and container constraints.'],
    tags: ['functions', 'math'],
  }),
  makeFeature({
    slug: 'max',
    title: 'max()',
    category: 'functions',
    support: 'baseline-widely',
    summary: 'Chooses the largest result from multiple values.',
    cssFeatures: ['max()'],
    demoIdeas: ['Guarantee a tap target or panel spacing never drops below a minimum.'],
    tags: ['functions', 'math'],
  }),
  makeFeature({
    slug: 'calc',
    title: 'calc()',
    category: 'functions',
    support: 'baseline-widely',
    summary: 'Combines units and variables in computed CSS values.',
    cssFeatures: ['calc()'],
    demoIdeas: ['Offset a sticky panel by a tokenized header height.'],
    tags: ['functions', 'math'],
  }),
  makeFeature({
    slug: 'round',
    title: 'round()',
    category: 'functions',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Rounds CSS numeric values to a chosen strategy and interval.',
    cssFeatures: ['round()'],
    demoIdeas: ['Snap fluid spacing to a grid rhythm where supported.'],
    tags: ['functions', 'math'],
  }),
  makeFeature({
    slug: 'mod',
    title: 'mod()',
    category: 'functions',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Returns the remainder after division while preserving CSS units.',
    cssFeatures: ['mod()'],
    demoIdeas: ['Cycle decorative pattern positions without Sass loops.'],
    tags: ['functions', 'math'],
  }),
  makeFeature({
    slug: 'rem-function',
    title: 'rem()',
    category: 'functions',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Computes a remainder value with sign behavior defined by the dividend.',
    cssFeatures: ['rem()'],
    demoIdeas: ['Show modulo-style spacing math beside mod().'],
    tags: ['functions', 'math'],
  }),
  makeFeature({
    slug: 'abs',
    title: 'abs()',
    category: 'functions',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Returns the absolute value of a CSS calculation.',
    cssFeatures: ['abs()'],
    demoIdeas: ['Calculate distance-like offsets from a signed token.'],
    tags: ['functions', 'math'],
  }),
  makeFeature({
    slug: 'sign',
    title: 'sign()',
    category: 'functions',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Returns the sign of a CSS calculation.',
    cssFeatures: ['sign()'],
    demoIdeas: ['Flip an animation direction from a signed custom property.'],
    tags: ['functions', 'math'],
  }),
  makeFeature({
    slug: 'sin',
    title: 'sin()',
    category: 'functions',
    support: 'baseline-newly',
    baselineYear: 2023,
    summary: 'Computes sine for CSS trigonometric layouts.',
    cssFeatures: ['sin()'],
    demoIdeas: ['Place menu items around a circle.'],
    tags: ['functions', 'trig', 'mvp'],
  }),
  makeFeature({
    slug: 'cos',
    title: 'cos()',
    category: 'functions',
    support: 'baseline-newly',
    baselineYear: 2023,
    summary: 'Computes cosine for angles and circular placement.',
    cssFeatures: ['cos()'],
    demoIdeas: ['Pair with sin() for circular menus and orbit controls.'],
    tags: ['functions', 'trig', 'mvp'],
  }),
  makeFeature({
    slug: 'tan',
    title: 'tan()',
    category: 'functions',
    support: 'baseline-newly',
    baselineYear: 2023,
    summary: 'Computes tangent for angle-based CSS calculations.',
    cssFeatures: ['tan()'],
    demoIdeas: ['Demonstrate geometric offsets using angle tokens.'],
    tags: ['functions', 'trig'],
  }),
  makeFeature({
    slug: 'atan2',
    title: 'atan2()',
    category: 'functions',
    support: 'baseline-newly',
    baselineYear: 2023,
    summary: 'Computes an angle from two numbers for directional layouts.',
    cssFeatures: ['atan2()'],
    demoIdeas: ['Show a rotated pointer derived from width and height variables.'],
    tags: ['functions', 'trig'],
  }),
  makeFeature({
    slug: 'pow',
    title: 'pow()',
    category: 'functions',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Raises one CSS numeric value to the power of another.',
    cssFeatures: ['pow()'],
    demoIdeas: ['Generate a modular spacing scale from an index.'],
    tags: ['functions', 'math'],
  }),
  makeFeature({
    slug: 'sqrt',
    title: 'sqrt()',
    category: 'functions',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Computes the square root of a CSS value.',
    cssFeatures: ['sqrt()'],
    demoIdeas: ['Normalize diagonal visual sizes.'],
    tags: ['functions', 'math'],
  }),
  makeFeature({
    slug: 'hypot',
    title: 'hypot()',
    category: 'functions',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Computes the square root of the sum of squares.',
    cssFeatures: ['hypot()'],
    demoIdeas: ['Calculate diagonal length from width and height variables.'],
    tags: ['functions', 'math'],
  }),
  makeFeature({
    slug: 'log',
    title: 'log()',
    category: 'functions',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Computes logarithms in CSS numeric expressions.',
    cssFeatures: ['log()'],
    demoIdeas: ['Prototype non-linear scales in a static demo.'],
    tags: ['functions', 'math'],
  }),
  makeFeature({
    slug: 'exp',
    title: 'exp()',
    category: 'functions',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Raises Euler number to a CSS numeric value.',
    cssFeatures: ['exp()'],
    demoIdeas: ['Show exponential growth curves as demo-only syntax.'],
    tags: ['functions', 'math'],
  }),
  makeFeature({
    slug: 'if-function',
    title: 'if()',
    category: 'functions',
    support: 'experimental',
    baselineYear: 2026,
    summary: 'Future CSS conditional function for choosing values inline.',
    cssFeatures: ['if()', 'media()', 'style()'],
    demoIdeas: ['Conditional button sizing with @media fallback.'],
    tags: ['functions', 'conditionals', 'future'],
  }),
  makeFeature({
    slug: 'css-function',
    title: 'CSS @function',
    category: 'functions',
    support: 'experimental',
    baselineYear: 2026,
    summary: 'Future custom CSS functions for reusable value logic.',
    cssFeatures: ['@function', 'result'],
    demoIdeas: ['Document future token math while shipping fixed custom properties.'],
    tags: ['functions', 'future'],
  }),
  makeFeature({
    slug: 'sibling-index',
    title: 'sibling-index()',
    category: 'functions',
    support: 'experimental',
    baselineYear: 2026,
    summary: 'Future function returning an element index among its siblings.',
    cssFeatures: ['sibling-index()'],
    demoIdeas: ['Stagger list animations with nth-child fallback.'],
    tags: ['functions', 'future'],
  }),
  makeFeature({
    slug: 'sibling-count',
    title: 'sibling-count()',
    category: 'functions',
    support: 'experimental',
    baselineYear: 2026,
    summary: 'Future function returning the number of siblings.',
    cssFeatures: ['sibling-count()'],
    demoIdeas: ['Compute radial layout angles from the number of items.'],
    tags: ['functions', 'future'],
  }),
  makeFeature({
    slug: 'typed-attr',
    title: 'Typed attr()',
    category: 'functions',
    support: 'experimental',
    baselineYear: 2025,
    summary: 'Reads attribute values into typed CSS values beyond string content.',
    cssFeatures: ['attr(data-size type(<length>))'],
    demoIdeas: ['Size a meter from a data attribute with inline-style fallback.'],
    tags: ['functions', 'attributes', 'future'],
  }),
  makeFeature({
    slug: 'has',
    title: ':has()',
    category: 'selectors',
    support: 'baseline-newly',
    baselineYear: 2023,
    summary: 'Styles an element based on matching descendants or related elements.',
    cssFeatures: [':has()'],
    demoIdeas: ['Parent card reacts to invalid, focused, checked, and selected form controls.'],
    tags: ['selectors', 'state', 'mvp'],
  }),
  makeFeature({
    slug: 'is',
    title: ':is()',
    category: 'selectors',
    support: 'baseline-widely',
    summary: 'Groups selector alternatives while keeping the highest specificity of its arguments.',
    cssFeatures: [':is()'],
    demoIdeas: ['Simplify repeated heading selectors in demo cards.'],
    tags: ['selectors'],
  }),
  makeFeature({
    slug: 'where',
    title: ':where()',
    category: 'selectors',
    support: 'baseline-widely',
    summary: 'Groups selector alternatives with zero specificity.',
    cssFeatures: [':where()'],
    demoIdeas: ['Write low-specificity base styles that utilities can override.'],
    tags: ['selectors', 'specificity'],
  }),
  makeFeature({
    slug: 'advanced-not',
    title: 'Advanced :not()',
    category: 'selectors',
    support: 'baseline-widely',
    baselineYear: 2023,
    summary: 'Accepts complex selector lists for exclusion logic.',
    cssFeatures: [':not(.a, .b)', ':not(:has(...))'],
    demoIdeas: ['Target cards that are not selected or invalid.'],
    tags: ['selectors'],
  }),
  makeFeature({
    slug: 'focus-visible',
    title: ':focus-visible',
    category: 'selectors',
    support: 'baseline-widely',
    summary: 'Shows focus treatment when keyboard modality or browser heuristics say it is useful.',
    cssFeatures: [':focus-visible'],
    demoIdeas: ['Accessible focus rings without noisy pointer focus.'],
    tags: ['selectors', 'accessibility'],
  }),
  makeFeature({
    slug: 'focus-within',
    title: ':focus-within',
    category: 'selectors',
    support: 'baseline-widely',
    summary: 'Styles a parent while any descendant has focus.',
    cssFeatures: [':focus-within'],
    demoIdeas: ['Highlight a field group during keyboard editing.'],
    tags: ['selectors', 'forms'],
  }),
  makeFeature({
    slug: 'user-valid',
    title: ':user-valid',
    category: 'selectors',
    support: 'progressive',
    baselineYear: 2023,
    summary: 'Styles valid form controls after user interaction.',
    cssFeatures: [':user-valid'],
    demoIdeas: ['Avoid showing success state before a field is touched.'],
    tags: ['selectors', 'forms'],
  }),
  makeFeature({
    slug: 'user-invalid',
    title: ':user-invalid',
    category: 'selectors',
    support: 'progressive',
    baselineYear: 2023,
    summary: 'Styles invalid form controls after user interaction.',
    cssFeatures: [':user-invalid'],
    demoIdeas: ['Show form errors without React-controlled validation state.'],
    tags: ['selectors', 'forms'],
  }),
  makeFeature({
    slug: 'placeholder-shown',
    title: ':placeholder-shown',
    category: 'selectors',
    support: 'baseline-widely',
    summary: 'Detects inputs currently showing placeholder text.',
    cssFeatures: [':placeholder-shown'],
    demoIdeas: ['Build floating label behavior with CSS only.'],
    tags: ['selectors', 'forms'],
  }),
  makeFeature({
    slug: 'open',
    title: ':open',
    category: 'selectors',
    support: 'baseline-newly',
    baselineYear: 2024,
    summary: 'Targets open native widgets such as dialog, details, select, and popover where applicable.',
    cssFeatures: [':open'],
    demoIdeas: ['Animate a disclosure panel after it opens.'],
    tags: ['selectors', 'components'],
  }),
  makeFeature({
    slug: 'modal',
    title: ':modal',
    category: 'selectors',
    support: 'baseline-newly',
    baselineYear: 2023,
    summary: 'Styles an element currently in modal top-layer state.',
    cssFeatures: [':modal'],
    demoIdeas: ['Distinguish modal dialog chrome from non-modal dialog.'],
    tags: ['selectors', 'dialog'],
  }),
  makeFeature({
    slug: 'popover-open',
    title: ':popover-open',
    category: 'selectors',
    support: 'baseline-newly',
    baselineYear: 2024,
    summary: 'Styles an element while a native popover is visible.',
    cssFeatures: [':popover-open'],
    demoIdeas: ['Change popover elevation and arrow color while open.'],
    tags: ['selectors', 'popover'],
  }),
  makeFeature({
    slug: 'target',
    title: ':target',
    category: 'selectors',
    support: 'baseline-widely',
    summary: 'Styles the element matching the current URL fragment.',
    cssFeatures: [':target'],
    demoIdeas: ['Highlight a documentation section linked from the page nav.'],
    tags: ['selectors', 'navigation'],
  }),
  makeFeature({
    slug: 'details-content',
    title: '::details-content',
    category: 'selectors',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Targets the expandable content box inside details.',
    cssFeatures: ['::details-content'],
    demoIdeas: ['Animate accordion content while preserving details semantics.'],
    tags: ['selectors', 'components'],
  }),
  makeFeature({
    slug: 'target-text',
    title: '::target-text',
    category: 'selectors',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Styles text fragments selected through URL text directives.',
    cssFeatures: ['::target-text'],
    demoIdeas: ['Show highlighted search-result text with normal selection fallback.'],
    tags: ['selectors', 'highlight'],
  }),
  makeFeature({
    slug: 'selection',
    title: '::selection',
    category: 'selectors',
    support: 'baseline-widely',
    summary: 'Customizes selected text color and background.',
    cssFeatures: ['::selection'],
    demoIdeas: ['Apply lab accent selection colors to article text.'],
    tags: ['selectors', 'highlight'],
  }),
  makeFeature({
    slug: 'marker',
    title: '::marker',
    category: 'selectors',
    support: 'baseline-widely',
    summary: 'Styles list bullets and counters without custom markup.',
    cssFeatures: ['::marker'],
    demoIdeas: ['Use feature support colors as ordered-list markers.'],
    tags: ['selectors', 'typography'],
  }),
  makeFeature({
    slug: 'highlight',
    title: '::highlight()',
    category: 'selectors',
    support: 'progressive',
    baselineYear: 2023,
    summary: 'Styles named Highlight API ranges from JavaScript.',
    cssFeatures: ['::highlight()', 'CSS.highlights'],
    demoIdeas: ['Use minimal JS only to register search-result highlight ranges.'],
    tags: ['selectors', 'highlight'],
  }),
  makeFeature({
    slug: 'text-wrap-balance',
    title: 'text-wrap: balance',
    category: 'typography',
    support: 'baseline-newly',
    baselineYear: 2024,
    summary: 'Balances line lengths in headings and short text blocks.',
    cssFeatures: ['text-wrap: balance'],
    demoIdeas: ['Compare balanced and default hero headings.'],
    tags: ['typography', 'wrapping'],
  }),
  makeFeature({
    slug: 'text-wrap-pretty',
    title: 'text-wrap: pretty',
    category: 'typography',
    support: 'baseline-newly',
    baselineYear: 2024,
    summary: 'Improves paragraph wrapping by avoiding short final lines where possible.',
    cssFeatures: ['text-wrap: pretty'],
    demoIdeas: ['Apply pretty wrapping to article excerpts.'],
    tags: ['typography', 'readability'],
  }),
  makeFeature({
    slug: 'white-space-collapse',
    title: 'white-space-collapse',
    category: 'typography',
    support: 'baseline-newly',
    baselineYear: 2024,
    summary: 'Controls how consecutive white space collapses.',
    cssFeatures: ['white-space-collapse'],
    demoIdeas: ['Show code-adjacent text preserving intentional spaces.'],
    tags: ['typography'],
  }),
  makeFeature({
    slug: 'font-size-adjust',
    title: 'font-size-adjust',
    category: 'typography',
    support: 'baseline-newly',
    baselineYear: 2024,
    summary: 'Preserves perceived text size across fallback fonts.',
    cssFeatures: ['font-size-adjust'],
    demoIdeas: ['Compare fallback text with and without x-height adjustment.'],
    tags: ['typography', 'fonts'],
  }),
  makeFeature({
    slug: 'lh-unit',
    title: 'lh unit',
    category: 'typography',
    support: 'baseline-newly',
    baselineYear: 2023,
    summary: 'Uses the element line-height as a CSS unit.',
    cssFeatures: ['lh'],
    demoIdeas: ['Build vertical rhythm and icon alignment from line-height.'],
    tags: ['typography', 'units'],
  }),
  makeFeature({
    slug: 'rlh-unit',
    title: 'rlh unit',
    category: 'typography',
    support: 'baseline-newly',
    baselineYear: 2023,
    summary: 'Uses the root element line-height as a CSS unit.',
    cssFeatures: ['rlh'],
    demoIdeas: ['Space article sections on a root rhythm grid.'],
    tags: ['typography', 'units'],
  }),
  makeFeature({
    slug: 'font-relative-units',
    title: 'cap / ic / ric / rcap / rch / rex units',
    category: 'typography',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Font-metric-relative units for script-aware sizing and optical alignment.',
    cssFeatures: ['cap', 'ic', 'ric', 'rcap', 'rch', 'rex'],
    demoIdeas: ['Build a multilingual card using ic and ric with rem fallback.'],
    tags: ['typography', 'units', 'i18n'],
  }),
  makeFeature({
    slug: 'text-box-trim',
    title: 'text-box-trim',
    category: 'typography',
    support: 'experimental',
    baselineYear: 2025,
    summary: 'Trims extra font box space for more precise optical alignment.',
    cssFeatures: ['text-box-trim', 'text-box-edge', 'text-box'],
    demoIdeas: ['Optically center button labels with static padding fallback.'],
    tags: ['typography', 'future'],
  }),
  makeFeature({
    slug: 'text-decoration-skip-ink',
    title: 'text-decoration-skip-ink',
    category: 'typography',
    support: 'baseline-widely',
    summary: 'Skips underline ink through glyph descenders for cleaner links.',
    cssFeatures: ['text-decoration-skip-ink'],
    demoIdeas: ['Compare link underlines with and without ink skipping.'],
    tags: ['typography', 'links'],
  }),
  makeFeature({
    slug: 'hyphens',
    title: 'hyphens',
    category: 'typography',
    support: 'baseline-widely',
    summary: 'Allows language-aware hyphenation in narrow text columns.',
    cssFeatures: ['hyphens: auto'],
    demoIdeas: ['Improve narrow article cards with lang-aware hyphenation.'],
    tags: ['typography', 'readability'],
  }),
  makeFeature({
    slug: 'hyphenate-character',
    title: 'hyphenate-character',
    category: 'typography',
    support: 'progressive',
    baselineYear: 2023,
    summary: 'Controls the visible hyphenation character.',
    cssFeatures: ['hyphenate-character'],
    demoIdeas: ['Show custom hyphen glyphs with normal hyphen fallback.'],
    tags: ['typography'],
  }),
  makeFeature({
    slug: 'initial-letter',
    title: 'initial-letter',
    category: 'typography',
    support: 'progressive',
    baselineYear: 2023,
    summary: 'Creates drop caps with CSS instead of handcrafted spans.',
    cssFeatures: ['initial-letter'],
    demoIdeas: ['Style an article lead paragraph with a progressive drop cap.'],
    tags: ['typography', 'article'],
  }),
  makeFeature({
    slug: 'writing-mode',
    title: 'writing-mode and vertical controls',
    category: 'typography',
    support: 'baseline-widely',
    summary: 'Supports vertical scripts and vertical UI controls.',
    cssFeatures: ['writing-mode', 'text-orientation'],
    demoIdeas: ['Show a vertical label and range control in a multilingual card.'],
    tags: ['typography', 'i18n'],
  }),
  makeFeature({
    slug: 'scroll-driven-animations',
    title: 'Scroll-driven animations',
    category: 'motion',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Links animation progress to scroll progress instead of time.',
    cssFeatures: ['scroll-timeline', 'animation-timeline'],
    demoIdeas: ['Drive a reading progress bar from a scroll container.'],
    tags: ['motion', 'scroll', 'mvp'],
  }),
  makeFeature({
    slug: 'animation-timeline',
    title: 'animation-timeline',
    category: 'motion',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Chooses the timeline that controls an animation.',
    cssFeatures: ['animation-timeline'],
    demoIdeas: ['Switch a reveal animation from time-based to scroll-based.'],
    tags: ['motion', 'scroll'],
  }),
  makeFeature({
    slug: 'scroll-function',
    title: 'scroll() timeline',
    category: 'motion',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Creates an anonymous scroll progress timeline.',
    cssFeatures: ['animation-timeline: scroll()'],
    demoIdeas: ['Animate a sticky progress indicator from page scroll.'],
    tags: ['motion', 'scroll'],
  }),
  makeFeature({
    slug: 'view-function',
    title: 'view() timeline',
    category: 'motion',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Creates an anonymous view progress timeline for an element.',
    cssFeatures: ['animation-timeline: view()'],
    demoIdeas: ['Reveal cards as they enter a scrollport.'],
    tags: ['motion', 'view'],
  }),
  makeFeature({
    slug: 'view-timeline',
    title: 'view-timeline',
    category: 'motion',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Names an element visibility timeline for scroll-driven effects.',
    cssFeatures: ['view-timeline-name', 'view-timeline-axis'],
    demoIdeas: ['Coordinate multiple entry animations from one card timeline.'],
    tags: ['motion', 'mvp'],
  }),
  makeFeature({
    slug: 'animation-range',
    title: 'animation-range',
    category: 'motion',
    support: 'progressive',
    baselineYear: 2024,
    summary: 'Maps a scroll or view timeline segment to animation progress.',
    cssFeatures: ['animation-range'],
    demoIdeas: ['Reveal during entry, not across the whole scroll container.'],
    tags: ['motion', 'scroll'],
  }),
  makeFeature({
    slug: 'starting-style',
    title: '@starting-style',
    category: 'motion',
    support: 'baseline-newly',
    baselineYear: 2024,
    summary: 'Defines the initial before-change style for elements entering from display none or top layer.',
    cssFeatures: ['@starting-style'],
    demoIdeas: ['Animate a dialog when it enters the top layer.'],
    tags: ['motion', 'dialog', 'mvp'],
  }),
  makeFeature({
    slug: 'transition-behavior',
    title: 'transition-behavior: allow-discrete',
    category: 'motion',
    support: 'baseline-newly',
    baselineYear: 2024,
    summary: 'Allows discrete properties such as display and overlay to participate in transitions.',
    cssFeatures: ['transition-behavior: allow-discrete'],
    demoIdeas: ['Pair with @starting-style for top-layer entrance and exit.'],
    tags: ['motion', 'discrete'],
  }),
  makeFeature({
    slug: 'view-transitions-api',
    title: 'View Transitions API',
    category: 'motion',
    support: 'progressive',
    baselineYear: 2025,
    summary: 'Animates visual transitions between DOM states and routes.',
    cssFeatures: ['view-transition-name', '::view-transition-old()', '::view-transition-new()'],
    demoIdeas: ['Animate an image gallery state change when supported.'],
    tags: ['motion', 'transitions'],
  }),
  makeFeature({
    slug: 'view-transition-name',
    title: 'view-transition-name',
    category: 'motion',
    support: 'progressive',
    baselineYear: 2025,
    summary: 'Names an element for View Transition API snapshots.',
    cssFeatures: ['view-transition-name'],
    demoIdeas: ['Give gallery media a shared transition identity.'],
    tags: ['motion', 'transitions'],
  }),
  makeFeature({
    slug: 'view-transition-class',
    title: 'view-transition-class',
    category: 'motion',
    support: 'experimental',
    baselineYear: 2026,
    summary: 'Future grouping hook for styling view transition pseudo-elements.',
    cssFeatures: ['view-transition-class'],
    demoIdeas: ['Show grouped transition styling as demo-only syntax.'],
    tags: ['motion', 'future'],
  }),
  makeFeature({
    slug: 'prefers-reduced-motion',
    title: 'prefers-reduced-motion',
    category: 'motion',
    support: 'baseline-widely',
    summary: 'Adapts motion intensity for users who request reduced motion.',
    cssFeatures: ['@media (prefers-reduced-motion: reduce)'],
    demoIdeas: ['Disable scroll reveals and transitions globally.'],
    tags: ['motion', 'accessibility'],
  }),
  makeFeature({
    slug: 'dialog',
    title: 'dialog',
    category: 'components',
    support: 'baseline-widely',
    baselineYear: 2023,
    summary: 'Native modal and non-modal dialog element with top-layer behavior.',
    cssFeatures: ['dialog', '::backdrop', ':modal'],
    demoIdeas: ['Open a modal with progressive entrance styling.'],
    tags: ['components', 'native'],
  }),
  makeFeature({
    slug: 'popover',
    title: 'popover',
    category: 'components',
    support: 'baseline-newly',
    baselineYear: 2024,
    summary: 'Native lightweight top-layer popovers without custom dismissal wiring.',
    cssFeatures: ['popover', ':popover-open'],
    demoIdeas: ['Show a menu or note popover with anchor positioning enhancement.'],
    tags: ['components', 'native'],
  }),
  makeFeature({
    slug: 'anchor-positioned-popover',
    title: 'Anchor-positioned popover',
    category: 'components',
    support: 'progressive',
    baselineYear: 2025,
    summary: 'Combines popover top-layer behavior with CSS anchor positioning.',
    cssFeatures: ['popover', 'anchor-name', 'position-anchor'],
    demoIdeas: ['Tooltip aligns to its trigger without measuring in JavaScript.'],
    tags: ['components', 'popover'],
  }),
  makeFeature({
    slug: 'invoker-commands',
    title: 'Invoker commands',
    category: 'components',
    support: 'experimental',
    baselineYear: 2026,
    summary: 'Declarative button commands for showing popovers and dialogs.',
    cssFeatures: ['command', 'commandfor', 'popovertarget'],
    demoIdeas: ['Use declarative invokers when supported, React click handler otherwise.'],
    tags: ['components', 'future'],
  }),
  makeFeature({
    slug: 'closedby',
    title: 'closedby',
    category: 'components',
    support: 'experimental',
    baselineYear: 2026,
    summary: 'Configures which user actions can close a dialog.',
    cssFeatures: ['closedby'],
    demoIdeas: ['Document expected modal close behavior with standard dialog fallback.'],
    tags: ['components', 'dialog', 'future'],
  }),
  makeFeature({
    slug: 'customizable-select',
    title: 'Customizable select',
    category: 'components',
    support: 'experimental',
    baselineYear: 2026,
    summary: 'Future styling hooks for select internals while preserving native behavior.',
    cssFeatures: ['::picker(select)', 'appearance: base-select'],
    demoIdeas: ['Show enhanced select markup beside a regular select fallback.'],
    tags: ['components', 'forms', 'future'],
  }),
  makeFeature({
    slug: 'details-summary',
    title: 'details / summary',
    category: 'components',
    support: 'baseline-widely',
    summary: 'Native disclosure widget with keyboard and accessibility semantics.',
    cssFeatures: ['details', 'summary', ':open'],
    demoIdeas: ['Build an accordion with animated content when supported.'],
    tags: ['components', 'native'],
  }),
  makeFeature({
    slug: 'scroll-snap-carousel',
    title: 'Scroll-snap carousel',
    category: 'components',
    support: 'baseline-widely',
    summary: 'Uses native scrolling and snap points for accessible carousel behavior.',
    cssFeatures: ['scroll-snap-type', 'scroll-snap-align'],
    demoIdeas: ['Build a keyboard-scrollable demo carousel.'],
    tags: ['components', 'scroll'],
  }),
  makeFeature({
    slug: 'scroll-button',
    title: '::scroll-button()',
    category: 'components',
    support: 'experimental',
    baselineYear: 2026,
    summary: 'Future pseudo-elements for native carousel scroll buttons.',
    cssFeatures: ['::scroll-button()'],
    demoIdeas: ['Show intended syntax with regular buttons fallback.'],
    tags: ['components', 'future'],
  }),
  makeFeature({
    slug: 'scroll-marker',
    title: '::scroll-marker()',
    category: 'components',
    support: 'experimental',
    baselineYear: 2026,
    summary: 'Future pseudo-elements for native carousel markers.',
    cssFeatures: ['::scroll-marker()', '::scroll-marker-group'],
    demoIdeas: ['Show marker syntax with static pagination dots fallback.'],
    tags: ['components', 'future'],
  }),
  makeFeature({
    slug: 'scroll-target-group',
    title: 'scroll-target-group',
    category: 'components',
    support: 'experimental',
    baselineYear: 2026,
    summary: 'Future primitive for grouping scroll targets.',
    cssFeatures: ['scroll-target-group'],
    demoIdeas: ['Document native carousel target behavior as demo-only.'],
    tags: ['components', 'future'],
  }),
  makeFeature({
    slug: 'backdrop-filter',
    title: 'backdrop-filter',
    category: 'effects',
    support: 'baseline-newly',
    baselineYear: 2024,
    summary: 'Applies blur and color effects to pixels behind an element.',
    cssFeatures: ['backdrop-filter'],
    demoIdeas: ['Create a glass lab panel with solid-color fallback.'],
    tags: ['effects', 'glass'],
  }),
  makeFeature({
    slug: 'filter',
    title: 'filter',
    category: 'effects',
    support: 'baseline-widely',
    summary: 'Applies visual effects such as blur, contrast, brightness, and hue rotation.',
    cssFeatures: ['filter'],
    demoIdeas: ['Show image treatment controls with CSS filters.'],
    tags: ['effects', 'media'],
  }),
  makeFeature({
    slug: 'mix-blend-mode',
    title: 'mix-blend-mode',
    category: 'effects',
    support: 'baseline-widely',
    summary: 'Controls how an element blends with its backdrop.',
    cssFeatures: ['mix-blend-mode'],
    demoIdeas: ['Blend labels over gradient and image-like panels.'],
    tags: ['effects', 'blend'],
  }),
  makeFeature({
    slug: 'isolation',
    title: 'isolation',
    category: 'effects',
    support: 'baseline-widely',
    summary: 'Creates a new stacking context to contain blending effects.',
    cssFeatures: ['isolation: isolate'],
    demoIdeas: ['Prevent blend modes from leaking outside a card.'],
    tags: ['effects', 'blend'],
  }),
  makeFeature({
    slug: 'mask-image',
    title: 'mask-image',
    category: 'effects',
    support: 'baseline-newly',
    baselineYear: 2023,
    summary: 'Uses alpha masks to fade or reveal parts of an element.',
    cssFeatures: ['mask-image'],
    demoIdeas: ['Fade long content edges without overlay elements.'],
    tags: ['effects', 'mask'],
  }),
  makeFeature({
    slug: 'clip-path',
    title: 'clip-path',
    category: 'effects',
    support: 'baseline-widely',
    summary: 'Clips an element to geometric or path-like shapes.',
    cssFeatures: ['clip-path'],
    demoIdeas: ['Create a blob card with polygon fallback.'],
    tags: ['effects', 'shape'],
  }),
  makeFeature({
    slug: 'shape-function',
    title: 'shape()',
    category: 'effects',
    support: 'experimental',
    baselineYear: 2025,
    summary: 'Future shape function for expressive CSS paths.',
    cssFeatures: ['shape()'],
    demoIdeas: ['Show future blob syntax with clip-path polygon fallback.'],
    tags: ['effects', 'future'],
  }),
  makeFeature({
    slug: 'offset-path',
    title: 'offset-path / motion path',
    category: 'effects',
    support: 'baseline-newly',
    baselineYear: 2023,
    summary: 'Moves elements along a path using CSS.',
    cssFeatures: ['offset-path', 'offset-distance'],
    demoIdeas: ['Animate a small marker around a diagram with reduced-motion fallback.'],
    tags: ['effects', 'motion'],
  }),
  makeFeature({
    slug: 'corner-shape',
    title: 'corner-shape',
    category: 'effects',
    support: 'experimental',
    baselineYear: 2026,
    summary: 'Future corner treatment options beyond rounded rectangles.',
    cssFeatures: ['corner-shape'],
    demoIdeas: ['Show notch and scoop card variants when supported.'],
    tags: ['effects', 'future'],
  }),
  makeFeature({
    slug: 'image-rendering',
    title: 'image-rendering',
    category: 'effects',
    support: 'baseline-widely',
    summary: 'Controls scaling quality for pixel art and crisp previews.',
    cssFeatures: ['image-rendering: pixelated'],
    demoIdeas: ['Compare smooth and pixelated scaling on the same asset.'],
    tags: ['effects', 'media'],
  }),
  makeFeature({
    slug: 'scrollbar-color',
    title: 'scrollbar-color',
    category: 'effects',
    support: 'baseline-newly',
    baselineYear: 2024,
    summary: 'Sets thumb and track colors for scrollbars.',
    cssFeatures: ['scrollbar-color'],
    demoIdeas: ['Theme a scrollable code panel with accessible contrast.'],
    tags: ['effects', 'scrollbar'],
  }),
  makeFeature({
    slug: 'scrollbar-width',
    title: 'scrollbar-width',
    category: 'effects',
    support: 'baseline-newly',
    baselineYear: 2024,
    summary: 'Controls scrollbar thickness where supported.',
    cssFeatures: ['scrollbar-width'],
    demoIdeas: ['Use thin scrollbars in dense lab panels without hiding them.'],
    tags: ['effects', 'scrollbar'],
  }),
  makeFeature({
    slug: 'scrollbar-gutter',
    title: 'scrollbar-gutter',
    category: 'effects',
    support: 'baseline-newly',
    baselineYear: 2024,
    summary: 'Reserves scrollbar space to avoid layout shift.',
    cssFeatures: ['scrollbar-gutter'],
    demoIdeas: ['Keep side-by-side scroll panels aligned as content overflows.'],
    tags: ['effects', 'scrollbar', 'layout'],
  }),
  makeFeature({
    slug: 'css-only-tic-tac-toe',
    title: 'CSS-only tic-tac-toe',
    category: 'games',
    support: 'experimental',
    summary: 'Planned selector-driven board game using radios, labels, and stateful CSS.',
    cssFeatures: [':checked', ':has()', 'grid', 'custom properties'],
    demoIdeas: ['Use form controls as the state source and CSS selectors for win-state visualization.'],
    tags: ['games', 'planned'],
  }),
  makeFeature({
    slug: 'css-only-maze',
    title: 'CSS-only maze',
    category: 'games',
    support: 'experimental',
    summary: 'Planned maze interaction using focus, hover, scroll, and custom properties.',
    cssFeatures: [':focus-within', ':has()', 'offset-path'],
    demoIdeas: ['Prototype keyboard-friendly maze checkpoints before adding full rules.'],
    tags: ['games', 'planned'],
  }),
  makeFeature({
    slug: 'css-only-memory-cards',
    title: 'CSS-only memory cards',
    category: 'games',
    support: 'experimental',
    summary: 'Planned memory-card demo using native controls and 3D transform states.',
    cssFeatures: [':checked', 'transform-style', 'backface-visibility'],
    demoIdeas: ['Use checkboxes to reveal cards and CSS transitions for flips.'],
    tags: ['games', 'planned'],
  }),
  makeFeature({
    slug: 'css-only-toggle-puzzle',
    title: 'CSS-only toggle puzzle',
    category: 'games',
    support: 'experimental',
    summary: 'Planned puzzle using checkbox state, sibling selectors, and cascade layers.',
    cssFeatures: [':checked', '~', ':has()'],
    demoIdeas: ['Create a small lights-out style board with visible fallback controls.'],
    tags: ['games', 'planned'],
  }),
  makeFeature({
    slug: 'css-only-animated-character',
    title: 'CSS-only animated character',
    category: 'games',
    support: 'progressive',
    summary: 'Planned character animation using sprite timing, motion paths, and reduced-motion handling.',
    cssFeatures: ['steps()', 'offset-path', 'prefers-reduced-motion'],
    demoIdeas: ['Animate a CSS-built character with a static reduced-motion pose.'],
    tags: ['games', 'planned', 'motion'],
  }),
]

export const featuredFeatureSlugs = [
  'container-size-queries',
  'oklch',
  'has',
  'scroll-driven-animations',
  'cascade-layers',
  'starting-style',
]

export const mvpFeatureSlugs = [...customDemoSlugs]

export function getFeaturesByCategory(category: FeatureCategory) {
  return features.filter((feature) => feature.category === category)
}

export function getFeatureBySlug(slug: string) {
  return features.find((feature) => feature.slug === slug)
}
