import type { ReactNode } from 'react'

type DemoControlsProps = {
  label: string
  children: ReactNode
}

function DemoControls({ label, children }: DemoControlsProps) {
  return (
    <div className="demo-controls" aria-label={label}>
      {children}
    </div>
  )
}

export default DemoControls
