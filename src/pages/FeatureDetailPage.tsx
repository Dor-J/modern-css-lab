import { Link, useParams } from 'react-router-dom'
import { categoryById } from '../data/categories'
import { getFeatureBySlug } from '../data/features'
import FeaturePlayground from '../components/playground/FeaturePlayground'
import BrowserSupportBadge from '../components/ui/BrowserSupportBadge'
import CodeBlock from '../components/ui/CodeBlock'
import SupportNotice from '../components/ui/SupportNotice'

function FeatureDetailPage() {
  const { slug = '' } = useParams()
  const feature = getFeatureBySlug(slug)

  if (!feature) {
    return (
      <section className="section-block">
        <p className="eyebrow">Missing feature</p>
        <h1>Feature not found</h1>
        <p>The requested feature slug is not in the registry.</p>
        <Link className="button-link" to="/">
          Back to dashboard
        </Link>
      </section>
    )
  }

  const category = categoryById.get(feature.category)
  const cssSnippet = feature.cssFeatures.map((cssFeature) => `/* ${cssFeature} */`).join('\n')

  return (
    <article className="feature-detail">
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link to="/">Dashboard</Link>
        {category ? <Link to={category.route}>{category.title}</Link> : null}
      </nav>
      <header className="feature-detail__hero">
        <BrowserSupportBadge support={feature.support} year={feature.baselineYear} />
        <h1>{feature.title}</h1>
        <p>{feature.summary}</p>
      </header>
      <div className="feature-detail__grid">
        <section className="section-block">
          <h2>Why this matters</h2>
          <p>{feature.whyItMatters}</p>
          <h2>Demo ideas</h2>
          <ul>
            {feature.demoIdeas.map((idea) => (
              <li key={idea}>{idea}</li>
            ))}
          </ul>
        </section>
        <aside className="section-block">
          <h2>CSS surface</h2>
          <CodeBlock code={cssSnippet} />
          <SupportNotice support={feature.support} year={feature.baselineYear} note={feature.browserNotes} />
          <h2>Fallback strategy</h2>
          <p>{feature.fallbackStrategy}</p>
        </aside>
      </div>
      <FeaturePlayground feature={feature} />
    </article>
  )
}

export default FeatureDetailPage
