import { GameControls, GameHud, GamePageShell } from '../../components/games'
import { getCssGame } from '..'

const cells = Array.from({ length: 9 }, (_, index) => index + 1)

const mechanics = [
  'Each square is a native checkbox; checked state is the board matrix.',
  'The solved cross pattern is detected with chained :has() and :not(:has()) selectors.',
  'Focus and hover states reveal neighboring cells to teach adjacency rules.',
  'The reset control is a native form reset, so no React state is needed.',
]

function TogglePuzzlePage() {
  const game = getCssGame('toggle-puzzle')

  if (!game) {
    return null
  }

  return (
    <GamePageShell game={game} mechanics={mechanics}>
      <form id="toggle-puzzle-game" className="css-game toggle-game" data-density="relaxed">
        <section className="game-shell">
          <GameHud>
            <div>
              <p className="eyebrow">Goal pattern</p>
              <h2>Light the cross</h2>
            </div>
            <GameControls>
              <button type="reset" className="game-reset-button" data-key-reset>
                Reset board
              </button>
            </GameControls>
          </GameHud>

          <p className="toggle-status" aria-live="polite" />

          <div className="toggle-board" aria-label="Toggle puzzle board">
            {cells.map((cell) => (
              <div key={cell} className={`toggle-cell toggle-cell--${cell}`}>
                <input className="game-hidden-input" id={`toggle-${cell}`} type="checkbox" />
                <label htmlFor={`toggle-${cell}`}>
                  <span>{cell}</span>
                </label>
              </div>
            ))}
          </div>

          <div className="toggle-solved" role="status">
            <strong>Solved</strong>
            <span>The board matches the CSS-declared cross pattern.</span>
          </div>
        </section>
      </form>
    </GamePageShell>
  )
}

export default TogglePuzzlePage
