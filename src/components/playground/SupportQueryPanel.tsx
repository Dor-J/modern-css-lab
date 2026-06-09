import { useId, useMemo } from 'react'
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
  const headingId = useId()
  const results = useMemo(() => queries.map(evaluateQuery), [queries])

  if (queries.length === 0) return null

  return (
    <div className="support-query-panel" aria-labelledby={headingId}>
      <h4 id={headingId}>Live support</h4>
      <p className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
        Support checks loaded. {results.filter((query) => query.result === 'supported').length} supported,
        {` ${results.filter((query) => query.result === 'unsupported').length}`} fallback, and
        {` ${results.filter((query) => query.result === 'unknown').length}`} syntax preview.
      </p>
      <ul aria-label="Browser support checks">
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
