import CategoryPage from './CategoryPage'

function TypographyPage() {
  return (
    <CategoryPage
      categoryId="typography"
      afterHero={
        <section className="typography-sample">
          <p className="eyebrow">Progressive sample</p>
          <h2>Balanced headlines and pretty article text are enabled in the CSS layer.</h2>
          <p>
            This page is ready for deeper typography controls. The registry includes text-wrap, font-relative
            units, hyphenation, initial-letter, and text-box-trim as labeled progressive features.
          </p>
        </section>
      }
    />
  )
}

export default TypographyPage
