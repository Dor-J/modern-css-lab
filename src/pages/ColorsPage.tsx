import LightDarkThemeDemo from '../components/demos/colors/LightDarkThemeDemo'
import OklchThemeGenerator from '../components/demos/colors/OklchThemeGenerator'
import CategoryPage from './CategoryPage'

function ColorsPage() {
  return (
    <CategoryPage
      categoryId="colors"
      demos={
        <>
          <OklchThemeGenerator />
          <LightDarkThemeDemo />
        </>
      }
    />
  )
}

export default ColorsPage
