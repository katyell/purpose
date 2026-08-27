import { beats } from '../content'

type Props = {
  current: number
  onPrev: () => void
  onNext: () => void
}

export function NavHint({ current, onPrev, onNext }: Props) {
  const canPrev = current > 0
  const canNext = current < beats.length - 1
  return (
    <div className="fixed bottom-4 right-6 z-10 flex items-center gap-4 font-sans text-xs text-[color:var(--color-muted)]">
      <span className="hidden sm:inline">
        <kbd className="rounded border border-[color:var(--color-dim)] px-1.5 py-0.5">
          ←
        </kbd>
        <kbd className="ml-1 rounded border border-[color:var(--color-dim)] px-1.5 py-0.5">
          →
        </kbd>
        <span className="ml-2 opacity-70">to walk</span>
      </span>
      <span className="tabular-nums">
        {current + 1} / {beats.length}
      </span>
      <div className="flex gap-1">
        <NavButton
          label="Previous stop"
          disabled={!canPrev}
          onClick={onPrev}
          glyph="←"
        />
        <NavButton
          label="Next stop"
          disabled={!canNext}
          onClick={onNext}
          glyph="→"
        />
      </div>
    </div>
  )
}

function NavButton({
  label,
  disabled,
  onClick,
  glyph,
}: {
  label: string
  disabled: boolean
  onClick: () => void
  glyph: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--color-dim)] text-[color:var(--color-fg)]/80 transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[color:var(--color-dim)] disabled:hover:text-[color:var(--color-fg)]/80"
    >
      {glyph}
    </button>
  )
}
