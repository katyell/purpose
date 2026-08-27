import { motion, type Transition } from 'framer-motion'

/**
 * Deliberately non-specific outlined figure with long hair. No face, no fill.
 * Drawn as an SVG `<g>` so a parent SVG can position and scale it. The natural
 * coord space is roughly 0..60 wide, 0..120 tall, feet at y ≈ 118.
 */
type Props = { walking?: boolean }

export function Walker({ walking = false }: Props) {
  const bob = walking ? { y: [0, -1.4, 0, -1.4, 0] } : { y: 0 }
  const legLeft = walking ? { rotate: [0, 22, 0, -22, 0] } : { rotate: 0 }
  const legRight = walking ? { rotate: [0, -22, 0, 22, 0] } : { rotate: 0 }
  const armLeft = walking ? { rotate: [0, -18, 0, 18, 0] } : { rotate: 0 }
  const armRight = walking ? { rotate: [0, 18, 0, -18, 0] } : { rotate: 0 }

  const cycle: Transition = walking
    ? { duration: 0.6, repeat: Infinity, ease: 'easeInOut' }
    : { duration: 0.2 }

  // fill-box + percentage origin pivots each limb around its joint reliably.
  const pivotTopRight = {
    transformBox: 'fill-box' as const,
    transformOrigin: '100% 0%',
  }
  const pivotTopLeft = {
    transformBox: 'fill-box' as const,
    transformOrigin: '0% 0%',
  }

  return (
    <motion.g
      animate={bob}
      transition={cycle}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* long hair (drawn behind head) */}
      <path d="M18 20 Q11 40 13 68 Q15 82 20 92" />
      <path d="M42 20 Q49 40 47 68 Q45 82 40 92" />
      <path d="M22 18 Q17 32 18 52" opacity={0.65} />
      <path d="M38 18 Q43 32 42 52" opacity={0.65} />

      {/* head */}
      <circle cx={30} cy={22} r={9.5} />

      {/* neck */}
      <path d="M30 31.5 v6" />

      {/* shoulders */}
      <path d="M22 41 h16" />

      {/* torso */}
      <path d="M30 41 v30" />

      {/* arms — swing from shoulders */}
      <motion.path
        d="M22 41 Q20 55 22 68"
        animate={armLeft}
        transition={cycle}
        style={pivotTopRight}
      />
      <motion.path
        d="M38 41 Q40 55 38 68"
        animate={armRight}
        transition={cycle}
        style={pivotTopLeft}
      />

      {/* legs — swing from hip */}
      <motion.path
        d="M30 71 L25 118"
        animate={legLeft}
        transition={cycle}
        style={pivotTopRight}
      />
      <motion.path
        d="M30 71 L35 118"
        animate={legRight}
        transition={cycle}
        style={pivotTopLeft}
      />
    </motion.g>
  )
}
