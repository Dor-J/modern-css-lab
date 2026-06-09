import type { FeatureControl, FeatureSnippetTemplate, FeatureTarget } from '../../../data/features'
import DemoShell from '../../ui/DemoShell'
import { getDemoFeature } from '../getDemoFeature'

const css = `
.light-dark-demo__card {
  color-scheme: {{scheme}};
  color: #142033;
  background: #ffffff;
}

.light-dark-demo__card--local {
  color-scheme: {{scheme}};
}

.light-dark-demo__card--light {
  color-scheme: light;
}

.light-dark-demo__card--dark {
  color-scheme: dark;
}

@supports (color: light-dark(black, white)) {
  .light-dark-demo__card {
    color: light-dark(#142033, #edf6ff);
    background: light-dark(#ffffff, #101827);
    border-color: light-dark(#d8e2ef, #314156);
  }
}

:root[data-theme='dark'] .light-dark-demo__card {
  color-scheme: dark;
}
`

const controls = [
  {
    id: 'scheme',
    label: 'Color scheme',
    type: 'select',
    cssVar: '--demo-color-scheme',
    defaultValue: 'light dark',
    options: [
      { label: 'Auto', value: 'light dark' },
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
    ],
  },
] satisfies FeatureControl[]

const targets = [
  { id: 'local', label: 'Live local card', selector: '.light-dark-demo__card--local' },
  { id: 'light', label: 'Forced light card', selector: '.light-dark-demo__card--light' },
  { id: 'dark', label: 'Forced dark card', selector: '.light-dark-demo__card--dark' },
  { id: 'range', label: 'Range control', selector: '.light-dark-demo input[type="range"]' },
] satisfies FeatureTarget[]

const snippets = [
  {
    id: 'light-dark-theme',
    title: 'Dynamic light-dark CSS',
    template: css,
  },
] satisfies FeatureSnippetTemplate[]

function LightDarkThemeDemo() {
  const feature = getDemoFeature('light-dark')

  return (
    <DemoShell
      feature={feature}
      title="light-dark() Theme Tokens"
      explanation="The demo uses color-scheme and light-dark() so tokens follow the active color scheme. The app header can also force a light or dark data-theme."
      css={css}
      controls={controls}
      targets={targets}
      snippets={snippets}
      computedProperties={['color-scheme', 'color', 'background-color', 'border-color', 'accent-color']}
      fallback="Light and dark static values are defined by theme selectors first; light-dark() simplifies the automatic path where supported."
    >
      <div className="light-dark-demo">
        <article className="light-dark-demo__card light-dark-demo__card--local">
          <p className="eyebrow">local control</p>
          <h3>Surface follows this demo's color-scheme</h3>
          <p>The control above writes the component boundary. Native inputs inherit the same scheme.</p>
          <label>
            <input type="checkbox" defaultChecked /> Accent-aware checkbox
          </label>
        </article>
        <article className="light-dark-demo__card light-dark-demo__card--light">
          <p className="eyebrow">forced light</p>
          <h3>Light component boundary</h3>
          <p>This card stays light even when the application shell is dark.</p>
          <input type="range" defaultValue={45} aria-label="Light scheme range" />
        </article>
        <article className="light-dark-demo__card light-dark-demo__card--dark">
          <p className="eyebrow">forced dark</p>
          <h3>Dark component boundary</h3>
          <p>This card stays dark and proves `light-dark()` responds to the nearest scheme.</p>
          <input type="range" defaultValue={70} aria-label="Accent-aware range" />
        </article>
      </div>
    </DemoShell>
  )
}

export default LightDarkThemeDemo
