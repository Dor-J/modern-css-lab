# CSS Catalog Audit

Snapshot date: June 8, 2026

Source:

- MDN CSS Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference
- MDN Browser Compatibility Data: https://github.com/mdn/browser-compat-data
- MDN data reference: https://github.com/mdn/data

## Scope

The rendered `/css` catalog uses the MDN CSS Reference index as the static source for standard CSS entries. It includes properties, at-rules, at-rule descriptors, selectors, pseudo-classes, pseudo-elements, functions, data types, values, and concepts.

The snapshot contains 868 rendered entries after filtering.

## Exclusions

- Vendor-prefixed `-webkit-*` entries from the MDN index.
- SVG-exclusive presentation attributes, which MDN notes are not included in the CSS Reference index.
- Entries explicitly labeled non-standard in the source index.

## Demo Policy

Every rendered catalog entry has its own route and a generated per-entry demo spec. The demos use shared renderer primitives but receive unique scoped HTML, CSS, support queries, snippets, targets, and URL state based on the entry slug and kind.

The current implementation establishes full route and inspector coverage for the catalog. Further hand-polishing can deepen individual entries beyond the generic deep-demo template.

## Loading Policy

Catalog entry data is loaded through cached, kind-based dynamic imports instead of one synchronous aggregate module. Category pages use a small static category-count map for coverage strips, so normal category routes do not download the full MDN snapshot. The `/css` index loads all kind chunks on demand, and `/css/:slug` loads catalog data through the same lazy loader path.

Vite also names catalog JSON chunks with `css-catalog-*` manual chunking so future shared imports keep the data split by kind. This keeps the largest catalog data chunk below the default Vite warning threshold without hiding warnings through `chunkSizeWarningLimit`.
