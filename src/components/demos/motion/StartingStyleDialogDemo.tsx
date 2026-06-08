import { useRef } from 'react'
import type { FeatureControl, FeatureSnippetTemplate, FeatureTarget } from '../../../data/features'
import DemoShell from '../../ui/DemoShell'
import { getDemoFeature } from '../getDemoFeature'

const css = `
.motion-dialog {
  opacity: 0;
  --dialog-duration: {{duration}};
  --dialog-distance: {{distance}};
  transform: translateY(var(--dialog-distance)) scale(0.96);
  transition:
    opacity var(--dialog-duration) ease,
    transform var(--dialog-duration) ease,
    overlay var(--dialog-duration) ease allow-discrete,
    display var(--dialog-duration) ease allow-discrete;
}

.motion-dialog:open {
  opacity: 1;
  transform: translateY(0) scale(1);
}

@starting-style {
  .motion-dialog:open {
    opacity: 0;
    transform: translateY(var(--dialog-distance)) scale(0.96);
  }
}
`

const controls = [
  {
    id: 'duration',
    label: 'Duration',
    type: 'range',
    cssVar: '--dialog-duration',
    defaultValue: '180',
    min: 80,
    max: 600,
    step: 10,
    unit: 'ms',
  },
  {
    id: 'distance',
    label: 'Distance',
    type: 'range',
    cssVar: '--dialog-distance',
    defaultValue: '1',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'rem',
  },
] satisfies FeatureControl[]

const targets = [
  { id: 'trigger', label: 'Open button', selector: '.dialog-demo > button' },
  { id: 'dialog', label: 'Dialog', selector: '.motion-dialog' },
  { id: 'confirm', label: 'Confirm action', selector: '.motion-dialog button[value="confirm"]' },
] satisfies FeatureTarget[]

const snippets = [
  {
    id: 'starting-style-dialog',
    title: 'Dynamic top-layer transition CSS',
    template: css,
  },
] satisfies FeatureSnippetTemplate[]

function StartingStyleDialogDemo() {
  const feature = getDemoFeature('starting-style')
  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <DemoShell
      feature={feature}
      title="@starting-style Dialog Transition"
      explanation="The native dialog enters the top layer and CSS defines its starting frame. React only opens the platform dialog; CSS owns the transition."
      css={css}
      controls={controls}
      targets={targets}
      snippets={snippets}
      computedProperties={['display', 'opacity', 'transform', 'transition-duration', 'transition-behavior', 'overlay']}
      fallback="Without @starting-style or discrete transitions, the dialog still opens as a native modal. Reduced-motion users receive instant transitions."
    >
      <div className="dialog-demo">
        <button type="button" onClick={() => dialogRef.current?.showModal()}>
          Open native dialog
        </button>
        <dialog className="motion-dialog" ref={dialogRef} aria-labelledby="motion-dialog-title">
          <form method="dialog">
            <p className="eyebrow">Top layer</p>
            <h3 id="motion-dialog-title">Discrete transition demo</h3>
            <p>
              The dialog uses native focus management, a backdrop, @starting-style, and transition-behavior for
              top-layer entrance polish.
            </p>
            <menu>
              <button value="cancel">Close</button>
              <button value="confirm">Confirm</button>
            </menu>
          </form>
        </dialog>
      </div>
    </DemoShell>
  )
}

export default StartingStyleDialogDemo
