import { GameControls, GameHud, GamePageShell } from '../../components/games'
import { getCssGame } from '..'

const cells = Array.from({ length: 9 }, (_, index) => index + 1)

const mechanics = [
  'Every square is one radio group with X and O choices.',
  'CSS win selectors check rows, columns, and diagonals with chained :has().',
  'Once a square has a selected mark, the alternate visible choice is blocked by CSS.',
  'The result layer, board highlights, and reset are all CSS/form driven.',
]

function TicTacToePage() {
  const game = getCssGame('tic-tac-toe')

  if (!game) {
    return null
  }

  return (
    <GamePageShell game={game} mechanics={mechanics}>
      <form id="tic-tac-toe-game" className="css-game ttt-game">
        <section className="game-shell">
          <GameHud>
            <div>
              <p className="eyebrow">Two players</p>
              <h2>Claim three in a row</h2>
            </div>
            <GameControls>
              <button type="reset" className="game-reset-button" data-key-reset>
                New round
              </button>
            </GameControls>
          </GameHud>

          <div className="ttt-board" role="group" aria-label="Tic-tac-toe board">
            {cells.map((cell) => (
              <fieldset key={cell} className={`ttt-cell ttt-cell--${cell}`}>
                <legend>Square {cell}</legend>
                <input id={`ttt-x-${cell}`} name={`ttt-cell-${cell}`} type="radio" value="x" />
                <input id={`ttt-o-${cell}`} name={`ttt-cell-${cell}`} type="radio" value="o" />
                <label className="ttt-choice ttt-choice--x" htmlFor={`ttt-x-${cell}`}>
                  X
                </label>
                <label className="ttt-choice ttt-choice--o" htmlFor={`ttt-o-${cell}`}>
                  O
                </label>
              </fieldset>
            ))}
            <span className="ttt-line ttt-line--r1" aria-hidden="true" />
            <span className="ttt-line ttt-line--r2" aria-hidden="true" />
            <span className="ttt-line ttt-line--r3" aria-hidden="true" />
            <span className="ttt-line ttt-line--c1" aria-hidden="true" />
            <span className="ttt-line ttt-line--c2" aria-hidden="true" />
            <span className="ttt-line ttt-line--c3" aria-hidden="true" />
            <span className="ttt-line ttt-line--d1" aria-hidden="true" />
            <span className="ttt-line ttt-line--d2" aria-hidden="true" />
          </div>

          <div className="ttt-result" aria-live="polite">
            <span className="ttt-result__idle">Choose X or O in each square.</span>
            <span className="ttt-result__x">X wins.</span>
            <span className="ttt-result__o">O wins.</span>
            <span className="ttt-result__draw">Board filled. Draw unless a win line is active.</span>
          </div>
        </section>
      </form>
    </GamePageShell>
  )
}

export default TicTacToePage
