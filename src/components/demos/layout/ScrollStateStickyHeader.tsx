import type { FeatureControl, FeatureSnippetTemplate, FeatureTarget } from '../../../data/features'
import DemoShell from '../../ui/DemoShell'
import { getDemoFeature } from '../getDemoFeature'

const css = `
.sticky-state-demo__sticky {
  position: sticky;
  inset-block-start: 0;
  container-type: scroll-state;
}

.sticky-state-demo__bar {
  border-block-end: 1px solid var(--border-subtle);
  --sticky-shadow-alpha: {{shadowAlpha}};
}

@container scroll-state(stuck: top) {
  .sticky-state-demo__bar {
    box-shadow: 0 1rem 2rem rgb(0 0 0 / var(--sticky-shadow-alpha));
    border-color: transparent;
  }
}
`

const controls = [
  {
    id: 'shadowAlpha',
    label: 'Stuck shadow',
    type: 'range',
    cssVar: '--sticky-shadow-alpha',
    defaultValue: '0.22',
    min: 0.05,
    max: 0.5,
    step: 0.01,
  },
] satisfies FeatureControl[]

const targets = [
  { id: 'sticky', label: 'Sticky container', selector: '.sticky-state-demo__sticky' },
  { id: 'bar', label: 'Sticky bar', selector: '.sticky-state-demo__bar' },
] satisfies FeatureTarget[]

const snippets = [
  {
    id: 'scroll-state-sticky-header',
    title: 'Dynamic scroll-state CSS',
    template: css,
  },
] satisfies FeatureSnippetTemplate[]

function ScrollStateStickyHeader() {
  const feature = getDemoFeature('scroll-state-queries')

  return (
    <DemoShell
      feature={feature}
      title="Scroll-State Sticky Header"
      explanation="The sticky header becomes more elevated only when the browser reports that it is stuck. Scroll inside the panel to see the progressive enhancement."
      css={css}
      controls={controls}
      targets={targets}
      snippets={snippets}
      computedProperties={['position', 'inset-block-start', 'container-type', 'box-shadow', 'border-block-end-color']}
      fallback="The fallback keeps a subtle border and surface treatment. Scroll-state queries are labeled experimental because support is currently limited."
    >
      <div className="sticky-state-demo" tabIndex={0} aria-label="Scrollable panel with sticky header">
        <div className="sticky-state-demo__sticky">
          <div className="sticky-state-demo__bar">
            <strong>Release notes</strong>
            <span>Shadow appears only while stuck</span>
          </div>
        </div>
        {Array.from({ length: 8 }, (_, index) => (
          <section className="sticky-state-demo__row" key={index}>
            <h3>Feature checkpoint {index + 1}</h3>
            <p>
              Container scroll-state queries make sticky, snapped, and scrollable state observable to CSS without
              a scroll listener.
            </p>
          </section>
        ))}
      </div>
    </DemoShell>
  )
}

export default ScrollStateStickyHeader
