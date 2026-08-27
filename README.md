# purpose

A small React site: a walking journey through my Purpose-to-Impact work.

Deployed at https://katyell.github.io/purpose/

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Framer Motion
- Vitest + Testing Library
- Deployed via GitHub Actions to GitHub Pages

## Develop

Requires Node 22 (see `.nvmrc`) and pnpm.

```sh
pnpm install
pnpm dev        # start dev server
pnpm test       # run tests once
pnpm test:watch # run tests in watch mode
pnpm build      # production build
pnpm lint       # oxlint
pnpm format     # prettier write
```

## Content

Every string on the site lives in [`src/content.ts`](./src/content.ts).
Edit it there.

## Structure

```
src/
  App.tsx                — state + keyboard nav
  content.ts             — all beat data, strengths, signature
  index.css              — Tailwind theme + global styles
  main.tsx               — entry
  components/
    Walkway.tsx          — timeline SVG + animated characters
    Walker.tsx           — the outlined figure
    BeatContent.tsx      — kicker + body (handles single-path and forked beats)
    SidePanel.tsx        — "What I bring"
    Signature.tsx        — name + role
    NavHint.tsx          — prev/next + keyboard hint
```
