import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { GameDefinition } from '../../games/types'
import GameSupportNote from './GameSupportNote'

type GamePageShellProps = {
  game: GameDefinition
  children: ReactNode
  mechanics: string[]
}

function GamePageShell({ game, children, mechanics }: GamePageShellProps) {
  return (
    <article className={`game-page game-page--${game.slug}`}>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/games">Games</Link>
        <span>{game.title}</span>
      </nav>

      <header className="game-page__hero">
        <div>
          <p className="eyebrow">CSS-only game</p>
          <h1>{game.title}</h1>
          <p>{game.summary}</p>
        </div>
        <dl className="game-page__meta">
          <div>
            <dt>Difficulty</dt>
            <dd>{game.difficulty}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{game.status === 'playable' ? 'Playable' : 'CSS-feasible classic'}</dd>
          </div>
        </dl>
      </header>

      <section className="game-page__layout">
        <div className="game-page__play">{children}</div>
        <aside className="game-page__side">
          <GameSupportNote>{game.supportNotes}</GameSupportNote>
          <section className="game-mechanics-panel" aria-labelledby={`${game.slug}-mechanics`}>
            <h2 id={`${game.slug}-mechanics`}>CSS mechanics</h2>
            <ul>
              {mechanics.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="game-mechanics-panel" aria-labelledby={`${game.slug}-controls`}>
            <h2 id={`${game.slug}-controls`}>Controls</h2>
            <ul>
              {game.controls.map((control) => (
                <li key={control}>{control}</li>
              ))}
            </ul>
          </section>
        </aside>
      </section>
    </article>
  )
}

export default GamePageShell
