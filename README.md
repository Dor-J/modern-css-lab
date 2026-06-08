# Modern CSS Lab

Modern CSS Lab is a React + Vite + TypeScript documentation playground for CSS features that changed frontend development: container queries, scroll-state queries, scroll-driven animations, CSS math, modern color syntax, native UI primitives, cascade layers, scoped styling, typed custom properties, and progressive enhancement patterns.

React orchestrates routes, pages, controls, and typed data. Plain CSS does the real styling and demo work. There is no Tailwind, Bootstrap, Material UI, or CSS-in-JS.

Every registry feature has an interactive playground surface. The MVP demos use custom workspaces; the rest use a metadata-driven inspector card with controls, live CSS snippets, computed styles, and support checks.

The `/css` section adds a static MDN CSS Reference snapshot with 868 catalog entries. Each entry has a dedicated route, dynamic snippets, URL-synced controls, support checks, and a tabbed dev-console-style display.

## Tech Stack

- React 19
- Vite 8
- TypeScript
- React Router
- Vanilla CSS with explicit cascade layers

## Run Locally

```bash
npm install
npm run dev
```

Build production assets:

```bash
npm run build
```

Validate the static CSS catalog snapshot:

```bash
npm run validate:catalog
```

Run route and catalog e2e smoke tests:

```bash
npm run test:e2e
```

## Categories

- Layout and responsiveness
- Modern colors and theming
- CSS functions, logic, and math
- Modern selectors and state
- Typography
- Motion, scroll, and interaction
- Native components and platform UI
- Visual effects and creative CSS
- CSS architecture
- Future CSS-only games
- Complete MDN CSS reference catalog at `/css`

## Support Legend

- `baseline-widely`: green, safe for modern production
- `baseline-newly`: blue, modern cross-browser
- `progressive`: amber, use with fallback
- `experimental`: purple/red, limited support or demo only

Experimental and limited-support features include visible support badges, caveat notes, and fallback visuals. When a feature can be detected in CSS, enhanced styles are guarded with `@supports` or the relevant conditional rule.

## CSS Architecture

Global CSS is imported through explicit cascade layers:

```css
@layer reset, tokens, base, layout, components, utilities, demos, overrides;
```

The stylesheet split is:

- `reset.css`
- `tokens.css`
- `global.css`
- `layers.css`
- `feature-support.css`
- `utilities.css`
- `demos.css`

The app uses modern CSS custom properties, OKLCH token enhancement, `color-scheme`, `light-dark()`, logical properties, reduced-motion handling, native nesting, and progressive enhancement blocks.

## Implemented MVP Demos

- Container Query Product Card
- Style Query Themed Card
- Scroll-State Sticky Header
- OKLCH Theme Generator
- `light-dark()` Theme Demo
- CSS Math Circular Menu
- `clamp()` Fluid Typography
- `:has()` Form/Card Demo
- `@starting-style` + `transition-behavior` Dialog
- Scroll-Driven Progress Indicator
- View Timeline Reveal Cards
- `@layer` Conflict Demo

## Interactive Inspector

Each playground includes:

- CSS-first native controls that write CSS custom properties to the demo root
- URL-synced state using `?demo=<slug>&<control>=<value>`
- Dynamic snippets whose copied output matches the current control values
- A target picker for inspecting live elements in the demo
- Computed style rows from `getComputedStyle()`
- Live `CSS.supports()` checks when the feature syntax can be detected
- Syntax-preview labeling for future or undetectable CSS features

The generated inspector cards are intentionally compact. They make every feature in the registry inspectable without pretending that all 126 entries have bespoke production demos.

## All CSS Catalog

The All CSS catalog is scoped to the MDN CSS Reference snapshot for June 8, 2026. It excludes vendor-prefixed `-webkit-*` entries and non-standard items. SVG-exclusive presentation attributes are also outside this catalog because the MDN CSS Reference index omits them.

Catalog docs live in `docs/css-catalog-audit.md`.

## Roadmap

- Phase A: Modern CSS feature lab
- Phase B: Interactive playground controls
- Phase C: CSS-only games section
- Phase D: Browser-support visual matrix
- Phase E: Exportable snippets / copy-to-clipboard
- Phase F: Blog-style explanations per feature
