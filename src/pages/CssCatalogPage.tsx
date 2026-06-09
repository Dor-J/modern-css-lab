import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CssCatalogCard from '../components/cssCatalog/CssCatalogCard'
import {
  cssCatalogCategories,
  cssCatalogKinds,
  cssCatalogManifest,
  loadAllCssCatalogEntries,
  type CssCatalogCategory,
  type CssCatalogEntry,
  type CssCatalogKind,
  type CssCatalogStatus,
} from '../data/cssCatalog'

const statuses: CssCatalogStatus[] = ['standard', 'experimental', 'deprecated']

type CatalogLoadState =
  | { status: 'loading' }
  | { status: 'loaded'; entries: CssCatalogEntry[] }
  | { status: 'error'; message: string }

function CssCatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [catalogState, setCatalogState] = useState<CatalogLoadState>({ status: 'loading' })
  const query = searchParams.get('q') ?? ''
  const kind = searchParams.get('kind') ?? 'all'
  const category = searchParams.get('category') ?? 'all'
  const status = searchParams.get('status') ?? 'all'

  useEffect(() => {
    let cancelled = false

    loadAllCssCatalogEntries()
      .then((loadedEntries) => {
        if (cancelled) return
        setCatalogState({ status: 'loaded', entries: loadedEntries })
      })
      .catch(() => {
        if (cancelled) return
        setCatalogState({ status: 'error', message: 'The CSS catalog data could not be loaded.' })
      })

    return () => {
      cancelled = true
    }
  }, [])

  const isLoading = catalogState.status === 'loading'
  const loadError = catalogState.status === 'error' ? catalogState.message : ''

  const filteredEntries = useMemo(
    () => {
      const entries = catalogState.status === 'loaded' ? catalogState.entries : []

      return entries.filter((entry) => {
        const matchesQuery =
          query.trim().length === 0 ||
          `${entry.title} ${entry.syntax} ${entry.summary} ${entry.tags.join(' ')}`
            .toLowerCase()
            .includes(query.toLowerCase())
        const matchesKind = kind === 'all' || entry.kind === kind
        const matchesCategory = category === 'all' || entry.category === category
        const matchesStatus = status === 'all' || entry.status === status

        return matchesQuery && matchesKind && matchesCategory && matchesStatus
      })
    },
    [catalogState, category, kind, query, status],
  )

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value === 'all' || value === '') {
      next.delete(key)
    } else {
      next.set(key, value)
    }
    setSearchParams(next, { replace: true })
  }

  return (
    <div className="page-stack">
      <section className="css-catalog-hero">
        <p className="eyebrow">Complete reference snapshot</p>
        <h1>All CSS</h1>
        <p>
          {cssCatalogManifest.totalEntries} MDN standard CSS reference entries with routes, dynamic snippets, and
          dev-console playgrounds.
        </p>
        <div className="catalog-metrics" aria-label="Catalog coverage">
          {Object.entries(cssCatalogManifest.countsByKind).map(([metricKind, count]) => (
            <span key={metricKind}>
              <strong>{count}</strong>
              {metricKind}
            </span>
          ))}
        </div>
      </section>

      <section className="css-catalog-controls section-block" aria-label="Catalog filters">
        <label>
          Search
          <input
            type="search"
            value={query}
            placeholder="Search property, selector, function..."
            onChange={(event) => updateParam('q', event.target.value)}
          />
        </label>
        <label>
          Kind
          <select value={kind} onChange={(event) => updateParam('kind', event.target.value)}>
            <option value="all">All kinds</option>
            {cssCatalogKinds.map((catalogKind: CssCatalogKind) => (
              <option key={catalogKind} value={catalogKind}>
                {catalogKind}
              </option>
            ))}
          </select>
        </label>
        <label>
          Category
          <select value={category} onChange={(event) => updateParam('category', event.target.value)}>
            <option value="all">All categories</option>
            {cssCatalogCategories.map((catalogCategory: CssCatalogCategory) => (
              <option key={catalogCategory} value={catalogCategory}>
                {catalogCategory}
              </option>
            ))}
          </select>
        </label>
        <label>
          Status
          <select value={status} onChange={(event) => updateParam('status', event.target.value)}>
            <option value="all">All statuses</option>
            {statuses.map((catalogStatus) => (
              <option key={catalogStatus} value={catalogStatus}>
                {catalogStatus}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Results</p>
            <h2>{isLoading ? 'Loading entries' : `${filteredEntries.length} entries`}</h2>
          </div>
          <p>
            Catalog data is loaded in kind-based chunks only when this route is visited. Each result links to a
            dedicated route with its own scoped demo spec.
          </p>
        </div>
        {loadError ? <p role="alert">{loadError}</p> : null}
        {isLoading ? <p className="route-loading">Loading CSS catalog entries...</p> : null}
        {!isLoading && !loadError ? (
          <div className="css-catalog-grid">
            {filteredEntries.map((entry) => (
              <CssCatalogCard key={entry.slug} entry={entry} />
            ))}
          </div>
        ) : null}
      </section>
    </div>
  )
}

export default CssCatalogPage
