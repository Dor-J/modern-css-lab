import CategoryPage from './CategoryPage'

function EffectsPage() {
  return (
    <CategoryPage
      categoryId="effects"
      afterHero={
        <section className="effects-sample">
          <article className="glass-sample">
            <p className="eyebrow">backdrop-filter fallback</p>
            <h2>Glass surface with a solid fallback</h2>
            <p>Masks, clipping, blend isolation, motion paths, scrollbars, and corner-shape are registered.</p>
          </article>
          <article className="pixel-sample" aria-label="Pixel rendering sample">
            <span />
            <span />
            <span />
            <span />
          </article>
        </section>
      }
    />
  )
}

export default EffectsPage
