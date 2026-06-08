import { getFeatureBySlug } from '../../data/features'

export function getDemoFeature(slug: string) {
  const feature = getFeatureBySlug(slug)

  if (!feature) {
    throw new Error(`Missing demo feature: ${slug}`)
  }

  return feature
}
