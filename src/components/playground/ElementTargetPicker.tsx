import type { FeatureTarget } from '../../data/features'

type ElementTargetPickerProps = {
  targets: FeatureTarget[]
  selectedId: string
  onSelect: (id: string) => void
}

function ElementTargetPicker({ targets, selectedId, onSelect }: ElementTargetPickerProps) {
  if (targets.length === 0) return null

  return (
    <div className="target-picker" role="group" aria-label="Inspect element">
      {targets.map((target) => (
        <button
          type="button"
          key={target.id}
          aria-pressed={selectedId === target.id}
          onClick={() => onSelect(target.id)}
        >
          {target.label}
        </button>
      ))}
    </div>
  )
}

export default ElementTargetPicker
