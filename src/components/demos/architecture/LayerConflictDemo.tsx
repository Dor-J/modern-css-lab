import type { FeatureControl, FeatureSnippetTemplate, FeatureTarget } from '../../../data/features'
import DemoShell from '../../ui/DemoShell'
import { getDemoFeature } from '../getDemoFeature'

const css = `
@layer demo-base, demo-utilities;

@layer demo-utilities {
  .layered-button {
    --utility-color: {{utilityColor}};
    background: var(--utility-color);
  }
}

@layer demo-base {
  #layer-demo .layered-button {
    background: {{baseColor}};
  }
}

/* The later demo-utilities layer wins even with lower specificity. */
`

const controls = [
  {
    id: 'utilityColor',
    label: 'Utility layer',
    type: 'select',
    cssVar: '--utility-color',
    defaultValue: 'var(--color-accent-2)',
    options: [
      { label: 'Mint', value: 'var(--color-accent-2)' },
      { label: 'Violet', value: 'var(--color-accent)' },
      { label: 'Copper', value: 'var(--color-accent-3)' },
    ],
  },
  {
    id: 'baseColor',
    label: 'Base layer',
    type: 'select',
    cssVar: '--base-layer-color',
    defaultValue: 'var(--surface-3)',
    options: [
      { label: 'Surface', value: 'var(--surface-3)' },
      { label: 'Danger', value: 'var(--danger)' },
      { label: 'Info', value: 'var(--info)' },
    ],
  },
] satisfies FeatureControl[]

const targets = [
  { id: 'unlayered', label: 'Unlayered button', selector: '.unlayered-button' },
  { id: 'layered', label: 'Layered button', selector: '.layered-button' },
  { id: 'demo', label: 'Demo group', selector: '.layer-conflict-demo' },
] satisfies FeatureTarget[]

const snippets = [
  {
    id: 'layer-conflict',
    title: 'Dynamic layer order CSS',
    template: css,
  },
] satisfies FeatureSnippetTemplate[]

function LayerConflictDemo() {
  const feature = getDemoFeature('cascade-layers')

  return (
    <DemoShell
      feature={feature}
      title="@layer Conflict Demo"
      explanation="The unlayered side shows specificity pressure. The layered side shows explicit cascade order, where a low-specificity utility can intentionally win."
      css={css}
      controls={controls}
      targets={targets}
      snippets={snippets}
      computedProperties={['background-color', 'color', 'border-color', 'display']}
      fallback="@layer is broadly supported in modern browsers. Without layers, normal source order and specificity apply."
    >
      <div className="layer-conflict-demo" id="layer-demo">
        <article>
          <p className="eyebrow">Unlayered</p>
          <h3>Specificity trap</h3>
          <button className="unlayered-button utility-button" type="button">
            Utility loses
          </button>
          <p>An ID selector beats the reusable utility color.</p>
        </article>
        <article>
          <p className="eyebrow">Layered</p>
          <h3>Intentional order</h3>
          <button className="layered-button" type="button">
            Utility wins
          </button>
          <p>The later utility layer wins without increasing selector weight.</p>
        </article>
      </div>
    </DemoShell>
  )
}

export default LayerConflictDemo
