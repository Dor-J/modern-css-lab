type GameSupportNoteProps = {
  children: string
}

function GameSupportNote({ children }: GameSupportNoteProps) {
  return (
    <aside className="game-support-note" aria-label="CSS support note">
      <strong>CSS-only caveat</strong>
      <p>{children}</p>
    </aside>
  )
}

export default GameSupportNote
