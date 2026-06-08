import type { FeatureControl, FeatureSnippetTemplate, FeatureTarget } from '../../../data/features'
import DemoShell from '../../ui/DemoShell'
import { getDemoFeature } from '../getDemoFeature'

const css = `
.style-query-demo {
  --variant: standard;
  --premium-glow: {{premiumGlow}};
  container-name: themed-card;
}

.style-query-demo--premium {
  --variant: premium;
}

.style-query-demo--premium .style-query-demo__inner {
  border-color: var(--color-accent);
}

@container themed-card style(--variant: premium) {
  .style-query-demo__inner {
    background: linear-gradient(135deg, var(--surface-2), var(--accent-soft));
    box-shadow: 0 1rem 3rem rgb(94 99 255 / var(--premium-glow));
  }
}
`

const controls = [
  {
    id: 'premiumGlow',
    label: 'Premium glow',
    type: 'range',
    cssVar: '--premium-glow',
    defaultValue: '0.28',
    min: 0,
    max: 0.55,
    step: 0.01,
  },
] satisfies FeatureControl[]

const targets = [
  { id: 'standard', label: 'Standard card', selector: '.style-query-demo--standard .style-query-demo__inner' },
  { id: 'premium', label: 'Premium card', selector: '.style-query-demo--premium .style-query-demo__inner' },
] satisfies FeatureTarget[]

const snippets = [
  {
    id: 'style-query-themed-card',
    title: 'Dynamic style query CSS',
    template: css,
  },
] satisfies FeatureSnippetTemplate[]

function StyleQueryThemedCard() {
  const feature = getDemoFeature('container-style-queries')

  return (
    <DemoShell
      feature={feature}
      title="Style Query Themed Card"
      explanation="The parent exposes a --variant token. Descendants can respond through a container style query when supported, with a class fallback already in the cascade."
      css={css}
      controls={controls}
      targets={targets}
      snippets={snippets}
      computedProperties={['container-name', 'background-color', 'background-image', 'border-color', 'box-shadow']}
      fallback="The premium class applies a border and tokenized surface before the style query runs. Unsupported browsers keep the class-based premium styling."
    >
      <div className="style-query-grid">
        <article className="style-query-demo style-query-demo--standard">
          <div className="style-query-demo__inner">
            <p className="eyebrow">--variant: standard</p>
            <h3>Standard workspace</h3>
            <p>Base card styles apply without descendant classes.</p>
          </div>
        </article>
        <article className="style-query-demo style-query-demo--premium">
          <div className="style-query-demo__inner">
            <p className="eyebrow">--variant: premium</p>
            <h3>Premium workspace</h3>
            <p>Style queries enhance the descendant when the ancestor token matches.</p>
          </div>
        </article>
      </div>
    </DemoShell>
  )
}

export default StyleQueryThemedCard
