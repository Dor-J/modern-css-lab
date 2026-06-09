import { useEffect, useState } from 'react'
import LiveRegion from './LiveRegion'

type CopyButtonProps = {
  value: string
  label?: string
}

async function writeClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', 'true')
  textarea.style.position = 'fixed'
  textarea.style.insetBlockStart = '-100vh'
  document.body.append(textarea)
  textarea.select()

  const copied = document.execCommand('copy')
  textarea.remove()

  if (!copied) {
    throw new Error('Clipboard write failed')
  }
}

function CopyButton({ value, label = 'Copy snippet' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = window.setTimeout(() => setCopied(false), 1400)
    return () => window.clearTimeout(timeout)
  }, [copied])

  useEffect(() => {
    if (!error) return
    const timeout = window.setTimeout(() => setError(false), 1800)
    return () => window.clearTimeout(timeout)
  }, [error])

  return (
    <>
      <button
        type="button"
        className="copy-button"
        aria-label={label}
        onClick={async () => {
          try {
            await writeClipboard(value)
            setError(false)
            setCopied(true)
          } catch {
            setCopied(false)
            setError(true)
          }
        }}
      >
        {error ? 'Copy failed' : copied ? 'Copied' : 'Copy'}
      </button>
      <LiveRegion message={error ? 'Copy failed.' : copied ? 'Snippet copied to clipboard.' : ''} />
    </>
  )
}

export default CopyButton
