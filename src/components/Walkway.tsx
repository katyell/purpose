import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { beats, FORK_START_INDEX, REJOIN_INDEX } from '../content'
import { Walker } from './Walker'

const X_START = 50
const X_GAP = 100
const GROUND_Y = 100
const UPPER_Y = 55
const LOWER_Y = 145

const xForBeat = (i: number) => X_START + i * X_GAP
const isForkedIndex = (i: number) => i >= FORK_START_INDEX && i < REJOIN_INDEX

type Props = {
  current: number
  onSelect: (i: number) => void
}

export function Walkway({ current, onSelect }: Props) {
  const forked = isForkedIndex(current)
  const x = xForBeat(current)
  const easing = [0.4, 0, 0.2, 1] as const
  const transitionMs = 750

  const [walking, setWalking] = useState(false)
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    setWalking(true)
    const t = setTimeout(() => setWalking(false), transitionMs)
    return () => clearTimeout(t)
  }, [current])

  return (
    <svg
      viewBox="0 -30 700 230"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Journey scene, currently at stop ${current + 1} of ${beats.length}`}
    >
      {/* Timeline paths */}
      <g fill="none" stroke="var(--color-dim)" strokeWidth={1}>
        <path d="M 20 100 L 290 100" />
        <path d="M 290 100 C 310 100 320 55 340 55 L 600 55 C 620 55 630 100 660 100 L 680 100" />
        <path d="M 290 100 C 310 100 320 145 340 145 L 600 145 C 620 145 630 100 660 100 L 680 100" />
      </g>

      {/* Milestone dots */}
      {beats.map((b, i) => {
        const bx = xForBeat(i)
        const active = i === current
        if (isForkedIndex(i)) {
          return (
            <g key={b.id}>
              <MilestoneDot
                x={bx}
                y={UPPER_Y}
                active={active}
                label={b.kicker}
                onClick={() => onSelect(i)}
              />
              <MilestoneDot
                x={bx}
                y={LOWER_Y}
                active={active}
                label={b.kicker}
                onClick={() => onSelect(i)}
              />
            </g>
          )
        }
        return (
          <MilestoneDot
            key={b.id}
            x={bx}
            y={GROUND_Y}
            active={active}
            label={b.kicker}
            onClick={() => onSelect(i)}
          />
        )
      })}

      {/* Primary walker: on single path when not forked, on upper lane when forked */}
      <motion.g
        animate={{ x, y: forked ? UPPER_Y : GROUND_Y }}
        transition={{ duration: 0.75, ease: easing }}
        style={{ color: 'var(--color-accent)' }}
      >
        <ScaledWalker walking={walking} />
      </motion.g>

      {/* Secondary walker: appears on lower lane during forked beats */}
      <motion.g
        initial={false}
        animate={{
          x,
          y: forked ? LOWER_Y : GROUND_Y,
          opacity: forked ? 1 : 0,
        }}
        transition={{ duration: 0.75, ease: easing }}
        style={{ color: 'var(--color-accent)' }}
      >
        <ScaledWalker walking={walking} />
      </motion.g>
    </svg>
  )
}

function ScaledWalker({ walking }: { walking: boolean }) {
  return (
    <g transform="scale(0.7)">
      <g transform="translate(-30, -118)">
        <Walker walking={walking} />
      </g>
    </g>
  )
}

type DotProps = {
  x: number
  y: number
  active: boolean
  label: string
  onClick: () => void
}

function MilestoneDot({ x, y, active, label, onClick }: DotProps) {
  const r = active ? 4 : 2
  return (
    <g
      onClick={onClick}
      className="cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={`Go to ${label}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {/* invisible larger hit target */}
      <circle cx={x} cy={y} r={12} fill="transparent" />
      <motion.circle
        cx={x}
        cy={y}
        initial={{ r }}
        animate={{ r }}
        transition={{ duration: 0.3 }}
        fill={active ? 'var(--color-accent)' : 'var(--color-muted)'}
      />
    </g>
  )
}
