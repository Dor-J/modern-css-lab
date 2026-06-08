import ContainerQueryProductCard from '../components/demos/layout/ContainerQueryProductCard'
import ScrollStateStickyHeader from '../components/demos/layout/ScrollStateStickyHeader'
import StyleQueryThemedCard from '../components/demos/layout/StyleQueryThemedCard'
import CategoryPage from './CategoryPage'

function LayoutPage() {
  return (
    <CategoryPage
      categoryId="layout"
      demos={
        <>
          <ContainerQueryProductCard />
          <StyleQueryThemedCard />
          <ScrollStateStickyHeader />
        </>
      }
    />
  )
}

export default LayoutPage
