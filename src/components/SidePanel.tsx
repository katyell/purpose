import { strengths } from '../content'

export function SidePanel() {
  return (
    <aside
      className="pointer-events-none fixed right-6 top-6 z-10 hidden max-w-[16rem] text-right sm:block"
      aria-label="What I bring"
    >
      <div className="mb-2 font-sans text-[0.65rem] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
        What I bring
      </div>
      <ul className="space-y-1 font-serif text-sm leading-snug text-[color:var(--color-fg)]/80">
        {strengths.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </aside>
  )
}
