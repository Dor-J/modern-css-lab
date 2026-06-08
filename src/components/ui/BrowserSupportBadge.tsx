import { supportMeta, type FeatureSupport } from '../../data/features'

type BrowserSupportBadgeProps = {
  support: FeatureSupport
  year?: number
}

function BrowserSupportBadge({ support, year }: BrowserSupportBadgeProps) {
  const meta = supportMeta[support]

  return (
    <span className="support-badge" data-support={support} title={meta.description}>
      <span className="support-badge__dot" aria-hidden="true" />
      <span>{meta.shortLabel}</span>
      {year ? <span className="support-badge__year">{year}</span> : null}
    </span>
  )
}

export default BrowserSupportBadge
