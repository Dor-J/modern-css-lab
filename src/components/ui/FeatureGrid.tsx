import type { Feature } from '../../data/features'
import FeatureCard from './FeatureCard'

type FeatureGridProps = {
  features: Feature[]
}

function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <div className="feature-grid">
      {features.map((feature) => (
        <FeatureCard key={feature.slug} feature={feature} />
      ))}
    </div>
  )
}

export default FeatureGrid
