# CSS Demo Relevance Audit

Audit date: June 9, 2026

Scope reviewed:

- Bespoke `DemoShell` demos mounted from the category pages.
- Shallow category samples on Typography, Components, and Effects.
- Registry-driven `FeaturePlayground` cards for the remaining modern CSS feature entries.
- Generated `/css` catalog demos rendered by `CssDemoRenderer`.

The goal of this audit is to decide whether each demo teaches the CSS feature it claims to teach, whether the interaction changes the relevant CSS behavior, and what should be changed where the demo is too generic.

## Evaluation Standard

A demo is considered relevant when:

- The live CSS uses the actual feature syntax being taught.
- Controls change the feature itself or a directly related CSS variable.
- The visual result is specific enough that it cannot be confused with a generic styled card.
- The inspector exposes meaningful computed values, custom properties, support checks, and snippets.
- Unsupported or experimental behavior has a visible fallback or caveat.
- Interaction is accessible by keyboard and remains usable with reduced motion.

## Executive Summary

The strongest current demos are the 12 bespoke MVP demos. Most of them are relevant, interactive, and inspector-friendly. They should remain the quality benchmark.

The weakest area is the generic registry playground. It gives every feature dynamic snippets and an inspector, but the same accent/radius/density controls are reused for many unrelated CSS features. That means many non-MVP entries are technically interactive but not educationally specific.

Typography, Components, and Effects have only shallow category samples. These pages need dedicated bespoke demos because their features are visual, stateful, or platform-specific enough that generic cards do not teach them well.

The `/css` catalog is valuable as a coverage surface, but its generated demo specs are not yet "deep" demos. Many catalog entries receive arbitrary values through `--demo-value`, which can be invalid or unrelated to the real property grammar.

## Bespoke MVP Demo Audit

| Category | Demo | Relevance | Interactivity | Finding | Recommendation |
| --- | --- | --- | --- | --- | --- |
| Layout | Container Query Product Card | Strong | Strong | The same product card is shown in narrow and wide containers, uses `container-type: inline-size`, `@container`, and container query units. This is directly relevant. | Keep. Optional upgrade: add a draggable/resizable container width control and computed `cqi`/container width readouts so the breakpoint is easier to inspect. |
| Layout | Style Query Themed Card | Good, needs richer controls | Moderate | The demo correctly uses a parent custom property and `@container style(...)`, with a class fallback. The current interaction only changes glow strength, not the queried style state. | Add a variant selector that changes the parent `--variant` token between `standard`, `premium`, and another state. Show the class fallback and style-query enhancement side by side. |
| Layout | Scroll-State Sticky Header | Good, support-sensitive | Moderate | The sticky panel demonstrates `container-type: scroll-state` and `@container scroll-state(stuck: top)`. It is relevant, but the user must scroll to discover the state, and support is limited. | Add a visible stuck/not-stuck status strip, a support result badge inside the demo body, and a static fallback comparison that shows the always-border fallback. |
| Colors | OKLCH Theme Generator | Strong | Strong | The demo uses OKLCH tokens, `color-mix()`, custom properties, and live palette derivation. Controls affect the actual color model. | Keep. Optional upgrade: add contrast ratio/readability badges and exportable token snippets for surface, border, hover, muted, and shadow. |
| Colors | `light-dark()` Theme Tokens | Good, needs clearer local state | Moderate | The CSS is relevant and uses `color-scheme` plus `light-dark()`. The interaction partly depends on the app-level theme switcher, so the demo is less self-contained. | Add local segmented controls for system, forced light, forced dark, and component override. Render three cards side by side to show root, app, and component color-scheme boundaries. |
| Functions | CSS Math Circular Menu | Strong | Strong | The radial menu uses `sin()` and `cos()` for real placement, with a grid fallback. Controls adjust orbit and angle. This is directly relevant. | Keep. Optional upgrade: add item-count controls when `sibling-count()` is available, and show per-item `--angle` values in the inspector. |
| Functions | `clamp()` Fluid Typography | Good, could be more demonstrable | Moderate | The heading uses `clamp()` and container query units. Controls update min, preferred, and max values. The result is relevant but viewport/container responsiveness is not obvious without resizing. | Add an inline width simulator with narrow/medium/wide handles, plus computed font-size and active bound labels: min, fluid, or max. |
| Selectors | `:has()` Form/Card State | Strong | Strong | The parent card responds to descendant focus, invalid input, and checked radio state without JS. This is exactly the correct teaching model for `:has()`. | Keep. Optional upgrade: add active selector chips that light up for `:has(:focus-visible)`, `:has(:invalid)`, and `:has(:checked)`. |
| Motion | `@starting-style` Dialog Transition | Strong | Strong | The demo uses a native dialog, `@starting-style`, and `transition-behavior: allow-discrete`. React only opens the platform dialog. | Keep. Optional upgrade: add a popover variant and a reduced-motion preview toggle so users can compare transition paths. |
| Motion | Scroll-Driven Progress Indicator | Strong | Strong | The progress bar is driven by a named scroll timeline without JS. The interaction is scroll-native and relevant. | Keep. Optional upgrade: add timeline naming details and expose `scroll-timeline-name` and progress transform in a more prominent inspector row. |
| Motion | View Timeline Reveal Cards | Strong | Strong | Cards animate using `animation-timeline: view(...)` and `animation-range`. The fallback is fully visible cards. | Keep. Optional upgrade: add controls for `animation-range` start/end and a pause/debug mode that freezes cards at representative entry states. |
| Architecture | `@layer` Conflict Demo | Strong | Strong | The side-by-side unlayered/layered comparison clearly demonstrates layer order beating specificity pressure. | Keep. Optional upgrade: add a layer-order toggle and selector specificity badges so users can see why the layered utility wins. |

