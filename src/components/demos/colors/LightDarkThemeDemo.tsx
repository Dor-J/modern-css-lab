import type { FeatureControl, FeatureSnippetTemplate, FeatureTarget } from '../../../data/features'
import DemoShell from '../../ui/DemoShell'
import { getDemoFeature } from '../getDemoFeature'

const css = `
.light-dark-demo__card {
  color-scheme: {{scheme}};
  color: #142033;
  background: #ffffff;
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
  { id: 'auto', label: 'Auto card', selector: '.light-dark-demo__card' },
  { id: 'forced', label: 'Forced card', selector: '.light-dark-demo__card--forced' },
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
        <article className="light-dark-demo__card">
          <p className="eyebrow">Automatic token</p>
          <h3>Surface follows color-scheme</h3>
          <p>Try the theme switcher in the header. Native form controls also inherit the intended scheme.</p>
          <label>
            <input type="checkbox" defaultChecked /> Accent-aware checkbox
          </label>
        </article>
        <article className="light-dark-demo__card light-dark-demo__card--forced">
          <p className="eyebrow">Forced component scheme</p>
          <h3>Component-level color-scheme</h3>
          <p>This panel demonstrates that scheme can be set at a component boundary.</p>
          <input type="range" defaultValue={70} aria-label="Accent-aware range" />
        </article>
      </div>
    </DemoShell>
  )
}

export default LightDarkThemeDemo
