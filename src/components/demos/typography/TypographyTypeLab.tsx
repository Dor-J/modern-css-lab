import type { FeatureControl, FeatureSnippetTemplate, FeatureTarget } from '../../../data/features'
import DemoShell from '../../ui/DemoShell'
import { getDemoFeature } from '../getDemoFeature'

const css = `
.type-lab {
  --measure: {{measure}};
  --leading: {{leading}};
  --hyphen-mode: {{hyphenMode}};
  --drop-size: {{dropSize}};
}

.type-lab__headline {
  max-inline-size: var(--measure);
  text-wrap: balance;
}

.type-lab__article {
  max-inline-size: var(--measure);
  line-height: var(--leading);
  text-wrap: pretty;
  hyphens: var(--hyphen-mode);
}

@supports (initial-letter: 2) {
  .type-lab__article::first-letter {
    initial-letter: var(--drop-size);
  }
}

@supports (inline-size: 1ic) {
  .type-lab__script-card {
    inline-size: min(100%, calc(28ic + 6rem));
  }
}
`

const controls = [
  {
    id: 'measure',
    label: 'Text measure',
    type: 'range',
    cssVar: '--measure',
    defaultValue: '42',
    min: 24,
    max: 72,
    step: 1,
    unit: 'ch',
  },
  {
    id: 'leading',
    label: 'Line height',
    type: 'range',
    cssVar: '--leading',
    defaultValue: '1.55',
    min: 1.1,
    max: 2,
    step: 0.05,
  },
  {
    id: 'hyphenMode',
    label: 'Hyphenation',
    type: 'select',
    cssVar: '--hyphen-mode',
    defaultValue: 'auto',
    options: [
      { label: 'Auto', value: 'auto' },
      { label: 'Manual', value: 'manual' },
      { label: 'None', value: 'none' },
    ],
  },
  {
    id: 'dropSize',
    label: 'Initial letter',
    type: 'range',
    cssVar: '--drop-size',
    defaultValue: '2',
    min: 1,
    max: 4,
    step: 1,
  },
] satisfies FeatureControl[]

const targets = [
  { id: 'headline', label: 'Balanced headline', selector: '.type-lab__headline' },
  { id: 'article', label: 'Pretty article text', selector: '.type-lab__article' },
  { id: 'script', label: 'IC unit card', selector: '.type-lab__script-card' },
] satisfies FeatureTarget[]

const snippets = [
  {
    id: 'typography-type-lab',
    title: 'Dynamic typography CSS',
    template: css,
  },
] satisfies FeatureSnippetTemplate[]

function TypographyTypeLab() {
  const feature = getDemoFeature('text-wrap-balance')

  return (
    <DemoShell
      feature={feature}
      title="Modern Typography Workbench"
      explanation="Edit the measure, leading, hyphenation, and initial-letter scale. The demo uses real text layout features instead of a decorative type sample."
      css={css}
      controls={controls}
      targets={targets}
      snippets={snippets}
      computedProperties={['max-inline-size', 'line-height', 'text-wrap', 'hyphens', 'initial-letter', 'inline-size']}
      fallback="Browsers without these newer text features keep readable line length, ordinary wrapping, and normal first-letter styling."
      why="Modern text CSS lets components handle real editorial layout problems without JavaScript measurement or brittle breakpoint-specific copy."
    >
      <article className="type-lab">
        <div className="type-lab__comparison">
          <section>
            <p className="eyebrow">balanced headline</p>
            <h3 className="type-lab__headline">Readable interface copy should wrap with intent, not accident</h3>
          </section>
          <section>
            <p className="eyebrow">pretty article flow</p>
            <p className="type-lab__article" lang="en">
              Sophisticated CSS typography now handles balanced headlines, prettier paragraphs, vertical rhythm,
              and hyphenation inside the browser. Try narrowing the measure until long words and final lines need
              smarter wrapping behavior.
            </p>
          </section>
        </div>
        <aside className="type-lab__script-card" lang="ja">
          <p className="eyebrow">ic unit sizing</p>
          <p>日本語 UI labels and Latin interface text can share a component rhythm without guessing a fixed width.</p>
        </aside>
      </article>
    </DemoShell>
  )
}

export default TypographyTypeLab

