import { useId, type RefObject } from 'react'
import type { FeatureControl, FeatureSupportQuery, FeatureTarget } from '../../data/features'
import ComputedStyleTable from './ComputedStyleTable'
import ElementTargetPicker from './ElementTargetPicker'
import SupportQueryPanel from './SupportQueryPanel'
import LiveRegion from '../ui/LiveRegion'

type InspectorPanelProps = {
  rootRef: RefObject<HTMLElement | null>
  targets: FeatureTarget[]
  selectedTargetId: string
  onSelectTarget: (id: string) => void
  controls: FeatureControl[]
  computedProperties: string[]
  supportQueries: FeatureSupportQuery[]
  refreshKey: number
}

function InspectorPanel({
  rootRef,
  targets,
  selectedTargetId,
  onSelectTarget,
  controls,
  computedProperties,
  supportQueries,
  refreshKey,
}: InspectorPanelProps) {
  const descriptionId = useId()
  const selectedTarget = targets.find((target) => target.id === selectedTargetId) ?? targets[0]
  const customProperties = controls.flatMap((control) => (control.cssVar ? [control.cssVar] : []))

  if (!selectedTarget) return null

  return (
    <aside
      className="inspector-panel"
      aria-label="Devtools style CSS inspector"
      aria-describedby={descriptionId}
    >
      <div className="inspector-panel__header">
        <p className="eyebrow">Inspector</p>
        <h3>{selectedTarget.label}</h3>
        <code>{selectedTarget.selector}</code>
        <p id={descriptionId}>
          Computed styles, custom properties, and live support checks update when demo controls or inspected
          targets change.
        </p>
      </div>
      <ElementTargetPicker targets={targets} selectedId={selectedTarget.id} onSelect={onSelectTarget} />
      <LiveRegion message={`Inspecting ${selectedTarget.label}.`} />
      <ComputedStyleTable
        rootRef={rootRef}
        selector={selectedTarget.selector}
        properties={computedProperties}
        customProperties={customProperties}
        refreshKey={refreshKey}
      />
      <SupportQueryPanel queries={supportQueries} />
    </aside>
  )
}

export default InspectorPanel
