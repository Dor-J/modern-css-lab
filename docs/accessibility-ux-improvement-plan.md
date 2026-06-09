# Accessibility and UX Improvement Plan

Audit date: June 9, 2026

This document is a practical improvement roadmap for Modern CSS Lab. It is not a legal compliance statement. The working quality bar is WCAG 2.2 AA, with additional product UX expectations for a technical learning lab: keyboard efficiency, readable demos, clear support states, reduced-motion safety, and accessible CSS-only games.

## Current Strengths

The project already has a solid accessibility foundation:

- A skip link and main landmark are present in the app shell.
- The main content area is focusable with `tabIndex={-1}` for route-level focus management.
- Navigation uses semantic links, breadcrumbs, side navigation, and mobile navigation.
- Most demo surfaces use native controls for state, which keeps keyboard and assistive technology behavior closer to platform defaults.
- Demo and catalog regions include `aria-label`, `aria-live`, `role`, and labelled groups in many places.
- The games use native form controls, live status regions, support notes, and focus styling in the shared game engine.
- Global CSS includes `:focus-visible` styling and `prefers-reduced-motion` handling.
- Theme support uses `color-scheme`, light/dark tokens, and app-level theme state.
- The catalog and feature playgrounds expose inspectable targets, support checks, dynamic snippets, and computed styles.

## Implementation Status

Implemented on June 9, 2026:

- Route changes now move focus back to the main content region.
- Demo controls announce CSS variable updates and reset actions.
- Copy buttons expose success/failure feedback through a live region.
- Demo previews, feature playground previews, and catalog demo stages are labelled focusable regions.
- Inspector target pickers support arrow-key, Home, and End navigation.
- Inspector panels announce the currently selected target.
- Catalog dev-console tabs support keyboard tab-panel navigation and include screen-reader descriptions.
- Computed-style and support-query panels expose dynamic status summaries.
- Motion demos and catalog motion entries include visible reduced-motion notes.
- Game pages include a labelled play region and a consistent accessibility guidance panel.
- Support badges include accessible descriptions beyond visual color and `title` text.
- Controls, game controls, code blocks, and dev-console panels have stronger focus/touch ergonomics.
- Playwright accessibility/UX smoke coverage now verifies route focus, target picker keyboard behavior, copy feedback, dev-console tab navigation, reduced-motion behavior, mobile navigation, and game accessibility guidance.

## Main UX Risks

The highest-impact gaps are not basic semantic failures. They are product-level clarity and interaction issues:

- Some complex demos expose many controls and inspector panels without enough screen-reader context.
- Dynamic snippet and computed-style updates are visually clear, but assistive technology users need better announcements for important changes.
- Games are playable, but some game state is still represented visually first and textually second.
- Scrollable regions, carousels, and dev-console panels need stronger keyboard instructions and focus recovery.
- Color-rich demos and support badges need formal contrast checks against both light and dark themes.
- Motion demos respect reduced motion globally, but there is no visible motion-debug or motion-preference explanation per demo.
- Mobile layouts are responsive, but touch target size, panel stacking, and dense inspector content need a dedicated pass.

## Priority Roadmap

### P0: Audit Checklist and Quick Fixes

- Add an accessibility checklist to PR review for every new demo, game, and catalog renderer change.
- Verify every route has one clear page heading and a sensible landmark structure.
- Ensure every icon-only or symbolic control has an accessible name.
- Confirm every scrollable demo region has a visible label and keyboard focus style.
- Add short support/caveat language where experimental behavior changes interaction, not only visuals.
- Review all live status text for clarity, especially game win/loss states and CSS support checks.

### P1: Keyboard and Screen Reader Improvements

- Add route focus restoration so keyboard users land on the new page heading or main content after navigation.
- Improve tab order inside `DemoShell`, `FeaturePlayground`, and `CssDemoRenderer` so controls, preview, inspector, and snippets follow a predictable sequence.
- Add screen-reader descriptions for the dev-console tabs: Elements, Styles, Computed, Variables, Supports, and Snippets.
- Announce selected inspector target changes with a polite live region.
- Add keyboard help text for target pickers, scrollable previews, carousels, and game boards.
- Make copy-to-clipboard feedback available to screen readers, not only visual users.

### P2: Contrast, Readability, and Visual Comfort

- Run contrast checks for text, badges, code blocks, game HUDs, controls, and inspector rows in both light and dark themes.
- Define minimum contrast targets for support badges:
  - Normal text: WCAG AA 4.5:1.
  - Large labels and icon/text badges: at least 3:1.
  - Focus outlines and non-text UI boundaries: at least 3:1 against adjacent colors.
