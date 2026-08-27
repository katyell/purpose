import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { beats, signature, strengths } from './content'

describe('App', () => {
  it('renders the first beat kicker on load', () => {
    render(<App />)
    expect(screen.getAllByText(beats[0].kicker).length).toBeGreaterThan(0)
  })

  it('renders the signature', () => {
    render(<App />)
    expect(screen.getByText(signature.name)).toBeInTheDocument()
    expect(screen.getByText(signature.role)).toBeInTheDocument()
  })

  it('renders the strengths side panel', () => {
    render(<App />)
    for (const s of strengths) {
      expect(screen.getByText(s)).toBeInTheDocument()
    }
  })
})
