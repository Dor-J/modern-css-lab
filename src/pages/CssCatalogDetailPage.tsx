import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CssDemoRenderer from '../components/cssCatalog/CssDemoRenderer'
import { createCssDemoSpec, loadCssCatalogEntry, type CssCatalogEntry } from '../data/cssCatalog'

type EntryLoadState =
  | { slug: string; status: 'loading' }
  | { slug: string; status: 'loaded'; entry: CssCatalogEntry | undefined }
  | { slug: string; status: 'error'; message: string }

function CssCatalogDetailPage() {
  const { slug = '' } = useParams()
  const [entryState, setEntryState] = useState<EntryLoadState>({ slug, status: 'loading' })

  useEffect(() => {
    let cancelled = false

    loadCssCatalogEntry(slug)
      .then((loadedEntry) => {
        if (cancelled) return
        setEntryState({ slug, status: 'loaded', entry: loadedEntry })
      })
      .catch(() => {
        if (cancelled) return
        setEntryState({ slug, status: 'error', message: 'The CSS catalog entry could not be loaded.' })
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  const activeEntryState: EntryLoadState =
    entryState.slug === slug ? entryState : { slug, status: 'loading' }
  const entry = activeEntryState.status === 'loaded' ? activeEntryState.entry : undefined
  const isLoading = activeEntryState.status === 'loading'
  const loadError = activeEntryState.status === 'error' ? activeEntryState.message : ''
  const spec = useMemo(() => (entry ? createCssDemoSpec(entry) : undefined), [entry])

  if (isLoading) {
    return (
      <section className="section-block">
        <p className="eyebrow">Loading CSS entry</p>
        <h1>Loading catalog entry...</h1>
        <p className="route-loading">Loading the relevant catalog chunk for this route.</p>
      </section>
    )
  }

  if (!entry) {
    return (
      <section className="section-block">
        <p className="eyebrow">Missing CSS entry</p>
        <h1>Catalog entry not found</h1>
        <p>{loadError || 'The requested CSS catalog slug is not in the MDN snapshot.'}</p>
        <Link className="button-link" to="/css">
          Back to All CSS
        </Link>
      </section>
    )
  }

  const activeSpec = spec ?? createCssDemoSpec(entry)

  return (
    <article className="css-entry-detail">
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link to="/">Dashboard</Link>
        <Link to="/css">All CSS</Link>
      </nav>
      <header className="css-entry-detail__hero">
        <div>
          <p className="eyebrow">{entry.kind}</p>
          <h1>{entry.title}</h1>
          <p>{entry.summary}</p>
        </div>
        <div className="css-entry-detail__facts">
          <span className={`catalog-status catalog-status--${entry.status}`}>{entry.status}</span>
          <code>{entry.syntax}</code>
          <a href={entry.mdnUrl} target="_blank" rel="noreferrer">
            MDN reference
          </a>
        </div>
      </header>
      <CssDemoRenderer entry={entry} spec={activeSpec} />
      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Audit notes</p>
            <h2>Snapshot and edge cases</h2>
          </div>
        </div>
        <p>{entry.specNotes}</p>
        <ul>
          {activeSpec.edgeCases.map((edgeCase) => (
            <li key={edgeCase}>{edgeCase}</li>
          ))}
        </ul>
      </section>
    </article>
  )
}

export default CssCatalogDetailPage
