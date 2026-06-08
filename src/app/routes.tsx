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
const DoomPage = lazy(() => import('../games/doom/DoomPage'))
const IcyTowerPage = lazy(() => import('../games/icy-tower/IcyTowerPage'))
const MemoryCardsPage = lazy(() => import('../games/memory-cards/MemoryCardsPage'))
const MineSweeperPage = lazy(() => import('../games/mine-sweeper/MineSweeperPage'))
const SnakePage = lazy(() => import('../games/snake/SnakePage'))
const TicTacToePage = lazy(() => import('../games/tic-tac-toe/TicTacToePage'))
const TogglePuzzlePage = lazy(() => import('../games/toggle-puzzle/TogglePuzzlePage'))

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
  { path: 'games/doom', element: page(<DoomPage />) },
  { path: 'games/icy-tower', element: page(<IcyTowerPage />) },
  { path: 'games/memory-cards', element: page(<MemoryCardsPage />) },
  { path: 'games/tic-tac-toe', element: page(<TicTacToePage />) },
  { path: 'games/mine-sweeper', element: page(<MineSweeperPage />) },
  { path: 'games/snake', element: page(<SnakePage />) },
  { path: 'games/toggle-puzzle', element: page(<TogglePuzzlePage />) },
  { path: 'features/:slug', element: page(<FeatureDetailPage />) },
]
