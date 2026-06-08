import { useMemo } from 'react'
import type { FeatureSupportQuery } from '../../data/features'

type SupportQueryPanelProps = {
  queries: FeatureSupportQuery[]
}

type QueryResult = FeatureSupportQuery & {
  result: 'supported' | 'unsupported' | 'unknown'
}

function evaluateQuery(query: FeatureSupportQuery): QueryResult {
  if (!query.query || typeof CSS === 'undefined' || typeof CSS.supports !== 'function') {
    return { ...query, result: 'unknown' }
  }

  try {
    return { ...query, result: CSS.supports(query.query) ? 'supported' : 'unsupported' }
  } catch {
    return { ...query, result: 'unknown' }
  }
}

function SupportQueryPanel({ queries }: SupportQueryPanelProps) {
  const results = useMemo(() => queries.map(evaluateQuery), [queries])

  if (queries.length === 0) return null

  return (
    <div className="support-query-panel">
      <h4>Live support</h4>
      <ul>
        {results.map((query) => (
          <li key={query.id} data-result={query.result}>
            <span>{query.label}</span>
            <strong>
              {query.result === 'unknown'
                ? 'syntax preview'
                : query.result === 'supported'
                  ? 'supported'
                  : 'fallback'}
            </strong>
            <code>{query.query ?? query.syntax}</code>
            {query.note ? <small>{query.note}</small> : null}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SupportQueryPanel
