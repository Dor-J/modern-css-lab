import ClampFluidTypography from '../components/demos/functions/ClampFluidTypography'
import CssMathCircularMenu from '../components/demos/functions/CssMathCircularMenu'
import CategoryPage from './CategoryPage'

function FunctionsPage() {
  return (
    <CategoryPage
      categoryId="functions"
      demos={
        <>
          <CssMathCircularMenu />
          <ClampFluidTypography />
        </>
      }
    />
  )
}

export default FunctionsPage
