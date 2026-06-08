import { Link, useParams } from 'react-router-dom'
import CssDemoRenderer from '../components/cssCatalog/CssDemoRenderer'
import { createCssDemoSpec, getCssCatalogEntry } from '../data/cssCatalog'

function CssCatalogDetailPage() {
  const { slug = '' } = useParams()
  const entry = getCssCatalogEntry(slug)

  if (!entry) {
    return (
      <section className="section-block">
        <p className="eyebrow">Missing CSS entry</p>
        <h1>Catalog entry not found</h1>
        <p>The requested CSS catalog slug is not in the MDN snapshot.</p>
        <Link className="button-link" to="/css">
          Back to All CSS
        </Link>
      </section>
    )
  }

  const spec = createCssDemoSpec(entry)

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
      <CssDemoRenderer entry={entry} spec={spec} />
      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Audit notes</p>
            <h2>Snapshot and edge cases</h2>
          </div>
        </div>
        <p>{entry.specNotes}</p>
        <ul>
          {spec.edgeCases.map((edgeCase) => (
            <li key={edgeCase}>{edgeCase}</li>
          ))}
        </ul>
      </section>
    </article>
  )
}

export default CssCatalogDetailPage
