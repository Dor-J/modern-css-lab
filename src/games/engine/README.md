# CSS-only game engine

This folder is a CSS-only engine layer for future games. It provides reusable primitives for board layout, matrix variables, CSS animation clocks, selector-driven state, controls, actors, and progressive experiments.

Import it from the global stylesheet or from a future game stylesheet:

```css
@import '../games/engine/index.css';
```

## Core model

- `.css-game` is the game root and owns all state custom properties.
- `.game-shell` frames a playable surface.
- `.game-stage` overlays board, actors, effects, and overlays in one grid cell.
- `.game-board` / `.game-layer` create the matrix using `--game-cols`, `--game-rows`, `--game-cell`, and `--game-cell-gap`.
- `.game-cell`, `.game-tile`, `.game-actor`, `.game-entity`, `.game-pickup`, and `.game-projectile` consume `--cell-x`, `--cell-y`, `--actor-x`, and `--actor-y`.
- `.game-run-toggle`, `.game-pause-toggle`, `.game-state--*`, and `.game-move--*` let `:has()` turn form controls into state.

## What CSS can and cannot own

CSS can own the clock, the visual state machine, selector-gated states, matrix positioning, transitions, and declarative interaction. CSS cannot persist arbitrary simulation state across ticks, so movement that must accumulate over time still needs either markup states, form controls, or a future external controller.

## Minimal board

```html
<form class="css-game" data-running="true" style="--game-cols: 6; --game-rows: 6;">
  <section class="game-shell">
    <div class="game-hud">
      <span class="game-stat game-status"></span>
      <span class="game-clock"></span>
    </div>

    <div class="game-stage">
      <ol class="game-board" data-auto-index>
        <li class="game-cell" data-x="1" data-y="1"></li>
        <li class="game-cell" data-x="2" data-y="1" data-solid></li>
        <li class="game-cell" data-x="3" data-y="1" data-goal></li>
      </ol>

      <div class="game-layer">
        <button class="game-actor" data-kind="player" data-x="1" data-y="1" type="button">P</button>
        <span class="game-entity" data-kind="enemy" data-motion="orbit" data-x="3" data-y="1">E</span>
      </div>
    </div>
  </section>
</form>
```

## Progressive features

- `@property` registers typed numbers, lengths, angles, and integers for animation and inspection.
- `:has()` drives state from native form controls.
- `sibling-index()` / `sibling-count()` auto-fill matrix indices when supported.
- `round()` and `mod()` derive grid coordinates from sibling index where supported.
- `sin()` / `cos()` power orbit and bob motion where supported.
- `if()` progressively picks values from style/support queries.
- `custom-functions.draft.css` contains the optional `@function` version of reusable track math. It is not imported by default because current CSS minifiers may warn on the draft at-rule.
- Typed `attr()` can map `data-x`, `data-y`, and `data-i` into numeric variables where supported.

All experimental rules sit behind `@supports` where possible and have static fallbacks.
