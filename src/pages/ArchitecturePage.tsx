import LayerConflictDemo from '../components/demos/architecture/LayerConflictDemo'
import CategoryPage from './CategoryPage'

function ArchitecturePage() {
  return <CategoryPage categoryId="architecture" demos={<LayerConflictDemo />} />
}

export default ArchitecturePage
