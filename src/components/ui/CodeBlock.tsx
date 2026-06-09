import CopyButton from './CopyButton'

type CodeBlockProps = {
  code: string
  language?: string
  title?: string
}

function CodeBlock({ code, language = 'css', title }: CodeBlockProps) {
  const trimmed = code.trim()
  const label = title ?? `${language} snippet`

  return (
    <figure className="code-block">
      <figcaption>
        <span>{label}</span>
        <CopyButton value={trimmed} label={`Copy ${label}`} />
      </figcaption>
      <pre tabIndex={0} aria-label={`${label} code`}>
        <code>{trimmed}</code>
      </pre>
    </figure>
  )
}

export default CodeBlock
