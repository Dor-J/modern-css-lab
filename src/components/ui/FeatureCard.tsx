import { Link } from 'react-router-dom'
import type { Feature } from '../../data/features'
import BrowserSupportBadge from './BrowserSupportBadge'

type FeatureCardProps = {
  feature: Feature
  compact?: boolean
}

function FeatureCard({ feature, compact = false }: FeatureCardProps) {
  return (
    <article className={`feature-card ${compact ? 'feature-card--compact' : ''}`}>
      <div className="feature-card__meta">
        <BrowserSupportBadge support={feature.support} year={feature.baselineYear} />
      </div>
      <h3>
        <Link to={`/features/${feature.slug}`}>{feature.title}</Link>
      </h3>
      <p>{feature.summary}</p>
      <ul className="feature-card__chips" aria-label={`${feature.title} CSS features`}>
        {feature.cssFeatures.slice(0, compact ? 3 : 5).map((cssFeature) => (
          <li key={cssFeature}>{cssFeature}</li>
        ))}
      </ul>
    </article>
  )
}

export default FeatureCard
