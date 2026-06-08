import type { ReactNode } from 'react'

type GameHudProps = {
  children: ReactNode
}

function GameHud({ children }: GameHudProps) {
  return <div className="game-page-hud">{children}</div>
}

export default GameHud
