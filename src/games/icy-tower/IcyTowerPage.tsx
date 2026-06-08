import { GameControls, GameHud, GamePageShell, KeyboardControlBridge } from '../../components/games'
import { getCssGame } from '..'

const mechanics = [
  'Lane and height radios represent the climber state.',
  'CSS variables place the climber and highlight the current platform.',
  'The tower background scrolls with CSS animation while reduced motion keeps it static.',
  'Win and fall states are authored selector combinations, not JavaScript physics.',
]

function IcyTowerPage() {
  const game = getCssGame('icy-tower')

  if (!game) {
    return null
  }

  return (
    <GamePageShell game={game} mechanics={mechanics}>
      <KeyboardControlBridge
        rootId="icy-tower-game"
        bindings={[
          { key: 'ArrowLeft', selector: 'label[for="icy-lane-left"]' },
          { key: 'a', selector: 'label[for="icy-lane-left"]' },
          { key: 'ArrowRight', selector: 'label[for="icy-lane-right"]' },
          { key: 'd', selector: 'label[for="icy-lane-right"]' },
          { key: ' ', selector: 'label[for="icy-height-2"]' },
          { key: 'r', selector: '[data-key-reset]' },
        ]}
      />
      <form id="icy-tower-game" className="css-game icy-game" data-running="true">
        <section className="game-shell">
          <GameHud>
            <div>
              <p className="eyebrow">Vertical climber</p>
              <h2>Land on the lit platforms</h2>
            </div>
            <GameControls>
              <button type="reset" className="game-reset-button" data-key-reset>
                Restart climb
              </button>
            </GameControls>
          </GameHud>

          <input id="icy-lane-left" className="game-hidden-input" name="icy-lane" type="radio" />
          <input id="icy-lane-mid" className="game-hidden-input" name="icy-lane" type="radio" defaultChecked />
          <input id="icy-lane-right" className="game-hidden-input" name="icy-lane" type="radio" />
          <input id="icy-height-1" className="game-hidden-input" name="icy-height" type="radio" defaultChecked />
          <input id="icy-height-2" className="game-hidden-input" name="icy-height" type="radio" />
          <input id="icy-height-3" className="game-hidden-input" name="icy-height" type="radio" />
          <input id="icy-height-4" className="game-hidden-input" name="icy-height" type="radio" />
          <input id="icy-height-5" className="game-hidden-input" name="icy-height" type="radio" />

          <div className="icy-controls">
            <div className="game-control-group" aria-label="Lane controls">
              <label className="game-control" htmlFor="icy-lane-left">
                Left
              </label>
              <label className="game-control" htmlFor="icy-lane-mid">
                Center
              </label>
              <label className="game-control" htmlFor="icy-lane-right">
                Right
              </label>
            </div>
            <div className="game-control-group" aria-label="Jump height">
              {[1, 2, 3, 4, 5].map((height) => (
                <label key={height} className="game-control" htmlFor={`icy-height-${height}`}>
                  {height}
                </label>
              ))}
            </div>
          </div>

          <div className="icy-stage" aria-label="Icy Tower stage">
            <div className="icy-skyline" aria-hidden="true" />
            <span className="icy-platform icy-platform--1">Start</span>
            <span className="icy-platform icy-platform--2">Step</span>
            <span className="icy-platform icy-platform--3">Step</span>
            <span className="icy-platform icy-platform--4">Risk</span>
            <span className="icy-platform icy-platform--5">Goal</span>
            <span className="icy-climber" aria-hidden="true" />
            <div className="icy-result icy-result--fall">
              <strong>Slip</strong>
              <span>The right lane misses the fourth platform.</span>
            </div>
            <div className="icy-result icy-result--win">
              <strong>Top floor</strong>
              <span>You reached the final platform.</span>
            </div>
          </div>
        </section>
      </form>
    </GamePageShell>
  )
}

export default IcyTowerPage
