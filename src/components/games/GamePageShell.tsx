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
        <div
          className="game-page__play"
          role="region"
          aria-labelledby={`${game.slug}-play-heading`}
          aria-describedby={`${game.slug}-accessibility`}
        >
          <h2 className="visually-hidden" id={`${game.slug}-play-heading`}>
            Play {game.title}
          </h2>
          {children}
        </div>
        <aside className="game-page__side">
          <GameSupportNote>{game.supportNotes}</GameSupportNote>
          <section className="game-mechanics-panel" aria-labelledby={`${game.slug}-accessibility`}>
            <h2 id={`${game.slug}-accessibility`}>Accessibility</h2>
            <ul>
              <li>Keyboard users can tab through the native controls that hold the CSS game state.</li>
              <li>Visible labels, reset actions, and status regions describe the current state and end condition.</li>
              <li>Motion effects respect the global reduced-motion media query where animation is used.</li>
            </ul>
          </section>
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
