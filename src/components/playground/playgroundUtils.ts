import type { CSSProperties } from 'react'
import type { FeatureControl, FeatureSnippetTemplate } from '../../data/features'

export type PlaygroundValues = Record<string, string>

export function getDefaultValues(controls: FeatureControl[]): PlaygroundValues {
  return Object.fromEntries(controls.map((control) => [control.id, control.defaultValue]))
}

export function normalizeControlValue(control: FeatureControl, value: string | null): string {
  if (value == null || value === '') return control.defaultValue

  if (control.type === 'select') {
    return control.options?.some((option) => option.value === value) ? value : control.defaultValue
  }

  if (control.type === 'checkbox') {
    return value === 'true' || value === control.trueValue ? 'true' : 'false'
  }

  if (control.type === 'range') {
    const parsed = Number(value)
    if (!Number.isFinite(parsed)) return control.defaultValue

    const min = control.min ?? parsed
    const max = control.max ?? parsed
    const step = control.step ?? 1
    const clamped = Math.min(max, Math.max(min, parsed))
    const rounded = Math.round(clamped / step) * step

    return String(Number(rounded.toFixed(4)))
  }

  return value
}

export function getCssValue(control: FeatureControl, value: string): string {
  if (control.type === 'checkbox') {
    return value === 'true'
      ? (control.trueValue ?? '1')
      : (control.falseValue ?? '0')
  }

  if (control.type === 'range') {
    return `${value}${control.unit ?? ''}`
  }

  return value
}

export function getCssVarStyle(controls: FeatureControl[], values: PlaygroundValues): CSSProperties {
  return controls.reduce<CSSProperties>((style, control) => {
    if (!control.cssVar) return style

    return {
      ...style,
      [control.cssVar]: getCssValue(control, values[control.id] ?? control.defaultValue),
    }
  }, {})
}

export function renderSnippetTemplate(template: string, controls: FeatureControl[], values: PlaygroundValues) {
  return controls.reduce((snippet, control) => {
    const value = getCssValue(control, values[control.id] ?? control.defaultValue)
    return snippet.replaceAll(`{{${control.id}}}`, value)
  }, template).trim()
}

export function renderSnippet(template: FeatureSnippetTemplate, controls: FeatureControl[], values: PlaygroundValues) {
  return renderSnippetTemplate(template.template, controls, values)
}
