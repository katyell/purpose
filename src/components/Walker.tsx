/**
 * Deliberately non-specific outlined figure with long hair. No face, no fill.
 * Drawn as an SVG `<g>` so a parent SVG can position and scale it. The natural
 * coord space is roughly 0..60 wide, 0..120 tall, feet at y ≈ 118.
 */
export function Walker() {
  return (
    <g
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

      {/* arms */}
      <path d="M22 41 Q20 55 22 68" />
      <path d="M38 41 Q40 55 38 68" />

      {/* legs */}
      <path d="M30 71 L25 118" />
      <path d="M30 71 L35 118" />
    </g>
  )
}
