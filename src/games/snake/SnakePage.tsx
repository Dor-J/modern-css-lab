import { GameControls, GameHud, GamePageShell, KeyboardControlBridge } from '../../components/games'
import { getCssGame } from '..'

const cells = Array.from({ length: 81 }, (_, index) => index + 1)

const mechanics = [
  'Every move is a native radio transition; CSS decides which direction controls are available at that state.',
  'Snake head, body, food, crash, and win positions are custom properties switched by :has().',
  'Food states grow extra body segments with CSS selectors, not React state.',
  'This is a finite CSS state machine because CSS cannot persist an arbitrary runtime snake body.',
]

function SnakePage() {
  const game = getCssGame('snake')

  if (!game) {
    return null
  }

  return (
    <GamePageShell game={game} mechanics={mechanics}>
      <KeyboardControlBridge
        rootId="snake-game"
        bindings={[
          { key: 'ArrowUp', selector: '[data-snake-dir="north"]' },
          { key: 'w', selector: '[data-snake-dir="north"]' },
          { key: 'ArrowRight', selector: '[data-snake-dir="east"]' },
          { key: 'd', selector: '[data-snake-dir="east"]' },
          { key: 'ArrowDown', selector: '[data-snake-dir="south"]' },
          { key: 's', selector: '[data-snake-dir="south"]' },
          { key: 'ArrowLeft', selector: '[data-snake-dir="west"]' },
          { key: 'a', selector: '[data-snake-dir="west"]' },
          { key: 'r', selector: '[data-key-reset]' },
        ]}
      />
      <form id="snake-game" className="css-game snake-game" data-running="true" data-speed="slow">
        <section className="game-shell">
          <GameHud>
            <div>
              <p className="eyebrow">CSS state-machine snake</p>
              <h2>Eat both pellets without hitting a wall</h2>
            </div>
            <GameControls>
              <button type="reset" className="game-reset-button" data-key-reset>
                Reset snake
              </button>
            </GameControls>
          </GameHud>

          <input id="snake-step-0" className="game-hidden-input" name="snake-step" type="radio" defaultChecked />
          <input id="snake-step-1" className="game-hidden-input" name="snake-step" type="radio" />
          <input id="snake-step-2" className="game-hidden-input" name="snake-step" type="radio" />
          <input id="snake-step-3" className="game-hidden-input" name="snake-step" type="radio" />
          <input id="snake-step-4" className="game-hidden-input" name="snake-step" type="radio" />
          <input id="snake-step-5" className="game-hidden-input" name="snake-step" type="radio" />
          <input id="snake-crash" className="game-hidden-input" name="snake-step" type="radio" />

          <div className="snake-toolbar">
            <div className="snake-score" aria-live="polite">
              <span className="snake-score__start">Score 0 - move east.</span>
              <span className="snake-score__moving">Score 0 - keep steering.</span>
              <span className="snake-score__food1">Score 1 - first pellet eaten, body grew.</span>
              <span className="snake-score__food2">Score 2 - run complete.</span>
              <span className="snake-score__crash">Crash - wall collision.</span>
            </div>
            <div className="game-dpad snake-step-controls" aria-label="Snake direction controls">
              <label className="game-control snake-control snake-control--s0-east" data-dir="east" data-snake-dir="east" htmlFor="snake-step-1">
                Right
              </label>
              <label className="game-control snake-control snake-control--s0-wall" data-dir="north" data-snake-dir="north" htmlFor="snake-crash">
                Up
              </label>
              <label className="game-control snake-control snake-control--s1-north" data-dir="north" data-snake-dir="north" htmlFor="snake-step-2">
                Up
              </label>
              <label className="game-control snake-control snake-control--s1-wall" data-dir="east" data-snake-dir="east" htmlFor="snake-crash">
                Right
              </label>
              <label className="game-control snake-control snake-control--s2-east" data-dir="east" data-snake-dir="east" htmlFor="snake-step-3">
                Right
              </label>
              <label className="game-control snake-control snake-control--s2-wall" data-dir="west" data-snake-dir="west" htmlFor="snake-crash">
                Left
              </label>
              <label className="game-control snake-control snake-control--s3-south" data-dir="south" data-snake-dir="south" htmlFor="snake-step-4">
                Down
              </label>
              <label className="game-control snake-control snake-control--s3-wall" data-dir="north" data-snake-dir="north" htmlFor="snake-crash">
                Up
              </label>
              <label className="game-control snake-control snake-control--s4-east" data-dir="east" data-snake-dir="east" htmlFor="snake-step-5">
                Right
              </label>
              <label className="game-control snake-control snake-control--s4-wall" data-dir="south" data-snake-dir="south" htmlFor="snake-crash">
                Down
              </label>
              <span className="game-control snake-control snake-control--done" data-dir="center" aria-hidden="true">
                OK
              </span>
            </div>
          </div>

          <div className="game-clock" aria-hidden="true" />

          <div className="game-stage snake-stage">
            <ol className="game-board snake-board" aria-label="Snake board">
              {cells.map((cell) => (
                <li key={cell} className="game-cell snake-cell" />
              ))}
            </ol>
            <div className="game-layer snake-layer" aria-hidden="true">
              <span className="snake-food snake-food--1" />
              <span className="snake-food snake-food--2" />
              <span className="snake-wall snake-wall--1" />
              <span className="snake-wall snake-wall--2" />
              <span className="snake-wall snake-wall--3" />
              <span className="snake-segment snake-head" />
              <span className="snake-segment snake-body snake-body--1" />
              <span className="snake-segment snake-body snake-body--2" />
              <span className="snake-segment snake-body snake-body--3" />
              <span className="snake-segment snake-body snake-body--4" />
              <span className="snake-segment snake-body snake-body--5" />
            </div>
            <div className="game-overlay snake-overlay snake-overlay--lost">
              <strong>Collision</strong>
              <span>The snake hit a wall. Reset and try the safe path.</span>
            </div>
            <div className="game-overlay snake-overlay snake-overlay--fed">
              <strong>Food collected</strong>
              <span>The snake grew. Continue to the second pellet.</span>
            </div>
            <div className="game-overlay snake-overlay snake-overlay--win">
              <strong>Run complete</strong>
              <span>Both pellets collected with CSS-only state.</span>
            </div>
          </div>
        </section>
      </form>
    </GamePageShell>
  )
}

export default SnakePage
