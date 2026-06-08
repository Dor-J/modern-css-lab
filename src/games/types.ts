export type GameSlug =
  | 'toggle-puzzle'
  | 'tic-tac-toe'
  | 'memory-cards'
  | 'mine-sweeper'
  | 'snake'
  | 'icy-tower'
  | 'doom'

export type GameDefinition = {
  slug: GameSlug
  title: string
  route: string
  summary: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  cssFeatures: string[]
  controls: string[]
  status: 'playable' | 'css-feasible'
  supportNotes: string
}
