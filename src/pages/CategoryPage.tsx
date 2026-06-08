import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { categoryById } from '../data/categories'
import { getCssCatalogEntriesByCategory, type CssCatalogCategory } from '../data/cssCatalog'
import type { FeatureCategory } from '../data/features'
import { getFeaturesByCategory, mvpFeatureSlugs } from '../data/features'
import FeaturePlayground from '../components/playground/FeaturePlayground'
import CategoryHero from '../components/ui/CategoryHero'
import FeatureGrid from '../components/ui/FeatureGrid'

type CategoryPageProps = {
  categoryId: FeatureCategory
  demos?: ReactNode
  afterHero?: ReactNode
}

function CategoryPage({ categoryId, demos, afterHero }: CategoryPageProps) {
  const category = categoryById.get(categoryId)

  if (!category) {
    return <p>Category not found.</p>
  }

  const categoryFeatures = getFeaturesByCategory(categoryId)
  const experimentalCount = categoryFeatures.filter((feature) => feature.support === 'experimental').length
  const customDemoSlugSet = new Set(demos ? mvpFeatureSlugs : [])
  const playgroundFeatures = categoryFeatures.filter((feature) => !customDemoSlugSet.has(feature.slug))
  const catalogEntries =
    categoryId === 'games' ? [] : getCssCatalogEntriesByCategory(categoryId as CssCatalogCategory)

  return (
    <div className="page-stack">
      <CategoryHero category={category} />
      <section className="catalog-coverage-strip" aria-label={`${category.title} CSS catalog coverage`}>
        <div>
          <p className="eyebrow">All CSS coverage</p>
          <strong>{catalogEntries.length}</strong>
          <span>MDN reference entries mapped to this category</span>
        </div>
        <Link className="button-link button-link--secondary" to={`/css?category=${category.id}`}>
          Browse catalog entries
        </Link>
      </section>
      {afterHero}
      {demos ? (
        <div className="demo-list" aria-label={`${category.title} demos`}>
          {demos}
        </div>
      ) : (
        <section className="demo-placeholder">
          <p className="eyebrow">Demo queue</p>
          <h2>Feature cards first</h2>
          <p>
            This category is registered and ready for focused demos. Experimental items stay labeled until a
            production-safe fallback is implemented.
          </p>
        </section>
      )}
      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Interactive registry</p>
            <h2>Dynamic snippets and inspector</h2>
          </div>
          <p>
            {playgroundFeatures.length} registry entries with URL-synced controls, live support checks, and
            computed-style inspection.
          </p>
        </div>
        <div className="playground-grid">
          {playgroundFeatures.map((feature) => (
            <FeaturePlayground key={feature.slug} feature={feature} compact />
          ))}
        </div>
      </section>
      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Registry</p>
            <h2>{category.title} feature index</h2>
          </div>
          <p>
            {categoryFeatures.length} entries, {experimentalCount} experimental.
          </p>
        </div>
        <FeatureGrid features={categoryFeatures} />
      </section>
    </div>
  )
}

export default CategoryPage
