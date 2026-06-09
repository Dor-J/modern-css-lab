type LiveRegionProps = {
  message: string
  politeness?: 'polite' | 'assertive'
}

function LiveRegion({ message, politeness = 'polite' }: LiveRegionProps) {
  return (
    <span
      className="visually-hidden"
      role={politeness === 'assertive' ? 'alert' : 'status'}
      aria-live={politeness}
      aria-atomic="true"
    >
      {message}
    </span>
  )
}

export default LiveRegion