## Category Page Coverage Audit

| Category | Current state | Relevance assessment | Required change |
| --- | --- | --- | --- |
| Layout | 3 bespoke demos plus registry playgrounds. | Good coverage for container queries and scroll-state. Other layout entries still rely on generic cards. | Add bespoke demos for `subgrid`, anchor positioning, dynamic viewport units, content visibility, two-value display syntax, and container query units as separate teaching surfaces. |
| Colors | 2 bespoke demos plus registry playgrounds. | Strong for OKLCH and `light-dark()`, weaker for relative colors, contrast color, wide gamut, and gradient interpolation. | Add targeted palette demos for relative color syntax, `contrast-color()`, Display-P3, and OKLCH gradient interpolation. |
| Functions | 2 bespoke demos plus registry playgrounds. | Strong for trig and `clamp()`. Most math functions are currently generic and do not show their practical use. | Add grammar-specific demos for rounding, modulo/remainder, exponent/power scale, distance via `hypot()`, angle via `atan2()`, and future `if()`/`@function` syntax previews. |
| Selectors | 1 bespoke `:has()` demo plus registry playgrounds. | Strong for `:has()`, but most selector entries need state-specific examples. | Add form-validation demos for `:user-valid`/`:user-invalid`, disclosure/top-layer demos for `:open`, `:modal`, `:popover-open`, and text/highlight demos for `::target-text` and `::highlight()`. |
| Typography | One shallow `afterHero` sample plus registry playgrounds. | Not sufficient. The sample mentions typography features but does not provide controls or inspector targets for each feature. | Build bespoke demos for `text-wrap: balance`, `text-wrap: pretty`, `lh`/`rlh`, font-relative units, hyphenation, `initial-letter`, writing modes, and `text-box-trim`. |
| Motion | 3 bespoke demos plus registry playgrounds. | Strong for scroll timelines, view timelines, and top-layer transitions. View Transitions API remains underrepresented. | Add a gallery/detail transition demo using `view-transition-name`, `::view-transition-old()`, and `::view-transition-new()` with a no-transition fallback. |
| Components | One shallow `details/summary` and scroll-snap preview plus registry playgrounds. | Not sufficient. The page lists platform primitives but does not provide dedicated playable native component demos. | Build full demos for `dialog`, `popover`, anchor-positioned popovers, scroll-snap carousel, customizable select, invoker commands, and `closedby` caveats. |
| Effects | One shallow glass/pixel sample plus registry playgrounds. | Not sufficient. Visual effects need direct visual controls and before/after comparisons. | Build bespoke demos for `backdrop-filter`, `filter`, `mix-blend-mode` with `isolation`, `mask-image`, `clip-path`, `offset-path`, scrollbar styling, and `corner-shape`. |
| Architecture | 1 bespoke `@layer` demo plus registry playgrounds. | Strong for cascade layers; other architecture topics are still generic. | Add scoped component, nested CSS, `@supports` fallback, design-token, and typed `@property` animation demos. |
| Games | Game pages exist separately from CSS feature categories. | Useful as CSS state-machine showcases, but they are not property-level reference demos. | Keep games as a separate section. Add a mechanics panel on each game that links its selectors, inputs, counters, and custom properties back to relevant CSS catalog entries. |

