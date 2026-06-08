import { GameControls, GameHud, GamePageShell } from '../../components/games'
import { getCssGame } from '..'

const cards = [
  { id: 1, pair: 'a', symbol: 'OKLCH' },
  { id: 2, pair: 'b', symbol: ':has()' },
  { id: 3, pair: 'c', symbol: '@layer' },
  { id: 4, pair: 'd', symbol: 'subgrid' },
  { id: 5, pair: 'a', symbol: 'OKLCH' },
  { id: 6, pair: 'c', symbol: '@layer' },
  { id: 7, pair: 'd', symbol: 'subgrid' },
  { id: 8, pair: 'b', symbol: ':has()' },
]

const mechanics = [
  'Cards are checkboxes styled as 3D flip panels.',
  'Pair completion is declared with selectors that watch both matching card inputs.',
  'The board uses CSS counters to expose how many cards are currently flipped.',
  'Reduced motion replaces 3D flip animation with an instant reveal.',
]

function MemoryCardsPage() {
  const game = getCssGame('memory-cards')

  if (!game) {
    return null
  }

  return (
    <GamePageShell game={game} mechanics={mechanics}>
      <form id="memory-cards-game" className="css-game memory-game">
        <section className="game-shell">
          <GameHud>
            <div>
              <p className="eyebrow">Matching deck</p>
              <h2>Find all four CSS pairs</h2>
            </div>
            <GameControls>
              <button type="reset" className="game-reset-button" data-key-reset>
                Shuffle reset
              </button>
            </GameControls>
          </GameHud>

          <p className="memory-progress" aria-live="polite" />

          <div className="memory-board" aria-label="Memory card board">
            {cards.map((card) => (
              <article key={card.id} className={`memory-card memory-card--${card.id}`} data-pair={card.pair}>
                <input className="game-hidden-input" id={`memory-card-${card.id}`} type="checkbox" />
                <label htmlFor={`memory-card-${card.id}`}>
                  <span className="memory-card__face memory-card__face--back">CSS</span>
                  <span className="memory-card__face memory-card__face--front">{card.symbol}</span>
                </label>
              </article>
            ))}
          </div>

          <div className="memory-complete" role="status">
            <strong>Deck solved</strong>
            <span>All matching pairs are open.</span>
          </div>
        </section>
      </form>
    </GamePageShell>
  )
}

export default MemoryCardsPage
