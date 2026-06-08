import type { Category } from '../../data/categories'

type CategoryHeroProps = {
  category: Category
  eyebrow?: string
}

function CategoryHero({ category, eyebrow = 'Category' }: CategoryHeroProps) {
  return (
    <header className={`category-hero category-hero--${category.accent}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{category.title}</h1>
      <p>{category.summary}</p>
      <strong>{category.spotlight}</strong>
    </header>
  )
}

export default CategoryHero
