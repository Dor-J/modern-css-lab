import type { FeatureControl, FeatureSnippetTemplate, FeatureTarget } from '../../../data/features'
import DemoShell from '../../ui/DemoShell'
import { getDemoFeature } from '../getDemoFeature'

const css = `
.view-reveal-card {
  opacity: 1;
  transform: none;
}

@supports (animation-timeline: view()) {
  .view-reveal-card {
    --reveal-opacity: {{startOpacity}};
    --reveal-distance: {{distance}};
    opacity: var(--reveal-opacity);
    transform: translateY(var(--reveal-distance));
    animation: reveal-card linear both;
    animation-timeline: view(block);
    animation-range: entry 10% cover 35%;
  }
}

@keyframes reveal-card {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`

const controls = [
  {
    id: 'startOpacity',
    label: 'Start opacity',
    type: 'range',
    cssVar: '--reveal-opacity',
    defaultValue: '0.25',
    min: 0,
    max: 0.8,
    step: 0.05,
  },
  {
    id: 'distance',
    label: 'Distance',
    type: 'range',
    cssVar: '--reveal-distance',
    defaultValue: '1.5',
    min: 0,
    max: 4,
    step: 0.1,
    unit: 'rem',
  },
] satisfies FeatureControl[]

const targets = [
  { id: 'scroller', label: 'Reveal scrollport', selector: '.view-reveal-demo' },
  { id: 'card', label: 'Reveal card', selector: '.view-reveal-card' },
] satisfies FeatureTarget[]

const snippets = [
  {
    id: 'view-timeline-reveal',
    title: 'Dynamic view timeline CSS',
    template: css,
  },
] satisfies FeatureSnippetTemplate[]

function ViewTimelineRevealDemo() {
  const feature = getDemoFeature('view-timeline')

  return (
    <DemoShell
      feature={feature}
      title="View Timeline Reveal Cards"
      explanation="Each card animates as it enters the scrollport. The visibility timeline belongs to the element, so JavaScript does not need intersection observers."
      css={css}
      controls={controls}
      targets={targets}
      snippets={snippets}
      computedProperties={['animation-timeline', 'animation-range-start', 'animation-range-end', 'opacity', 'transform']}
      fallback="Unsupported browsers see fully visible cards. Reduced-motion users also receive the non-animated state."
    >
      <div className="view-reveal-demo" tabIndex={0} aria-label="Scrollable reveal card list">
        {['Container queries', 'Perceptual color', 'Parent selectors', 'Scroll timelines', 'Cascade layers'].map(
          (title) => (
            <article className="view-reveal-card" key={title}>
              <p className="eyebrow">view timeline</p>
              <h3>{title}</h3>
              <p>The card reveals during the entry range and settles before the center of the scrollport.</p>
            </article>
          ),
        )}
      </div>
    </DemoShell>
  )
}

export default ViewTimelineRevealDemo