## Generic Registry Playground Audit

The registry contains 126 curated modern feature entries. The 12 MVP entries have bespoke demos. The remaining 114 entries render through `FeaturePlayground`.

Current strengths:

- Every registry feature has a visible support badge.
- Each playground has controls, URL-synced state, dynamic snippets, support queries, and computed-style inspection.
- The cards are responsive and consistent with the design system.

Current weakness:

- Most non-MVP features use the same `Accent`, `Radius`, and `Density` controls.
- The generated snippet mostly lists the feature as a comment instead of applying the feature syntax.
- Computed properties are broad defaults, so the inspector often does not prove the feature is active.
- Experimental features are safely labeled, but many are syntax previews rather than meaningful demos.

Recommended replacement strategy:

1. Add `interactionPreset` or `demoKind` metadata to each registry feature.
2. Keep the shared inspector, controls, snippets, and support panels.
3. Replace the one-size-fits-all preview with feature-specific preset renderers.
4. Track demo quality with a field such as `demoQuality: 'bespoke' | 'preset' | 'snippet-preview'`.

High-priority preset groups:

- Layout preset: resizing panes, grid/subgrid, anchors, sticky/scroll containers, viewport-unit simulator.
- Color preset: token source, derived colors, contrast/readability, gamut and fallback swatches.
- Function preset: formula visualizer with numeric inputs and computed CSS values.
- Selector preset: native form/disclosure/top-layer states that activate selectors without JS styling state.
- Typography preset: editable text samples with measure, script, line-height, wrap, and hyphenation controls.
- Motion preset: scrollable debug stage with reduced-motion toggle and timeline/range controls.
- Component preset: native controls with keyboard/focus behavior and platform fallback notes.
- Effect preset: before/after media card with blend, mask, filter, clip, and scrollbar controls.
- Architecture preset: cascade, scope, layer, token, and fallback comparison panels.

## Specific Non-MVP Features That Need Better Demos

These are the most important examples where the current generic playground is not relevant enough.

