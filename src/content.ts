export type SinglePathBeat = {
  id: string
  kicker: string
  body: string[]
}

export type ForkedBeat = {
  id: string
  kicker: string
  job: string
  off: string
  epilogue?: string
}

export type Beat = SinglePathBeat | ForkedBeat

export const isForked = (b: Beat): b is ForkedBeat => Object.hasOwn(b, 'job')

export const beats: Beat[] = [
  {
    id: 'purpose',
    kicker: 'Purpose',
    body: ['Finding the root of problems and fixing them to bring calm.'],
  },
  {
    id: 'tension',
    kicker: 'But',
    body: [
      'But it only shows up when things go wrong.',
      'I want to find it in the calm, too.',
    ],
  },
  {
    id: 'activators',
    kicker: 'What activates me',
    body: [
      'Someone needs support.',
      'A tangled problem needs unpicking.',
      'An idea is genuinely interesting.',
      "There's a mystery to figure out.",
    ],
  },
  {
    id: '30-days',
    kicker: 'In the next 30 days',
    job: 'Share knowledge across the team. Upgrade our services — dependency automation, migration to Vitest.',
    off: 'Ask friends for book and podcast recommendations. Look into volunteering options. Go to one gallery exhibition.',
  },
  {
    id: '3-months',
    kicker: 'In 3 months',
    job: 'A plan to modernise the Loyalty services, and refactoring underway. Pairing more. Team relationships deepening.',
    off: 'Reading and listening — news, politics, history. Writing my own thoughts down. See a theatre show.',
  },
  {
    id: '6-months',
    kicker: 'In 6 months',
    job: 'Team ways of working evolved and sharpened. Loyalty services refactored to a solid, modern baseline.',
    off: 'Still reading, still listening. Writing has started to find a public home — including on the arts.',
  },
  {
    id: '1-year',
    kicker: 'In a year',
    job: "The team runs so smoothly I've made myself unneeded. That space goes to looking across the whole Loyalty landscape, chasing the interesting technical ideas, and bringing experiments back to the wider department.",
    off: "Volunteering somewhere the stakes are real — RNLI if I can, something adjacent if I can't. Publishing on the things I keep coming back to: books, history, the arts.",
    epilogue:
      'For: colleagues who deserve a calm team. People who deserve someone showing up in the hard moments.',
  },
]

/**
 * The beat index at which the path forks (job / off-job lanes appear).
 * At and after this index, two silhouettes walk in parallel.
 * The final forked beat rejoins to a single path.
 */
export const FORK_START_INDEX = 3
export const REJOIN_INDEX = beats.length - 1

export const strengths = [
  'Open-minded and flexible',
  'Calm when it matters',
  'A moral compass — willing to stand against the norm',
  'Reads the room',
  'Delegates without ego',
]

export const signature = {
  name: 'Katy Ellington',
  role: 'Lead Software Engineer',
}
