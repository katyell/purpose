import { useCallback, useEffect, useState } from 'react'
import { beats } from './content'
import { BeatContent } from './components/BeatContent'
import { NavHint } from './components/NavHint'
import { Signature } from './components/Signature'
import { SidePanel } from './components/SidePanel'
import { Walkway } from './components/Walkway'

export default function App() {
  const [current, setCurrent] = useState(0)

  const goTo = useCallback((i: number) => {
    setCurrent((prev) => {
      const clamped = Math.max(0, Math.min(beats.length - 1, i))
      return clamped === prev ? prev : clamped
    })
  }, [])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLElement &&
        ['INPUT', 'TEXTAREA'].includes(e.target.tagName)
      )
        return
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const beat = beats[current]

  return (
    <main className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-[color:var(--color-bg)]">
      <SidePanel />

      <div
        className="flex flex-1 cursor-pointer items-center justify-center pt-16 pb-8 sm:pt-24"
        onClick={next}
      >
        <BeatContent beat={beat} />
      </div>

      <div className="pointer-events-none h-[38vh] w-full px-2 pb-16 sm:h-[32vh]">
        <div className="pointer-events-auto h-full w-full">
          <Walkway current={current} onSelect={goTo} />
        </div>
      </div>

      <Signature />
      <NavHint current={current} onPrev={prev} onNext={next} />
    </main>
  )
}
