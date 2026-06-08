import type { FeatureControl, FeatureSnippetTemplate, FeatureTarget } from '../../../data/features'
import DemoShell from '../../ui/DemoShell'
import { getDemoFeature } from '../getDemoFeature'

const css = `
.has-card {
  border: 1px solid var(--border-subtle);
  --focus-ring-size: {{focusRing}};
}

.has-card:has(:focus-visible) {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 var(--focus-ring-size) var(--accent-soft);
}

.has-card:has(input:not(:placeholder-shown):invalid) {
  border-color: var(--danger);
}

.has-card:has(input[value='pro']:checked) {
  background: linear-gradient(135deg, var(--surface-1), var(--accent-soft));
}
`

const controls = [
  {
    id: 'focusRing',
    label: 'Focus ring',
    type: 'range',
    cssVar: '--focus-ring-size',
    defaultValue: '4',
    min: 0,
    max: 10,
    step: 1,
    unit: 'px',
  },
] satisfies FeatureControl[]

const targets = [
  { id: 'card', label: 'Form card', selector: '.has-card' },
  { id: 'email', label: 'Email input', selector: '.has-card input[type="email"]' },
  { id: 'status', label: 'Status line', selector: '.has-card__status' },
] satisfies FeatureTarget[]

const snippets = [
  {
    id: 'has-form-card',
    title: 'Dynamic :has() CSS',
    template: css,
  },
] satisfies FeatureSnippetTemplate[]

function HasFormCardDemo() {
  const feature = getDemoFeature('has')

  return (
    <DemoShell
      feature={feature}
      title=":has() Form and Card State"
      explanation="The parent card reacts to descendant form state without React state: focus, invalid input, checked radio, and selected options are all styled by selectors."
      css={css}
      controls={controls}
      targets={targets}
      snippets={snippets}
      computedProperties={['border-color', 'box-shadow', 'background-color', 'background-image', 'color']}
      fallback="Browsers without :has() keep normal input validation and focus outlines. The form remains fully usable because the styling is progressive."
    >
      <form className="has-card">
        <div className="has-card__header">
          <p className="eyebrow">CSS state</p>
          <h3>Configure a lab card</h3>
        </div>
        <label>
          Work email
          <input type="email" placeholder="you@example.com" required />
        </label>
        <fieldset>
          <legend>Plan</legend>
          <label>
            <input type="radio" name="plan" value="free" defaultChecked /> Free
          </label>
          <label>
            <input type="radio" name="plan" value="pro" /> Pro
          </label>
        </fieldset>
        <label>
          Demo density
          <select defaultValue="balanced">
            <option value="compact">Compact</option>
            <option value="balanced">Balanced</option>
            <option value="agency">Agency review</option>
          </select>
        </label>
        <p className="has-card__status">The card border, surface, and status line are CSS-only state responses.</p>
      </form>
    </DemoShell>
  )
}

export default HasFormCardDemo
