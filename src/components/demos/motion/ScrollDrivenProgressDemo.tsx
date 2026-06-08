import type { FeatureControl, FeatureSnippetTemplate, FeatureTarget } from '../../../data/features'
import DemoShell from '../../ui/DemoShell'
import { getDemoFeature } from '../getDemoFeature'

const css = `
.scroll-progress-demo__scroller {
  overflow: auto;
  scroll-timeline: --demo-progress block;
}

.scroll-progress-demo__bar {
  block-size: {{barSize}};
  transform-origin: left;
  animation: grow-progress linear both;
  animation-timeline: --demo-progress;
}

@keyframes grow-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
`

const controls = [
  {
    id: 'barSize',
    label: 'Bar size',
    type: 'range',
    cssVar: '--progress-size',
    defaultValue: '0.45',
    min: 0.2,
    max: 1,
    step: 0.05,
    unit: 'rem',
  },
] satisfies FeatureControl[]

const targets = [
  { id: 'scroller', label: 'Scroll container', selector: '.scroll-progress-demo__scroller' },
  { id: 'bar', label: 'Progress bar', selector: '.scroll-progress-demo__bar' },
] satisfies FeatureTarget[]

const snippets = [
  {
    id: 'scroll-driven-progress',
    title: 'Dynamic scroll timeline CSS',
    template: css,
  },
] satisfies FeatureSnippetTemplate[]

function ScrollDrivenProgressDemo() {
  const feature = getDemoFeature('scroll-driven-animations')

  return (
    <DemoShell
      feature={feature}
      title="Scroll-Driven Progress Indicator"
      explanation="A named scroll timeline drives the progress bar at the top of the scroll panel. There is no scroll event listener."
      css={css}
      controls={controls}
      targets={targets}
      snippets={snippets}
      computedProperties={['scroll-timeline-name', 'animation-name', 'animation-timeline', 'transform', 'block-size']}
      fallback="The fallback shows a static accent rule. The animated progress bar only runs when scroll-timeline and animation-timeline are supported."
    >
      <div className="scroll-progress-demo">
        <div className="scroll-progress-demo__scroller" tabIndex={0} aria-label="Scrollable article with CSS progress">
          <div className="scroll-progress-demo__bar" aria-hidden="true" />
          {Array.from({ length: 9 }, (_, index) => (
            <section key={index}>
              <h3>Scroll chapter {index + 1}</h3>
              <p>
                Scroll-driven animations let reading progress, reveals, timelines, and scrubbed UI stay tied to
                browser-managed scroll state.
              </p>
            </section>
          ))}
        </div>
      </div>
    </DemoShell>
  )
}

export default ScrollDrivenProgressDemo
