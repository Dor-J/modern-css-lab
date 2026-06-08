import type { FeatureControl, FeatureSnippetTemplate } from '../../data/features'
import CodeBlock from '../ui/CodeBlock'
import { renderSnippet, type PlaygroundValues } from './playgroundUtils'

type LiveSnippetProps = {
  snippets: FeatureSnippetTemplate[]
  controls: FeatureControl[]
  values: PlaygroundValues
}

function LiveSnippet({ snippets, controls, values }: LiveSnippetProps) {
  if (snippets.length === 0) return null

  return (
    <div className="live-snippet">
      {snippets.map((snippet) => (
        <CodeBlock
          key={snippet.id}
          title={snippet.title}
          language={snippet.language ?? 'css'}
          code={renderSnippet(snippet, controls, values)}
        />
      ))}
    </div>
  )
}

export default LiveSnippet
