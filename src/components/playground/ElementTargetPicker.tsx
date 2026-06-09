import { useId, type KeyboardEvent } from 'react'
import type { FeatureTarget } from '../../data/features'

type ElementTargetPickerProps = {
  targets: FeatureTarget[]
  selectedId: string
  onSelect: (id: string) => void
  label?: string
}

function ElementTargetPicker({ targets, selectedId, onSelect, label = 'Inspect element' }: ElementTargetPickerProps) {
  const helpId = useId()

  if (targets.length === 0) return null

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return

    const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button'))
    if (buttons.length === 0) return

    event.preventDefault()

    const currentIndex = Math.max(
      0,
      buttons.findIndex((button) => button === document.activeElement),
    )
    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? buttons.length - 1
          : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
            ? (currentIndex - 1 + buttons.length) % buttons.length
            : (currentIndex + 1) % buttons.length

    const nextTarget = targets[nextIndex]
    buttons[nextIndex]?.focus()
    if (nextTarget) onSelect(nextTarget.id)
  }

  return (
    <div className="target-picker" role="group" aria-label={label} aria-describedby={helpId} onKeyDown={handleKeyDown}>
      <p className="visually-hidden" id={helpId}>
        Use arrow keys, Home, and End to move between inspectable targets.
      </p>
      {targets.map((target) => (
        <button
          type="button"
          key={target.id}
          aria-pressed={selectedId === target.id}
          aria-label={`Inspect ${target.label}`}
          onClick={() => onSelect(target.id)}
        >
          {target.label}
        </button>
      ))}
    </div>
  )
}

export default ElementTargetPicker
