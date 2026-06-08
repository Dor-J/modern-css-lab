import { Link } from 'react-router-dom'
import { categories } from '../data/categories'
import { featuredFeatureSlugs, features, supportMeta, type FeatureSupport } from '../data/features'
import BrowserSupportBadge from '../components/ui/BrowserSupportBadge'
import FeatureCard from '../components/ui/FeatureCard'

const supportLevels: FeatureSupport[] = [
  'baseline-widely',
  'baseline-newly',
  'progressive',
  'experimental',
]

function HomePage() {
  const featuredFeatures = featuredFeatureSlugs
    .map((slug) => features.find((feature) => feature.slug === slug))
    .filter(Boolean)

  return (
    <div className="page-stack">
      <section className="home-hero">
        <div className="home-hero__content">
          <p className="eyebrow">CSS systems playground</p>
          <h1>Modern CSS Lab</h1>
          <p>
            A practical React + vanilla CSS playground for the CSS features that changed frontend development.
          </p>
          <div className="home-hero__actions">
            <Link className="button-link" to="/layout">
              Start with layout
            </Link>
            <Link className="button-link button-link--secondary" to="/css">
              Browse all CSS
            </Link>
            <Link className="button-link button-link--secondary" to="/architecture">
              See architecture
            </Link>
          </div>
        </div>
        <div className="lab-visual" aria-label="CSS lab dashboard preview">
          <div className="lab-visual__grid">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="lab-visual__panel">
            <strong>@layer demos;</strong>
            <span>container queries</span>
            <span>scroll timelines</span>
            <span>oklch tokens</span>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Map</p>
            <h2>Categories</h2>
          </div>
          <p>{features.length} typed feature entries ready for expansion.</p>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link className={`category-card category-card--${category.accent}`} to={category.route} key={category.id}>
              <span className="category-card__accent" aria-hidden="true" />
              <h3>{category.title}</h3>
              <p>{category.summary}</p>
              <strong>{category.spotlight}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Featured</p>
            <h2>MVP demos</h2>
          </div>
          <p>Built with real CSS features and visible fallback notes.</p>
        </div>
        <div className="feature-grid feature-grid--featured">
          {featuredFeatures.map((feature) => (feature ? <FeatureCard feature={feature} key={feature.slug} compact /> : null))}
        </div>
      </section>

      <section className="support-legend section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Support</p>
            <h2>Support-level legend</h2>
          </div>
        </div>
        <div className="support-legend__grid">
          {supportLevels.map((support) => (
            <article key={support} className="support-legend__item">
              <BrowserSupportBadge support={support} />
              <h3>{supportMeta[support].label}</h3>
              <p>{supportMeta[support].description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