| Area | Feature examples | Why current demo is weak | Suggested specific demo |
| --- | --- | --- | --- |
| Layout | `subgrid` | A rounded feature card does not show parent/child grid track inheritance. | Parent grid with nested cards whose headings, body text, and footers align through `grid-template-rows: subgrid`. Add a fallback with duplicated row sizing. |
| Layout | Anchor positioning | Generic card controls do not demonstrate tethered positioning. | Button plus tooltip/popover anchored with `anchor-name`, `position-anchor`, `anchor()`, and fallback absolute placement. |
| Layout | Dynamic viewport units | Generic cards cannot show `svh`, `lvh`, and `dvh` differences. | Mobile viewport simulator showing URL-bar-safe sections, with controls switching `100vh`, `100svh`, `100lvh`, and `100dvh`. |
| Layout | Content visibility | Generic card does not show rendering/performance behavior. | Long list with expensive panels, `content-visibility: auto`, `contain-intrinsic-size`, and visible reserved-size fallback. |
| Colors | Relative color syntax | Generic accent color does not demonstrate channel extraction or modification. | Base OKLCH color with controls for lightness/chroma/hue deltas and generated hover/border/shadow tokens. |
| Colors | `contrast-color()` | Generic card cannot prove readable foreground selection. | Multiple background swatches with foreground chosen by `contrast-color()` and a fallback token pair. |
| Colors | Display-P3 | Generic card does not show gamut caveats. | Side-by-side sRGB and Display-P3 swatches with support detection and "may look identical on non-wide-gamut displays" caveat. |
| Functions | `round()`, `mod()`, `rem()` | Generic controls do not show quantization or cyclic values. | Spacing ruler where values snap to a grid, wrap by modulo, and compare CSS math output to fallback steps. |
| Functions | `pow()`, `sqrt()`, `hypot()`, `log()`, `exp()` | Generic card does not show why these functions matter. | Modular scale and geometry lab: spacing/type scale via `pow()`, diagonal distance via `hypot()`, and curve comparison via `log()`/`exp()`. |
| Functions | `if()` and CSS `@function` | Generic card cannot execute unsupported future syntax safely. | Syntax-preview panel with support status, fallback custom-property branch, and a clear "demo-only" label. |
| Selectors | `:user-valid`, `:user-invalid` | Generic card misses user interaction timing. | Form that compares `:invalid` with `:user-invalid` after user input, no React state. |
| Selectors | `:open`, `:modal`, `:popover-open` | Generic card does not enter native open/top-layer states. | Details, dialog, and popover trio showing each state selector and computed top-layer/focus behavior. |
| Selectors | `::target-text`, `::highlight()` | Generic card does not create real highlighted text. | Search/result article with URL text fragment notes and optional custom Highlight API only for registering ranges. |
| Typography | `text-wrap: balance` and `pretty` | Static copy does not show line-breaking differences clearly. | Editable headline/article with narrow/wide measure controls and before/after wrapping columns. |
| Typography | `lh`, `rlh`, `cap`, `ic`, `ric`, `rch`, `rex` | Generic card does not show font-relative measurement. | Multilingual type lab with rhythm blocks, CJK sample, cap-height alignment, and unit readouts. |
| Typography | `text-box-trim` | Generic card cannot show optical text box trimming. | Button and heading alignment comparison with fallback padding and support note. |
| Components | `dialog`, `popover`, invokers, `closedby` | Generic card misses native focus, top layer, and dismissal behavior. | Platform component workbench with real dialog/popover controls, keyboard tests, and declarative/React fallback split. |
| Components | Scroll-snap carousel primitives | Generic card does not scroll or expose snap targets. | Accessible carousel with `scroll-snap`, optional `::scroll-button()`/`::scroll-marker()`, keyboard focus, and fallback buttons. |
| Effects | `backdrop-filter`, `filter`, `mix-blend-mode`, `isolation` | Generic card does not show compositing context. | Layered image/card stage with toggles for blur, blend modes, isolated vs non-isolated groups. |
| Effects | `mask-image`, `clip-path`, `shape()`, `offset-path` | Generic card does not show shape or motion path geometry. | Visual shape editor with preset paths, reveal masks, and motion-path travel preview. |
| Architecture | `@scope` | Generic card does not show selector containment. | Two cards with identical internal class names where scoped CSS affects only one component subtree. |
| Architecture | `@property` | Generic card does not prove type registration or animation. | Registered number/color custom property animation with invalid-value fallback and computed variable table. |
| Architecture | CSS nesting | Generic card only states syntax. | Nested component snippet with hover/focus/child selectors and compiled mental model shown side by side. |

