import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { FeatureControl } from '../../data/features'
import { getDefaultValues, normalizeControlValue, type PlaygroundValues } from './playgroundUtils'

export function usePlaygroundState(slug: string, controls: FeatureControl[]) {
  const [searchParams, setSearchParams] = useSearchParams()
  const defaults = useMemo(() => getDefaultValues(controls), [controls])

  const values = useMemo<PlaygroundValues>(() => {
    const urlTargetsThisDemo = searchParams.get('demo') === slug

    return Object.fromEntries(
      controls.map((control) => [
        control.id,
        normalizeControlValue(control, urlTargetsThisDemo ? searchParams.get(control.id) : defaults[control.id]),
      ]),
    )
  }, [controls, defaults, searchParams, slug])

  const setValue = (id: string, value: string) => {
    const control = controls.find((candidate) => candidate.id === id)
    if (!control) return

    const next = new URLSearchParams(searchParams)
    next.set('demo', slug)
    next.set(id, normalizeControlValue(control, value))
    setSearchParams(next, { replace: true })
  }

  const resetValues = () => {
    const next = new URLSearchParams(searchParams)
    next.set('demo', slug)
    controls.forEach((control) => next.delete(control.id))
    setSearchParams(next, { replace: true })
  }

  return { values, setValue, resetValues }
}
