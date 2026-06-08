import type { FeatureControl } from '../../data/features'
import { getCssValue, type PlaygroundValues } from './playgroundUtils'

type DemoControlBarProps = {
  controls: FeatureControl[]
  values: PlaygroundValues
  onChange: (id: string, value: string) => void
  onReset?: () => void
}

function DemoControlBar({ controls, values, onChange, onReset }: DemoControlBarProps) {
  if (controls.length === 0) return null

  return (
    <form className="demo-control-bar" aria-label="Demo controls">
      <div className="demo-control-bar__grid">
        {controls.map((control) => {
          const value = values[control.id] ?? control.defaultValue

          if (control.type === 'select') {
            return (
              <label className="demo-control" key={control.id}>
                <span>{control.label}</span>
                <select value={value} onChange={(event) => onChange(control.id, event.target.value)}>
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
                  onChange={(event) => onChange(control.id, event.target.checked ? 'true' : 'false')}
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
                onChange={(event) => onChange(control.id, event.target.value)}
              />
            </label>
          )
        })}
      </div>
      {onReset ? (
        <button type="button" className="demo-control-bar__reset" onClick={onReset}>
          Reset
        </button>
      ) : null}
    </form>
  )
}

export default DemoControlBar