- Add token-level contrast documentation for `tokens.css` so future color changes do not accidentally reduce readability.
- Review OKLCH/generated color demos for fallback foreground colors when dynamic colors are not supported.
- Make dense code snippets easier to scan with stronger line-height, scrollbar visibility, and focus states.

### P3: Reduced Motion and Motion Debug UX

- Add a visible "motion safe" note to motion-heavy demos explaining how reduced motion changes the experience.
- Add a per-demo debug state for scroll-driven and view-timeline demos where animations can be paused or inspected statically.
- Ensure games with animations have a readable non-motion state and do not rely on movement alone to communicate status.
- Review `@starting-style`, view transitions, scroll timelines, Icy Tower, Snake, and Doom for reduced-motion fallbacks.
- Keep reduced-motion behavior CSS-first through `@media (prefers-reduced-motion: reduce)`.

### P4: Mobile and Touch Ergonomics

- Validate all routes at 360px, 768px, 1024px, and desktop widths.
- Ensure controls have comfortable touch targets, especially sliders, radios, checkboxes, carousel controls, and game cells.
- Keep inspector panels readable after stacking below demos on small screens.
- Avoid horizontal scrolling except in intentional, labelled scrollable examples.
- Add persistent context for long pages so users can recover their category, demo, and selected inspector target.

### P5: Automated Accessibility Testing

- Add Playwright accessibility smoke flows for:
  - Keyboard-only navigation across core routes.
  - Target picker selection.
  - Demo control changes.
  - Copy button feedback.
  - Game state announcements.
  - Mobile navigation.
- Add axe-core or equivalent accessibility checks once the test environment supports it cleanly.
- Add contrast checks for design tokens, badge variants, code blocks, and game HUD colors.
- Add reduced-motion test coverage by emulating `prefers-reduced-motion: reduce`.
- Add a small set of route-level regression tests for focus visibility and no console errors.

## Area-Specific Recommendations

### App Shell and Navigation

- Move focus to `#main-content` or the route heading after route changes.
- Confirm the skip link remains visible and readable in both themes.
- Keep sidebar and mobile nav labels consistent so screen-reader users hear the same page names.
- Add `aria-current="page"` to active navigation links if not already present.

### Demo Pages

- Give every demo preview a descriptive accessible name that explains the interaction, not only the feature name.
- Add a short "What changed" live message for controls that significantly alter layout, color, animation, or state.
- Avoid relying on color alone to identify selected targets or supported/unsupported states.
- Make fallback/caveat notes visually near the demo and accessible through normal reading order.

### Dev Console and Inspector

- Keep dev-console tabs keyboard-operable with arrow-key support if custom tab behavior grows more complex.
- Add stronger accessible descriptions for computed values, custom variables, and `CSS.supports()` rows.
- Announce when a new target is selected and when computed values refresh.
- Give snippet copy buttons clear success/failure feedback.
- Keep long snippets scrollable but ensure the scroll region has focus styles and a useful accessible label.

### CSS Catalog

- Add a short "generated demo" caveat where catalog entries use generic or grammar-template demos.
- Ensure every catalog detail route has a clear relationship between the MDN entry, live demo, support result, and fallback snippet.
- Improve non-visual entries with extra explanatory text for screen-reader users, since the visual preview may not communicate the concept alone.

### CSS-Only Games

- Treat every game as an interactive application, not only a visual demo.
- Ensure the current game state, available actions, win/loss condition, and reset option are available as text.
- Keep keyboard controls documented near the game surface.
- Use live regions carefully so games announce important state changes without excessive chatter.
- Confirm hidden form controls remain reachable through visible labels and sensible focus order.
- Provide reduced-motion states for animated sequences and timed visual effects.

## Acceptance Checklist

Before marking future accessibility/UX work complete:

- Keyboard-only users can navigate the home page, all category pages, `/css`, representative catalog detail pages, and every game.
- Every interactive control has a visible focus state.
- Every icon-only, visual-only, or symbolic control has an accessible name.
- Demo previews, inspector panels, scrollable regions, and game boards have meaningful labels.
- Dynamic status changes that matter are announced through `aria-live` or equivalent native semantics.
- Reduced motion is respected and verified for motion demos and games.
- Text, badges, controls, and code blocks pass contrast checks in both light and dark themes.
- Mobile layouts are checked at 360px, 768px, 1024px, and desktop widths.
- No demo relies on color alone to communicate support, selection, validity, or game state.
- Copy buttons, target pickers, carousels, dialogs, popovers, and scroll panels remain keyboard usable.

## Suggested Documentation Workflow

- Keep this file as the accessibility and UX roadmap.
- Update it after major demo, catalog, or game changes.
- Add completed items to release notes or PR descriptions.
- Link any future automated accessibility test results from this document.
- Do not claim WCAG conformance until a full manual audit and automated test suite have been completed.
