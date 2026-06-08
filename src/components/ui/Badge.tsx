import type { ReactNode } from 'react'

type BadgeProps = {
  children: ReactNode
  tone?: 'neutral' | 'green' | 'blue' | 'amber' | 'purple' | 'red'
  className?: string
}

function Badge({ children, tone = 'neutral', className = '' }: BadgeProps) {
  return <span className={`badge badge--${tone} ${className}`.trim()}>{children}</span>
}

export default Badge
