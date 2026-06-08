import type { CSSProperties } from 'react'
import type { FeatureControl, FeatureSnippetTemplate, FeatureTarget } from '../../../data/features'
import DemoShell from '../../ui/DemoShell'
import { getDemoFeature } from '../getDemoFeature'

const css = `
.circle-menu {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

@supports (top: calc(sin(1deg) * 1px)) {
  .circle-menu {
    --orbit-scale: {{orbitScale}};
    --angle-offset: {{angleOffset}};
    --radius: min(calc(32cqi * var(--orbit-scale)), 10rem);
    container-type: inline-size;
    position: relative;
    display: block;
    aspect-ratio: 1;
  }

  .circle-menu__item {
    --angle: calc((360deg / 6) * var(--index) + var(--angle-offset));
    position: absolute;
    inset-block-start: 50%;
    inset-inline-start: 50%;
    transform: translate(-50%, -50%)
      translate(calc(cos(var(--angle)) * var(--radius)), calc(sin(var(--angle)) * var(--radius)));
  }
}
`

const controls = [
  {
    id: 'orbitScale',
    label: 'Orbit scale',
    type: 'range',
    cssVar: '--orbit-scale',
    defaultValue: '1',
    min: 0.65,
    max: 1.15,
    step: 0.01,
  },
  {
    id: 'angleOffset',
    label: 'Angle offset',
    type: 'range',
    cssVar: '--angle-offset',
    defaultValue: '-90',
    min: -180,
    max: 180,
    step: 5,
    unit: 'deg',
  },
] satisfies FeatureControl[]

const targets = [
  { id: 'menu', label: 'Menu container', selector: '.circle-menu' },
  { id: 'center', label: 'Center node', selector: '.circle-menu__center' },
  { id: 'item', label: 'Menu item', selector: '.circle-menu__item' },
] satisfies FeatureTarget[]

const snippets = [
  {
    id: 'css-math-circular-menu',
    title: 'Dynamic trig layout CSS',
    template: css,
  },
] satisfies FeatureSnippetTemplate[]

function CssMathCircularMenu() {
  const feature = getDemoFeature('sin')
  const items = ['Size', 'Color', 'Scope', 'Motion', 'State', 'Layer']

  return (
    <DemoShell
      feature={feature}
      title="CSS Math Circular Menu"
      explanation="CSS trigonometric functions place menu buttons around a circle. Unsupported browsers get the ordinary grid menu first."
      css={css}
      controls={controls}
      targets={targets}
      snippets={snippets}
      computedProperties={['container-type', 'position', 'transform', 'inset-block-start', 'inset-inline-start']}
      fallback="The base layout is a two-column grid. The circular placement only applies inside @supports for trigonometric math."
    >
      <nav className="circle-menu" aria-label="CSS feature orbit menu">
        <span className="circle-menu__center" aria-hidden="true">
          CSS
        </span>
        {items.map((item, index) => (
          <button
            className="circle-menu__item"
            style={{ '--index': index } as CSSProperties}
            type="button"
            key={item}
          >
            {item}
          </button>
        ))}
      </nav>
    </DemoShell>
  )
}

export default CssMathCircularMenu
