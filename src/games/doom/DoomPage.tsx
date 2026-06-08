import { GameControls, GameHud, GamePageShell, KeyboardControlBridge } from '../../components/games'
import { getCssGame } from '..'

const mechanics = [
  'Rooms, facing direction, keycard, shells, armor, and enemy defeat are native form controls.',
  'The 3D corridor is CSS perspective, clipped wall planes, gradients, and :has()-switched room tokens.',
  'The exit only opens when the keycard is held and the reactor enemy is defeated.',
  'This is a CSS-only Doom-style corridor shooter, not a JavaScript raycasting engine.',
]

function DoomPage() {
  const game = getCssGame('doom')

  if (!game) {
    return null
  }

  return (
    <GamePageShell game={game} mechanics={mechanics}>
      <KeyboardControlBridge
        rootId="doom-game"
        bindings={[
          { key: 'w', selector: 'label[for="doom-room-hall"]' },
          { key: 'ArrowUp', selector: 'label[for="doom-room-hall"]' },
          { key: 'a', selector: 'label[for="doom-face-left"]' },
          { key: 'ArrowLeft', selector: 'label[for="doom-face-left"]' },
          { key: 'd', selector: 'label[for="doom-face-right"]' },
          { key: 'ArrowRight', selector: 'label[for="doom-face-right"]' },
          { key: 'e', selector: 'label[for="doom-key"]' },
          { key: 'f', selector: 'label[for="doom-enemy-defeated"]' },
          { key: ' ', selector: 'label[for="doom-enemy-defeated"]' },
          { key: 'r', selector: '[data-key-reset]' },
        ]}
      />
      <form id="doom-game" className="css-game doom-game">
        <section className="game-shell doom-shell">
          <GameHud>
            <div>
              <p className="eyebrow">CSS-only corridor shooter</p>
              <h2>Keycard, shells, reactor demon, exit</h2>
            </div>
            <GameControls>
              <button type="reset" className="game-reset-button" data-key-reset>
                Restart run
              </button>
            </GameControls>
          </GameHud>

          <input id="doom-room-entry" className="game-hidden-input" name="doom-room" type="radio" defaultChecked />
          <input id="doom-room-hall" className="game-hidden-input" name="doom-room" type="radio" />
          <input id="doom-room-armory" className="game-hidden-input" name="doom-room" type="radio" />
          <input id="doom-room-reactor" className="game-hidden-input" name="doom-room" type="radio" />
          <input id="doom-room-exit" className="game-hidden-input" name="doom-room" type="radio" />
          <input id="doom-face-forward" className="game-hidden-input" name="doom-face" type="radio" defaultChecked />
          <input id="doom-face-left" className="game-hidden-input" name="doom-face" type="radio" />
          <input id="doom-face-right" className="game-hidden-input" name="doom-face" type="radio" />
          <input id="doom-key" className="game-hidden-input" type="checkbox" />
          <input id="doom-shells" className="game-hidden-input" type="checkbox" />
          <input id="doom-armor" className="game-hidden-input" type="checkbox" />
          <input id="doom-enemy-defeated" className="game-hidden-input" type="checkbox" />

          <div className="doom-controls">
            <div className="game-control-group" aria-label="Move between rooms">
              <label className="game-control" htmlFor="doom-room-entry">
                Entry
              </label>
              <label className="game-control" htmlFor="doom-room-hall">
                Hall
              </label>
              <label className="game-control" htmlFor="doom-room-armory">
                Armory
              </label>
              <label className="game-control" htmlFor="doom-room-reactor">
                Reactor
              </label>
              <label className="game-control" htmlFor="doom-room-exit">
                Exit
              </label>
            </div>
            <div className="game-control-group" aria-label="Look direction">
              <label className="game-control" htmlFor="doom-face-left">
                Turn left
              </label>
              <label className="game-control" htmlFor="doom-face-forward">
                Forward
              </label>
              <label className="game-control" htmlFor="doom-face-right">
                Turn right
              </label>
            </div>
            <div className="game-control-group" aria-label="Actions">
              <label className="game-control" htmlFor="doom-key">
                Keycard
              </label>
              <label className="game-control" htmlFor="doom-shells">
                Shells
              </label>
              <label className="game-control" htmlFor="doom-armor">
                Armor
              </label>
              <label className="game-control" htmlFor="doom-enemy-defeated">
                Fire
              </label>
            </div>
          </div>

          <div className="doom-cabinet" aria-label="Doom CSS game screen">
            <div className="doom-viewport" aria-hidden="true">
              <span className="doom-ceiling" />
              <span className="doom-floor" />
              <span className="doom-wall doom-wall--left" />
              <span className="doom-wall doom-wall--right" />
              <span className="doom-wall doom-wall--back" />
              <span className="doom-pillar doom-pillar--left" />
              <span className="doom-pillar doom-pillar--right" />
              <span className="doom-door" />
              <span className="doom-pickup doom-pickup--key" />
              <span className="doom-pickup doom-pickup--shells" />
              <span className="doom-pickup doom-pickup--armor" />
              <span className="doom-enemy doom-enemy--imp" />
              <span className="doom-crosshair" />
              <span className="doom-muzzle" />
              <span className="doom-weapon" />
            </div>

            <div className="doom-bottom-bar">
              <div className="doom-face" aria-hidden="true" />
              <dl className="doom-hud">
                <div>
                  <dt>Health</dt>
                  <dd className="doom-hud__health">100</dd>
                </div>
                <div>
                  <dt>Armor</dt>
                  <dd className="doom-hud__armor">0</dd>
                </div>
                <div>
                  <dt>Ammo</dt>
                  <dd className="doom-hud__ammo">0</dd>
                </div>
                <div>
                  <dt>Key</dt>
                  <dd className="doom-hud__key">No</dd>
                </div>
              </dl>
              <ol className="doom-minimap" aria-label="Map">
                <li className="doom-map-room doom-map-room--entry">E</li>
                <li className="doom-map-room doom-map-room--hall">H</li>
                <li className="doom-map-room doom-map-room--armory">A</li>
                <li className="doom-map-room doom-map-room--reactor">R</li>
                <li className="doom-map-room doom-map-room--exit">X</li>
              </ol>
            </div>

            <div className="doom-status" aria-live="polite">
              <span className="doom-status__entry">Entry bay. Move into the hall.</span>
              <span className="doom-status__hall">Hall junction. Armory left, reactor right, exit ahead.</span>
              <span className="doom-status__armory">Armory. Pick up keycard, shells, and armor.</span>
              <span className="doom-status__armory-ready">Armory cleared. Head to the reactor.</span>
              <span className="doom-status__reactor-unarmed">Reactor demon ahead. Load shells before firing.</span>
              <span className="doom-status__reactor-live">Reactor demon is live. Fire to clear the room.</span>
              <span className="doom-status__reactor-clear">Reactor clear. Exit is now reachable with the keycard.</span>
              <span className="doom-status__exit-locked">Exit locked. Need keycard and reactor clear.</span>
              <span className="doom-status__win">Exit open. CSS-only run complete.</span>
            </div>
          </div>
        </section>
      </form>
    </GamePageShell>
  )
}

export default DoomPage
