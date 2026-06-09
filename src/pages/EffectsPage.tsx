import EffectsWorkbench from '../components/demos/effects/EffectsWorkbench'
import CategoryPage from './CategoryPage'

function EffectsPage() {
  return <CategoryPage categoryId="effects" demos={<EffectsWorkbench />} />
}

export default EffectsPage
