import { GameControls, GameHud, GamePageShell } from '../../components/games'
import { getCssGame } from '..'

const mines = new Set([5, 11, 18, 23])
const counts: Record<number, string> = {
  1: '0',
  2: '0',
  3: '1',
  4: '1',
  6: '1',
  7: '1',
  8: '1',
  9: '1',
  10: '1',
  12: '1',
  13: '1',
  14: '1',
  15: '1',
  16: '2',
  17: '2',
  19: '1',
  20: '0',
  21: '0',
  22: '1',
  24: '1',
  25: '0',
}

const cells = Array.from({ length: 25 }, (_, index) => index + 1)

const mechanics = [
  'Reveal and flag actions are separate checkboxes per cell.',
  'Mine hit and solved states are CSS selectors over the fixed minefield.',
  'Cell numbers are data attributes rendered by CSS after reveal.',
  'Flag mode changes the control emphasis without changing the underlying rules.',
]

function MineSweeperPage() {
  const game = getCssGame('mine-sweeper')

  if (!game) {
    return null
  }

  return (
    <GamePageShell game={game} mechanics={mechanics}>
      <form id="mine-sweeper-game" className="css-game mine-game">
        <section className="game-shell">
          <GameHud>
            <div>
              <p className="eyebrow">Handcrafted 5x5 field</p>
              <h2>Reveal every safe square</h2>
            </div>
            <GameControls>
              <label className="game-action-button mine-mode-toggle">
                <input id="mine-flag-mode" className="game-visually-hidden-control" type="checkbox" />
                Flag mode
              </label>
              <button type="reset" className="game-reset-button" data-key-reset>
                New field
              </button>
            </GameControls>
          </GameHud>

          <div className="mine-board" aria-label="Minesweeper board">
            {cells.map((cell) => {
              const isMine = mines.has(cell)
              return (
                <div
                  key={cell}
                  className={`mine-cell mine-cell--${cell}`}
                  data-mine={isMine ? 'true' : undefined}
                  data-count={isMine ? undefined : counts[cell]}
                >
                  <input className="mine-reveal game-hidden-input" id={`mine-r-${cell}`} type="checkbox" />
                  <input className="mine-flag game-hidden-input" id={`mine-f-${cell}`} type="checkbox" />
                  <label className="mine-reveal-label" htmlFor={`mine-r-${cell}`}>
                    <span>Reveal {cell}</span>
                  </label>
                  <label className="mine-flag-label" htmlFor={`mine-f-${cell}`}>
                    <span>Flag {cell}</span>
                  </label>
                </div>
              )
            })}
          </div>

          <div className="mine-result" aria-live="polite">
            <span className="mine-result__idle">Use reveal or flag controls. Avoid the four mines.</span>
            <span className="mine-result__lost">Mine hit. Reset the field.</span>
            <span className="mine-result__won">Field cleared without revealing a mine.</span>
          </div>
        </section>
      </form>
    </GamePageShell>
  )
}

export default MineSweeperPage
