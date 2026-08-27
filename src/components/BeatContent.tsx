import { AnimatePresence, motion } from 'framer-motion'
import { type Beat, isForked } from '../content'

type Props = { beat: Beat }

export function BeatContent({ beat }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={beat.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="mx-auto w-full max-w-[40rem] px-6 text-center"
      >
        <div className="mb-8 font-sans text-xs uppercase tracking-[0.28em] text-[color:var(--color-muted)]">
          {beat.kicker}
        </div>

        {isForked(beat) ? (
          <ForkedBody beat={beat} />
        ) : (
          <SingleBody beat={beat} />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

function SingleBody({ beat }: { beat: Extract<Beat, { body: string[] }> }) {
  const count = beat.body.length
  const size =
    count === 1
      ? 'text-3xl md:text-4xl'
      : count <= 2
        ? 'text-2xl md:text-3xl'
        : 'text-lg md:text-xl'

  return (
    <div className="space-y-3">
      {beat.body.map((line, i) => (
        <p
          key={i}
          className={`font-serif ${size} leading-tight text-[color:var(--color-fg)]`}
        >
          {line}
        </p>
      ))}
    </div>
  )
}

function ForkedBody({
  beat,
}: {
  beat: Extract<Beat, { job: string; off: string }>
}) {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-2">
        <Lane label="Work" body={beat.job} />
        <Lane label="Off the clock" body={beat.off} />
      </div>
      {beat.epilogue && (
        <p className="mt-8 font-serif text-sm italic text-[color:var(--color-muted)]">
          {beat.epilogue}
        </p>
      )}
    </>
  )
}

function Lane({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="mb-2 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-[color:var(--color-accent)]/70">
        {label}
      </div>
      <p className="font-serif text-lg leading-snug text-[color:var(--color-fg)] md:text-xl">
        {body}
      </p>
    </div>
  )
}
