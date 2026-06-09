import { useId, useState } from 'react'
import type { FeatureControl } from '../../data/features'
import LiveRegion from '../ui/LiveRegion'
import { getCssValue, type PlaygroundValues } from './playgroundUtils'

type DemoControlBarProps = {
  controls: FeatureControl[]
  values: PlaygroundValues
  onChange: (id: string, value: string) => void
  onReset?: () => void
}

function DemoControlBar({ controls, values, onChange, onReset }: DemoControlBarProps) {
  const [announcement, setAnnouncement] = useState('')
  const helpId = useId()

  if (controls.length === 0) return null

  return (
    <form className="demo-control-bar" aria-label="Demo controls" onSubmit={(event) => event.preventDefault()}>
      <p className="visually-hidden" id={helpId}>
        Demo controls update CSS custom properties, live snippets, and the computed-style inspector.
      </p>
      <div className="demo-control-bar__grid">
        {controls.map((control) => {
          const value = values[control.id] ?? control.defaultValue
          const announceChange = (nextValue: string) => {
            const cssValue = getCssValue(control, nextValue)
            onChange(control.id, nextValue)
            setAnnouncement(`${control.label} changed to ${cssValue}. Demo, snippets, and inspector updated.`)
          }

          if (control.type === 'select') {
            return (
              <label className="demo-control" key={control.id}>
                <span>{control.label}</span>
                <select
                  value={value}
                  aria-describedby={helpId}
                  onChange={(event) => announceChange(event.target.value)}
                >
                  {control.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            )
          }

          if (control.type === 'checkbox') {
            return (
              <label className="demo-control demo-control--checkbox" key={control.id}>
                <input
                  type="checkbox"
                  checked={value === 'true'}
                  aria-describedby={helpId}
                  onChange={(event) => announceChange(event.target.checked ? 'true' : 'false')}
                />
                <span>{control.label}</span>
              </label>
            )
          }

          return (
            <label className="demo-control" key={control.id}>
              <span>
                {control.label}
                <output>{getCssValue(control, value)}</output>
              </span>
              <input
                type={control.type}
                value={value}
                min={control.min}
                max={control.max}
                step={control.step}
                aria-describedby={helpId}
                onChange={(event) => announceChange(event.target.value)}
              />
            </label>
          )
        })}
      </div>
      {onReset ? (
        <button
          type="button"
          className="demo-control-bar__reset"
          onClick={() => {
            onReset()
            setAnnouncement('Demo controls reset. Demo, snippets, and inspector updated.')
          }}
        >
          Reset
        </button>
      ) : null}
      <LiveRegion message={announcement} />
    </form>
  )
}

export default DemoControlBar
