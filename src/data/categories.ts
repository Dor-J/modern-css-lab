import type { FeatureCategory } from './features'

export type Category = {
  id: FeatureCategory
  title: string
  route: string
  summary: string
  spotlight: string
  accent: string
}

export const categories: Category[] = [
  {
    id: 'layout',
    title: 'Layout',
    route: '/layout',
    summary: 'Container-aware layouts, intrinsic sizing, subgrid, anchors, and viewport primitives.',
    spotlight: 'Responsive components without viewport-only breakpoints.',
    accent: 'layout',
  },
  {
    id: 'colors',
    title: 'Colors',
    route: '/colors',
    summary: 'Perceptual color spaces, generated palettes, color-scheme, and native form tinting.',
    spotlight: 'Design tokens that can derive useful variants in CSS.',
    accent: 'colors',
  },
  {
    id: 'functions',
    title: 'Functions',
    route: '/functions',
    summary: 'Math, logic, trigonometry, typed attributes, and future custom functions.',
    spotlight: 'CSS values as small layout programs.',
    accent: 'functions',
  },
  {
    id: 'selectors',
    title: 'Selectors',
    route: '/selectors',
    summary: 'State-driven selectors for forms, disclosure widgets, parents, popovers, and highlights.',
    spotlight: 'Less state wiring for common UI feedback.',
    accent: 'selectors',
  },
  {
    id: 'typography',
    title: 'Typography',
    route: '/typography',
    summary: 'Balanced wrapping, readable measure, font-relative units, hyphenation, and scripts.',
    spotlight: 'Better text layout with fewer one-off media queries.',
    accent: 'typography',
  },
  {
    id: 'motion',
    title: 'Motion',
    route: '/motion',
    summary: 'Scroll-driven animation, view timelines, discrete transitions, and view transitions.',
    spotlight: 'Interaction polish that respects reduced motion.',
    accent: 'motion',
  },
  {
    id: 'components',
    title: 'Components',
    route: '/components',
    summary: 'Dialog, popover, details, scroll-snap carousels, and platform UI primitives.',
    spotlight: 'Native behavior first, small React orchestration when needed.',
    accent: 'components',
  },
  {
    id: 'effects',
    title: 'Effects',
    route: '/effects',
    summary: 'Filters, masks, clipping, motion paths, blending, scrollbars, and surface effects.',
    spotlight: 'Creative visuals with progressive enhancement.',
    accent: 'effects',
  },
  {
    id: 'architecture',
    title: 'Architecture',
    route: '/architecture',
    summary: 'Cascade layers, scoped styles, nesting, tokens, typed properties, and supports guards.',
    spotlight: 'CSS systems that scale without hiding the cascade.',
    accent: 'architecture',
  },
  {
    id: 'games',
    title: 'Games',
    route: '/games',
    summary: 'A reserved area for future CSS-only game experiments.',
    spotlight: 'Prepared structure for state-machine-heavy CSS demos later.',
    accent: 'games',
  },
]

export const categoryById = new Map(categories.map((category) => [category.id, category]))
