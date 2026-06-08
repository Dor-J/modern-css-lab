import CopyButton from './CopyButton'

type CodeBlockProps = {
  code: string
  language?: string
  title?: string
}

function CodeBlock({ code, language = 'css', title }: CodeBlockProps) {
  const trimmed = code.trim()

  return (
    <figure className="code-block">
      <figcaption>
        <span>{title ?? language}</span>
        <CopyButton value={trimmed} />
      </figcaption>
      <pre>
        <code>{trimmed}</code>
      </pre>
    </figure>
  )
}

export default CodeBlock
