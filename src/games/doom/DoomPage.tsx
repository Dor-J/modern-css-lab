import { GameControls, GameHud, GamePageShell, KeyboardControlBridge } from '../../components/games'
import { getCssGame } from '..'

const mechanics = [
  'Room, facing direction, key, and enemy states are native form controls.',
  'The raycaster-like scene is CSS perspective, gradients, and :has()-switched custom properties.',
  'Door locks, enemy pressure, and win state are selector combinations.',
  'The weapon and enemy are original CSS artwork with no copyrighted game assets.',
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
          { key: ' ', selector: 'label[for="doom-enemy-defeated"]' },
          { key: 'r', selector: '[data-key-reset]' },
        ]}
      />
      <form id="doom-game" className="css-game doom-game">
        <section className="game-shell">
          <GameHud>
            <div>
              <p className="eyebrow">CSS raycaster tribute</p>
              <h2>Find the key, clear the reactor, reach the exit</h2>
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
          <input id="doom-enemy-defeated" className="game-hidden-input" type="checkbox" />

          <div className="doom-controls">
            <div className="game-control-group" aria-label="Rooms">
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
                Look left
              </label>
              <label className="game-control" htmlFor="doom-face-forward">
                Forward
              </label>
              <label className="game-control" htmlFor="doom-face-right">
                Look right
              </label>
            </div>
            <div className="game-control-group" aria-label="Actions">
              <label className="game-control" htmlFor="doom-key">
                Take key
              </label>
              <label className="game-control" htmlFor="doom-enemy-defeated">
                Fire
              </label>
            </div>
          </div>

          <div className="doom-screen" aria-label="Doom CSS maze screen">
            <div className="doom-viewport" aria-hidden="true">
              <span className="doom-wall doom-wall--left" />
              <span className="doom-wall doom-wall--right" />
              <span className="doom-wall doom-wall--back" />
              <span className="doom-door" />
              <span className="doom-pickup doom-pickup--key" />
              <span className="doom-enemy" />
              <span className="doom-weapon" />
            </div>
            <div className="doom-status" aria-live="polite">
              <span className="doom-status__entry">Entry room. Move to the hall.</span>
              <span className="doom-status__hall">Hallway. The armory has a key; the reactor has the threat.</span>
              <span className="doom-status__armory">Armory. Take the key before the exit.</span>
              <span className="doom-status__reactor">Reactor. Fire until the path is clear.</span>
              <span className="doom-status__exit-locked">Exit locked. Bring the key and clear the reactor.</span>
              <span className="doom-status__win">Exit open. Run complete.</span>
            </div>
          </div>
        </section>
      </form>
    </GamePageShell>
  )
}

export default DoomPage
