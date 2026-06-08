import { useEffect, useState } from 'react'

type CopyButtonProps = {
  value: string
}

function CopyButton({ value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = window.setTimeout(() => setCopied(false), 1400)
    return () => window.clearTimeout(timeout)
  }, [copied])

  return (
    <button
      type="button"
      className="copy-button"
      onClick={async () => {
        await navigator.clipboard?.writeText(value)
        setCopied(true)
      }}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

export default CopyButton
