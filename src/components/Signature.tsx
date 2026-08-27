import { signature } from '../content'

export function Signature() {
  return (
    <footer className="fixed bottom-4 left-6 z-10 font-sans text-xs text-[color:var(--color-muted)]">
      <span className="text-[color:var(--color-fg)]/80">{signature.name}</span>
      <span className="mx-2 opacity-60">·</span>
      <span>{signature.role}</span>
    </footer>
  )
}
