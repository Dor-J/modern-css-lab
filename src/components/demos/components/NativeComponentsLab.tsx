import type { FeatureControl, FeatureSnippetTemplate, FeatureTarget } from '../../../data/features'
import DemoShell from '../../ui/DemoShell'
import { getDemoFeature } from '../getDemoFeature'

const css = `
.native-lab {
  --anchor-gap: {{anchorGap}};
  --carousel-size: {{carouselSize}};
  --panel-tint: {{panelTint}};
}

.native-lab__anchor {
  anchor-name: --native-trigger;
}

.native-lab__popover {
  inset: unset;
  margin: 0;
  border-color: color-mix(in srgb, var(--panel-tint), var(--border-subtle) 44%);
}

@supports (position-anchor: --native-trigger) {
  .native-lab__popover {
    position-anchor: --native-trigger;
    inset-block-start: calc(anchor(bottom) + var(--anchor-gap));
    inset-inline-start: anchor(left);
  }
}

.native-lab__carousel {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min(82%, var(--carousel-size));
  overflow-x: auto;
  scroll-snap-type: inline mandatory;
}

.native-lab__slide {
  scroll-snap-align: start;
}
`

const controls = [
  {
    id: 'anchorGap',
    label: 'Anchor gap',
    type: 'range',
    cssVar: '--anchor-gap',
    defaultValue: '0.75',
    min: 0,
    max: 2,
    step: 0.05,
    unit: 'rem',
  },
  {
    id: 'carouselSize',
    label: 'Slide size',
    type: 'range',
    cssVar: '--carousel-size',
    defaultValue: '18',
    min: 12,
    max: 28,
    step: 1,
    unit: 'rem',
  },
  {
    id: 'panelTint',
    label: 'Panel tint',
    type: 'select',
    cssVar: '--panel-tint',
    defaultValue: 'var(--color-accent)',
    options: [
      { label: 'Violet', value: 'var(--color-accent)' },
      { label: 'Mint', value: 'var(--color-accent-2)' },
      { label: 'Copper', value: 'var(--color-accent-3)' },
    ],
  },
] satisfies FeatureControl[]

const targets = [
  { id: 'anchor', label: 'Anchor trigger', selector: '.native-lab__anchor' },
  { id: 'popover', label: 'Popover panel', selector: '.native-lab__popover' },
  { id: 'carousel', label: 'Scroll snap carousel', selector: '.native-lab__carousel' },
  { id: 'details', label: 'Details disclosure', selector: '.native-lab details' },
] satisfies FeatureTarget[]

const snippets = [
  {
    id: 'native-components-lab',
    title: 'Dynamic native component CSS',
    template: css,
  },
] satisfies FeatureSnippetTemplate[]

function NativeComponentsLab() {
  const feature = getDemoFeature('popover')

  return (
    <DemoShell
      feature={feature}
      title="Native Component Workbench"
      explanation="This page now exercises real platform UI: popover, anchor positioning, details/summary, and an accessible scroll-snap carousel."
      css={css}
      controls={controls}
      targets={targets}
      snippets={snippets}
      computedProperties={['anchor-name', 'position-anchor', 'inset-block-start', 'overflow-x', 'scroll-snap-type', 'scroll-snap-align']}
      fallback="Without popover or anchor positioning, the disclosure and carousel remain usable and the popover can fall back to normal document flow."
      why="Native controls carry focus, semantics, and platform behavior. CSS should enhance their placement and polish without replacing the component state model."
    >
      <section className="native-lab">
        <div className="native-lab__top">
          <button className="native-lab__anchor" type="button" popoverTarget="native-lab-popover">
            Open anchored popover
          </button>
          <div className="native-lab__popover" id="native-lab-popover" popover="auto">
            <p className="eyebrow">popover + anchor</p>
            <strong>Anchored platform panel</strong>
            <p>When anchor positioning is supported, CSS places this panel against the trigger.</p>
          </div>
        </div>
        <details>
          <summary>Native disclosure with CSS state</summary>
          <p>The open state is inspectable through `:open` and details-specific CSS.</p>
        </details>
        <div className="native-lab__carousel" tabIndex={0} aria-label="Native scroll snap carousel">
          {['dialog', 'popover', 'anchor()', 'scroll-snap'].map((item) => (
            <article className="native-lab__slide" key={item}>
              <p className="eyebrow">platform</p>
              <h3>{item}</h3>
              <p>Scroll or tab through the carousel to inspect snap behavior.</p>
            </article>
          ))}
        </div>
      </section>
    </DemoShell>
  )
}

export default NativeComponentsLab

