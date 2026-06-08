import { GameControls, GameHud, GamePageShell, KeyboardControlBridge } from '../../components/games'
import { getCssGame } from '..'

const cells = Array.from({ length: 81 }, (_, index) => index + 1)

const mechanics = [
  'Direction and route presets are radio groups, not React state.',
  'Snake segment coordinates are CSS variables switched by :has() selectors.',
  'The CSS engine clock animates the head pulse and progress meter.',
  'Collision and food states are finite authored selectors for maintainable CSS-only play.',
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
          { key: 'ArrowUp', selector: 'label[for="snake-north"]' },
          { key: 'w', selector: 'label[for="snake-north"]' },
          { key: 'ArrowRight', selector: 'label[for="snake-east"]' },
          { key: 'd', selector: 'label[for="snake-east"]' },
          { key: 'ArrowDown', selector: 'label[for="snake-south"]' },
          { key: 's', selector: 'label[for="snake-south"]' },
          { key: 'ArrowLeft', selector: 'label[for="snake-west"]' },
          { key: 'a', selector: 'label[for="snake-west"]' },
          { key: 'r', selector: '[data-key-reset]' },
        ]}
      />
      <form id="snake-game" className="css-game snake-game" data-running="true" data-speed="slow">
        <section className="game-shell">
          <GameHud>
            <div>
              <p className="eyebrow">Finite CSS path board</p>
              <h2>Steer the snake to food</h2>
            </div>
            <GameControls>
              <button type="reset" className="game-reset-button" data-key-reset>
                Reset snake
              </button>
            </GameControls>
          </GameHud>

          <input id="snake-east" className="game-hidden-input" name="snake-dir" type="radio" defaultChecked />
          <input id="snake-north" className="game-hidden-input" name="snake-dir" type="radio" />
          <input id="snake-south" className="game-hidden-input" name="snake-dir" type="radio" />
          <input id="snake-west" className="game-hidden-input" name="snake-dir" type="radio" />
          <input id="snake-route-safe" className="game-hidden-input" name="snake-route" type="radio" defaultChecked />
          <input id="snake-route-food" className="game-hidden-input" name="snake-route" type="radio" />
          <input id="snake-route-wall" className="game-hidden-input" name="snake-route" type="radio" />

          <div className="snake-toolbar">
            <div className="game-dpad" aria-label="Direction controls">
              <label className="game-control" data-dir="north" htmlFor="snake-north">
                Up
              </label>
              <label className="game-control" data-dir="west" htmlFor="snake-west">
                Left
              </label>
              <span className="game-control" data-dir="center" aria-hidden="true">
                +
              </span>
              <label className="game-control" data-dir="east" htmlFor="snake-east">
                Right
              </label>
              <label className="game-control" data-dir="south" htmlFor="snake-south">
                Down
              </label>
            </div>
            <div className="game-control-group" aria-label="Path presets">
              <label className="game-control" htmlFor="snake-route-safe">
                Safe lane
              </label>
              <label className="game-control" htmlFor="snake-route-food">
                Food lane
              </label>
              <label className="game-control" htmlFor="snake-route-wall">
                Wall test
              </label>
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
              <span className="snake-food" />
              <span className="snake-segment snake-head" />
              <span className="snake-segment snake-body snake-body--1" />
              <span className="snake-segment snake-body snake-body--2" />
              <span className="snake-segment snake-body snake-body--3" />
            </div>
            <div className="game-overlay snake-overlay snake-overlay--lost">
              <strong>Collision</strong>
              <span>The selected CSS path hits the wall.</span>
            </div>
            <div className="game-overlay snake-overlay snake-overlay--fed">
              <strong>Food collected</strong>
              <span>The snake reaches the highlighted food lane.</span>
            </div>
          </div>
        </section>
      </form>
    </GamePageShell>
  )
}

export default SnakePage
