import { Link } from 'react-router-dom'
import { cssGames } from '../games'

function GamesPage() {
  return (
    <div className="page-stack">
      <section className="games-hub-hero">
        <div>
          <p className="eyebrow">CSS-only games</p>
          <h1>Playable CSS state machines</h1>
          <p>
            Seven browser games built as CSS-first experiments. React mounts pages and optional keyboard plumbing,
            while native controls, selectors, custom properties, and animations own the gameplay state.
          </p>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Game routes</p>
            <h2>Choose a game</h2>
          </div>
        </div>
        <div className="game-hub-grid">
          {cssGames.map((game) => (
            <Link key={game.slug} to={game.route} className="game-card">
              <div className="game-card__meta">
                <span>{game.difficulty}</span>
                <span>{game.status === 'playable' ? 'Playable' : 'CSS-feasible'}</span>
              </div>
              <h3>{game.title}</h3>
              <p>{game.summary}</p>
              <div className="game-card__chips" aria-label={`${game.title} CSS features`}>
                {game.cssFeatures.slice(0, 3).map((feature) => (
                  <span key={feature}>{feature}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default GamesPage