## `/css` Catalog Demo Audit

The `/css` catalog currently provides broad reference coverage and a useful dev-console-style interface. It is not yet a hand-authored demo set.

Current strengths:

- The catalog gives every entry a route, snippet tabs, support checks, controls, targets, and computed-style display.
- The renderer scopes demos with `data-css-demo`, which is the right foundation for safe per-entry demos.
- The UI already supports the desired future model: Elements, Styles, Computed, Variables, Supports, and Snippets.

Current weakness:

- Property demos often set `${property}: var(--demo-value)`, but many CSS properties require specialized grammars that do not accept the generated value.
- Function demos often place the function into `inline-size` or `transform`, which is not always a realistic consuming property.
- Selector and pseudo-element demos are better than property demos, but many stateful selectors need real platform states.
- At-rules, descriptors, values, and data types need contextual demos because they are not standalone visual properties.

Recommended catalog upgrade:

1. Classify catalog entries by grammar and behavior, not only by MDN kind.
2. Replace the single generator with grammar-specific templates:
   - Color property template.
   - Length/sizing template.
   - Layout/grid/flex template.
   - Typography/text template.
   - Animation/transition template.
   - Transform/filter/effect template.
   - Selector state template.
   - Pseudo-element text/list/template.
   - At-rule/descriptors template.
   - Function/data-type consuming-property template.
3. Add a `demoQuality` flag to every catalog entry.
4. Promote important catalog entries to bespoke demos over time.
5. Add validation that fails when a catalog demo's support query is invalid or when the snippet uses an unsupported value grammar without a fallback note.

## Recommended Implementation Priority

### P0 - Preserve and label current quality

- Mark the 12 bespoke demos as `demoQuality: 'bespoke'`.
- Mark `FeaturePlayground` demos as `demoQuality: 'generic-inspector'`.
- Mark generated `/css` demos as `demoQuality: 'generated-reference'`.

### P1 - Improve demos that are close

- Style Query Themed Card: make `--variant` interactive.
- Scroll-State Sticky Header: add stuck-state status and fallback comparison.
- `light-dark()`: add local theme controls and side-by-side scheme scopes.
- `clamp()`: add width simulator and computed active-bound readout.

### P2 - Add missing category-grade bespoke demos

- Typography: `text-wrap`, `lh`/`rlh`, font-relative units, hyphenation, `initial-letter`, `text-box-trim`.
- Components: dialog, popover, anchor-positioned popover, scroll-snap carousel, customizable select.
- Effects: backdrop/filter, blend/isolation, mask/clip-path, offset-path, scrollbars, corner-shape.
- Architecture: `@scope`, CSS nesting, `@supports`, design tokens, `@property`.

### P3 - Replace generic feature cards with preset renderers

- Build a preset renderer per feature family.
- Keep the same `InspectorPanel`, `DemoControlBar`, `LiveSnippet`, and support-query infrastructure.
- Make every control affect the actual feature being taught.

### P4 - Harden the full catalog

- Move from generic generated specs to grammar-aware demo specs.
- Add validation for snippet grammar, target count, support query validity, and fallback notes.
- Add smoke tests for representative examples from each demo template.

## Acceptance Checklist For Future Demo Work

Use this checklist before marking a demo complete:

- The feature is used in live CSS, not only mentioned in a comment.
- The primary control changes the feature's own value or state.
- The inspector's computed properties include the property or effect being taught.
- There are at least two inspectable targets when comparison helps.
- The fallback path is visible or described next to the demo.
- Experimental features are clearly labeled as limited support or syntax preview.
- Keyboard interaction works for all controls and target selection.
- Reduced motion is respected for animation, scrolling, and transition demos.
- The demo remains understandable at 360px, 768px, 1024px, and desktop widths.

