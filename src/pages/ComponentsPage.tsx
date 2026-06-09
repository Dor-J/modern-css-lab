import NativeComponentsLab from '../components/demos/components/NativeComponentsLab'
import CategoryPage from './CategoryPage'

function ComponentsPage() {
  return <CategoryPage categoryId="components" demos={<NativeComponentsLab />} />
}

export default ComponentsPage
