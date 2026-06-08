/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense, type ReactNode } from 'react'

const ArchitecturePage = lazy(() => import('../pages/ArchitecturePage'))
const ColorsPage = lazy(() => import('../pages/ColorsPage'))
const ComponentsPage = lazy(() => import('../pages/ComponentsPage'))
const CssCatalogDetailPage = lazy(() => import('../pages/CssCatalogDetailPage'))
const CssCatalogPage = lazy(() => import('../pages/CssCatalogPage'))
const EffectsPage = lazy(() => import('../pages/EffectsPage'))
const FeatureDetailPage = lazy(() => import('../pages/FeatureDetailPage'))
const FunctionsPage = lazy(() => import('../pages/FunctionsPage'))
const GamesPage = lazy(() => import('../pages/GamesPage'))
const HomePage = lazy(() => import('../pages/HomePage'))
const LayoutPage = lazy(() => import('../pages/LayoutPage'))
const MotionPage = lazy(() => import('../pages/MotionPage'))
const SelectorsPage = lazy(() => import('../pages/SelectorsPage'))
const TypographyPage = lazy(() => import('../pages/TypographyPage'))

export type AppRoute = {
  path?: string
  index?: boolean
  element: ReactNode
}

const page = (element: ReactNode) => <Suspense fallback={<main className="route-loading">Loading CSS lab...</main>}>{element}</Suspense>

export const routes: AppRoute[] = [
  { index: true, element: page(<HomePage />) },
  { path: 'css', element: page(<CssCatalogPage />) },
  { path: 'css/:slug', element: page(<CssCatalogDetailPage />) },
  { path: 'layout', element: page(<LayoutPage />) },
  { path: 'colors', element: page(<ColorsPage />) },
  { path: 'functions', element: page(<FunctionsPage />) },
  { path: 'selectors', element: page(<SelectorsPage />) },
  { path: 'typography', element: page(<TypographyPage />) },
  { path: 'motion', element: page(<MotionPage />) },
  { path: 'components', element: page(<ComponentsPage />) },
  { path: 'effects', element: page(<EffectsPage />) },
  { path: 'architecture', element: page(<ArchitecturePage />) },
  { path: 'games', element: page(<GamesPage />) },
  { path: 'features/:slug', element: page(<FeatureDetailPage />) },
]
