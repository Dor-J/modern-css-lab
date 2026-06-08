import type { FeatureControl, FeatureSnippetTemplate, FeatureTarget } from '../../../data/features'
import DemoShell from '../../ui/DemoShell'
import { getDemoFeature } from '../getDemoFeature'

const css = `
.product-card {
  container-type: inline-size;
  --card-gap: {{cardGap}};
  --card-padding: {{cardPadding}};
  --media-size: {{mediaSize}};
}

.product-card__body {
  display: grid;
  gap: max(var(--card-gap), 4cqi);
  padding: max(var(--card-padding), 5cqi);
}

@container (inline-size >= 34rem) {
  .product-card__body {
    grid-template-columns: 0.85fr 1.15fr;
    align-items: center;
  }
}
`

const controls = [
  {
    id: 'cardGap',
    label: 'Gap',
    type: 'range',
    cssVar: '--card-gap',
    defaultValue: '0.75',
    min: 0.5,
    max: 2,
    step: 0.05,
    unit: 'rem',
  },
  {
    id: 'cardPadding',
    label: 'Padding',
    type: 'range',
    cssVar: '--card-padding',
    defaultValue: '1',
    min: 0.75,
    max: 2.5,
    step: 0.05,
    unit: 'rem',
  },
  {
    id: 'mediaSize',
    label: 'Media size',
    type: 'range',
    cssVar: '--media-size',
    defaultValue: '10',
    min: 8,
    max: 16,
    step: 0.5,
    unit: 'rem',
  },
] satisfies FeatureControl[]

const targets = [
  { id: 'card', label: 'Card container', selector: '.product-card' },
  { id: 'body', label: 'Card body', selector: '.product-card__body' },
  { id: 'media', label: 'Media block', selector: '.product-card__media' },
] satisfies FeatureTarget[]

const snippets = [
  {
    id: 'container-query-product-card',
    title: 'Dynamic container query CSS',
    template: css,
  },
] satisfies FeatureSnippetTemplate[]

function ContainerQueryProductCard() {
  const feature = getDemoFeature('container-size-queries')

  return (
    <DemoShell
      feature={feature}
      title="Container Query Product Card"
      explanation="The same card component changes layout in narrow and wide containers. The breakpoint belongs to the component container, not to the viewport."
      css={css}
      controls={controls}
      targets={targets}
      snippets={snippets}
      computedProperties={['container-type', 'display', 'grid-template-columns', 'gap', 'padding', 'inline-size']}
      fallback="The fallback is a single-column product card. Browsers with container queries progressively upgrade the wide card layout and container-query-unit spacing."
    >
      <div className="cq-demo" aria-label="Two product cards in different container widths">
        {['narrow', 'wide'].map((size) => (
          <div className={`cq-demo__frame cq-demo__frame--${size}`} key={size}>
            <p className="demo-label">{size} container</p>
            <article className="product-card">
              <div className="product-card__body">
                <div className="product-card__media" aria-hidden="true">
                  <span />
                </div>
                <div className="product-card__content">
                  <p className="eyebrow">Container aware</p>
                  <h3>Adaptive field kit</h3>
                  <p>
                    The card uses <code>container-type: inline-size</code> and cqi spacing so it can live in
                    grids, sidebars, or split panes without new React props.
                  </p>
                  <div className="product-card__actions">
                    <a href="#container-size-queries">Inspect CSS</a>
                    <span>cqi spacing</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </DemoShell>
  )
}

export default ContainerQueryProductCard
