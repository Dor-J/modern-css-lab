import { supportMeta, type FeatureSupport } from '../../data/features'
import BrowserSupportBadge from './BrowserSupportBadge'

type SupportNoticeProps = {
  support: FeatureSupport
  year?: number
  note: string
}

function SupportNotice({ support, year, note }: SupportNoticeProps) {
  return (
    <aside className="support-notice" data-support={support}>
      <BrowserSupportBadge support={support} year={year} />
      <p>
        <strong>{supportMeta[support].label}.</strong> {note}
      </p>
    </aside>
  )
}

export default SupportNotice
