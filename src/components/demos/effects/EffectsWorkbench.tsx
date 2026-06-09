import type { FeatureControl, FeatureSnippetTemplate, FeatureTarget } from '../../../data/features'
import DemoShell from '../../ui/DemoShell'
import { getDemoFeature } from '../getDemoFeature'

const css = `
.effects-lab {
  --glass-blur: {{glassBlur}};
  --clip-inset: {{clipInset}};
  --mask-stop: {{maskStop}};
  --blend-mode: {{blendMode}};
}

.effects-lab__glass {
  background: rgb(255 255 255 / 0.12);
  backdrop-filter: blur(var(--glass-blur)) saturate(150%);
}

.effects-lab__blob {
  clip-path: inset(var(--clip-inset) round 2rem 0.8rem 2rem 0.8rem);
  mix-blend-mode: var(--blend-mode);
  isolation: isolate;
}

.effects-lab__mask {
  mask-image: linear-gradient(90deg, black var(--mask-stop), transparent);
}
`

const controls = [
  {
    id: 'glassBlur',
    label: 'Glass blur',
    type: 'range',
    cssVar: '--glass-blur',
    defaultValue: '18',
    min: 0,
    max: 32,
    step: 1,
    unit: 'px',
  },
  {
    id: 'clipInset',
    label: 'Clip inset',
    type: 'range',
    cssVar: '--clip-inset',
    defaultValue: '7',
    min: 0,
    max: 24,
    step: 1,
    unit: '%',
  },
  {
    id: 'maskStop',
    label: 'Mask stop',
    type: 'range',
    cssVar: '--mask-stop',
    defaultValue: '68',
    min: 30,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    id: 'blendMode',
    label: 'Blend mode',
    type: 'select',
    cssVar: '--blend-mode',
    defaultValue: 'screen',
    options: [
      { label: 'Screen', value: 'screen' },
      { label: 'Multiply', value: 'multiply' },
      { label: 'Overlay', value: 'overlay' },
      { label: 'Normal', value: 'normal' },
    ],
  },
] satisfies FeatureControl[]

const targets = [
  { id: 'glass', label: 'Backdrop glass', selector: '.effects-lab__glass' },
  { id: 'blob', label: 'Clipped blend blob', selector: '.effects-lab__blob' },
  { id: 'mask', label: 'Masked strip', selector: '.effects-lab__mask' },
  { id: 'pixel', label: 'Pixel preview', selector: '.effects-lab__pixel' },
] satisfies FeatureTarget[]

const snippets = [
  {
    id: 'effects-workbench',
    title: 'Dynamic visual effects CSS',
    template: css,
  },
] satisfies FeatureSnippetTemplate[]

function EffectsWorkbench() {
  const feature = getDemoFeature('backdrop-filter')

  return (
    <DemoShell
      feature={feature}
      title="Visual Effects Workbench"
      explanation="A real effects stage with glass, blend isolation, clipping, masking, scrollbar styling, and pixel rendering instead of a static decorative sample."
      css={css}
      controls={controls}
      targets={targets}
      snippets={snippets}
      computedProperties={['backdrop-filter', 'clip-path', 'mix-blend-mode', 'isolation', 'mask-image', 'image-rendering']}
      fallback="Solid translucent surfaces, normal blend mode, and rectangular shapes are declared first; enhanced effects are layered where supported."
      why="Modern visual CSS can carry sophisticated art direction directly in components while still preserving a readable fallback."
    >
      <section className="effects-lab">
        <div className="effects-lab__scene">
          <div className="effects-lab__orb effects-lab__orb--one" aria-hidden="true" />
          <div className="effects-lab__orb effects-lab__orb--two" aria-hidden="true" />
          <article className="effects-lab__glass">
            <p className="eyebrow">backdrop-filter</p>
            <h3>Glass over live background</h3>
            <p>The background remains visible while the panel controls blur and saturation.</p>
          </article>
          <div className="effects-lab__blob" aria-hidden="true" />
        </div>
        <div className="effects-lab__details">
          <div className="effects-lab__mask">
            <span>mask-image gradient reveal</span>
          </div>
          <div className="effects-lab__pixel" aria-label="Pixel rendering comparison">
            {Array.from({ length: 16 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
        </div>
      </section>
    </DemoShell>
  )
}

export default EffectsWorkbench

