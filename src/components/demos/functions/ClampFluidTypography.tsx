import type { FeatureControl, FeatureSnippetTemplate, FeatureTarget } from '../../../data/features'
import DemoShell from '../../ui/DemoShell'
import { getDemoFeature } from '../getDemoFeature'

const css = `
.fluid-type-demo h3 {
  font-size: clamp({{minSize}}, {{fluidSize}} + 0.75rem, {{maxSize}});
  line-height: 0.95;
  text-wrap: balance;
}

.fluid-type-demo p {
  font-size: clamp(1rem, 1.6cqi + 0.75rem, 1.25rem);
}

.fluid-type-demo__measure {
  inline-size: min(100%, 58rem);
}
`

const controls = [
  {
    id: 'minSize',
    label: 'Minimum',
    type: 'range',
    cssVar: '--fluid-min',
    defaultValue: '2',
    min: 1.25,
    max: 3,
    step: 0.05,
    unit: 'rem',
  },
  {
    id: 'fluidSize',
    label: 'Fluid slope',
    type: 'range',
    cssVar: '--fluid-slope',
    defaultValue: '8',
    min: 3,
    max: 12,
    step: 0.25,
    unit: 'cqi',
  },
  {
    id: 'maxSize',
    label: 'Maximum',
    type: 'range',
    cssVar: '--fluid-max',
    defaultValue: '5.75',
    min: 3,
    max: 7,
    step: 0.05,
    unit: 'rem',
  },
] satisfies FeatureControl[]

const targets = [
  { id: 'demo', label: 'Type container', selector: '.fluid-type-demo' },
  { id: 'heading', label: 'Heading', selector: '.fluid-type-demo h3' },
  { id: 'body', label: 'Body copy', selector: '.fluid-type-demo p:not(.eyebrow)' },
] satisfies FeatureTarget[]

const snippets = [
  {
    id: 'clamp-fluid-type',
    title: 'Dynamic clamp CSS',
    template: css,
  },
] satisfies FeatureSnippetTemplate[]

function ClampFluidTypography() {
  const feature = getDemoFeature('clamp')

  return (
    <DemoShell
      feature={feature}
      title="clamp() Fluid Typography"
      explanation="The heading and body copy scale between explicit minimum and maximum values. Resize the viewport or container to see fluid behavior without media queries."
      css={css}
      controls={controls}
      targets={targets}
      snippets={snippets}
      computedProperties={['container-type', 'font-size', 'line-height', 'text-wrap', 'inline-size']}
      fallback="clamp() is widely available. A fixed font-size can be declared first if your project has legacy browser requirements."
    >
      <article className="fluid-type-demo">
        <div className="fluid-type-demo__measure">
          <p className="eyebrow">min 2rem / preferred 8cqi / max 5.75rem</p>
          <h3>Fluid type that respects bounds</h3>
          <p>
            The text grows when the component has space, then stops at a designed maximum so screenshots and
            dense layouts stay controlled.
          </p>
        </div>
        <div className="fluid-type-demo__ruler" aria-label="Fluid type bounds">
          <span>min</span>
          <span>preferred</span>
          <span>max</span>
        </div>
      </article>
    </DemoShell>
  )
}

export default ClampFluidTypography
