import type { FeatureControl, FeatureSnippetTemplate, FeatureTarget } from '../../../data/features'
import DemoShell from '../../ui/DemoShell'
import { getDemoFeature } from '../getDemoFeature'

const css = `
.oklch-generator {
  --lab-base-fallback: #6d5dfc;
  --lab-base: {{baseColor}};
  --surface-mix: {{surfaceMix}};
}

.oklch-token-card {
  background: var(--lab-base-fallback);
  border-color: rgb(255 255 255 / 0.24);
}

@supports (color: color-mix(in oklch, red, white)) {
  .oklch-token-card {
    --token-surface: color-mix(in oklch, var(--lab-base), var(--surface-1) var(--surface-mix));
    --token-border: color-mix(in oklch, var(--lab-base), white 56%);
    --token-hover: color-mix(in oklch, var(--lab-base), white 16%);
    --token-muted: color-mix(in oklch, var(--lab-base), gray 64%);
    background: var(--token-surface);
    border-color: var(--token-border);
  }
}
`

const controls = [
  {
    id: 'baseColor',
    label: 'Base token',
    type: 'select',
    cssVar: '--lab-base',
    defaultValue: 'oklch(62% 0.21 286)',
    options: [
      { label: 'Violet', value: 'oklch(62% 0.21 286)' },
      { label: 'Coral', value: 'oklch(66% 0.2 22)' },
      { label: 'Mint', value: 'oklch(68% 0.16 165)' },
    ],
  },
  {
    id: 'surfaceMix',
    label: 'Surface mix',
    type: 'range',
    cssVar: '--surface-mix',
    defaultValue: '72',
    min: 45,
    max: 88,
    step: 1,
    unit: '%',
  },
] satisfies FeatureControl[]

const targets = [
  { id: 'generator', label: 'Generator root', selector: '.oklch-generator' },
  { id: 'card', label: 'Token card', selector: '.oklch-token-card' },
  { id: 'hover', label: 'Button', selector: '.oklch-token-card button' },
] satisfies FeatureTarget[]

const snippets = [
  {
    id: 'oklch-theme-generator',
    title: 'Dynamic OKLCH token CSS',
    template: css,
  },
] satisfies FeatureSnippetTemplate[]

function OklchThemeGenerator() {
  const feature = getDemoFeature('oklch')

  return (
    <DemoShell
      feature={feature}
      title="OKLCH Theme Generator"
      explanation="Choose one base token. CSS derives the surface, border, hover, muted, and shadow colors with perceptual color mixing and custom properties."
      css={css}
      controls={controls}
      targets={targets}
      snippets={snippets}
      computedProperties={['color', 'background-color', 'border-color', 'box-shadow']}
      fallback="Static sRGB colors are declared first. OKLCH and color-mix() replace them only inside @supports."
    >
      <div className="oklch-generator">
        <div className="swatch-controls" aria-label="Generated token palette">
          <span className="swatch swatch--violet" aria-hidden="true" />
          <span className="swatch swatch--coral" aria-hidden="true" />
          <span className="swatch swatch--mint" aria-hidden="true" />
          <p>Change the base token with the live controls. The card and snippet update together.</p>
        </div>
        <article className="oklch-token-card">
          <p className="eyebrow">Derived tokens</p>
          <h3>One accent, five useful variants</h3>
          <div className="token-strip" aria-label="Generated token swatches">
            <span data-token="surface" />
            <span data-token="border" />
            <span data-token="hover" />
            <span data-token="muted" />
            <span data-token="shadow" />
          </div>
          <button type="button">Hover uses generated token</button>
        </article>
      </div>
    </DemoShell>
  )
}

export default OklchThemeGenerator
