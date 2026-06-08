import { Link } from 'react-router-dom'
import type { CssCatalogEntry } from '../../data/cssCatalog'

type CssCatalogCardProps = {
  entry: CssCatalogEntry
}

function CssCatalogCard({ entry }: CssCatalogCardProps) {
  return (
    <article className="css-catalog-card">
      <div className="css-catalog-card__meta">
        <span>{entry.kind}</span>
        <span className={`catalog-status catalog-status--${entry.status}`}>{entry.status}</span>
      </div>
      <h3>
        <Link to={`/css/${entry.slug}`}>{entry.title}</Link>
      </h3>
      <p>{entry.summary}</p>
      <code>{entry.syntax}</code>
    </article>
  )
}

export default CssCatalogCard
