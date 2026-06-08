import type { ReactNode } from 'react'

type GameControlsProps = {
  children: ReactNode
  label?: string
}

function GameControls({ children, label = 'Game controls' }: GameControlsProps) {
  return (
    <div className="game-controls-panel" aria-label={label}>
      {children}
    </div>
  )
}

export default GameControls
