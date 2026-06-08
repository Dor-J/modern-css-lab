import CategoryPage from './CategoryPage'

function ComponentsPage() {
  return (
    <CategoryPage
      categoryId="components"
      afterHero={
        <section className="native-sample">
          <details>
            <summary>Native details/summary sample</summary>
            <p>
              Platform components stay semantic first. Dialog, popover, anchor-positioned popovers, scroll-snap
              carousels, and custom select experiments are registered for focused follow-up demos.
            </p>
          </details>
          <div className="snap-preview" aria-label="Scroll snap preview" tabIndex={0}>
            <article>dialog</article>
            <article>popover</article>
            <article>carousel</article>
          </div>
        </section>
      }
    />
  )
}

export default ComponentsPage
