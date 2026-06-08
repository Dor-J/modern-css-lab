import { useEffect } from 'react'

type KeyboardBinding = {
  key: string
  selector: string
}

type KeyboardControlBridgeProps = {
  rootId: string
  bindings: KeyboardBinding[]
}

function KeyboardControlBridge({ rootId, bindings }: KeyboardControlBridgeProps) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const binding = bindings.find((candidate) => candidate.key.toLowerCase() === event.key.toLowerCase())

      if (!binding) {
        return
      }

      const root = document.getElementById(rootId)
      const targets = Array.from(root?.querySelectorAll<HTMLElement>(binding.selector) ?? [])
      const target = targets.find((candidate) => candidate.getClientRects().length > 0) ?? targets[0]

      if (!target) {
        return
      }

      event.preventDefault()
      target.click()
      target.focus({ preventScroll: true })
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [bindings, rootId])

  return null
}

export default KeyboardControlBridge
