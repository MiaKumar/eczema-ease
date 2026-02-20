import { useMemo } from 'react'

const todayKey = () => {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}

export default function DateSelector({ value, onChange }) {
  const dateKey = value || todayKey()
  const displayDate = useMemo(() => {
    const d = new Date(dateKey + 'T12:00:00')
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
  }, [dateKey])

  const goPrev = () => {
    const d = new Date(dateKey + 'T12:00:00')
    d.setDate(d.getDate() - 1)
    onChange(d.toISOString().slice(0, 10))
  }

  const goNext = () => {
    const d = new Date(dateKey + 'T12:00:00')
    d.setDate(d.getDate() + 1)
    const next = d.toISOString().slice(0, 10)
    const today = todayKey()
    if (next <= today) onChange(next)
  }

  const isToday = dateKey === todayKey()
  const canGoNext = dateKey < todayKey()

  return (
    <div className="flex items-center justify-between bg-white rounded-xl border-2 border-seafoam-200 p-3 shadow-sm">
      <button
        type="button"
        onClick={goPrev}
        className="p-2 rounded-lg text-primary-600 hover:bg-seafoam-100 active:bg-seafoam-200"
        aria-label="Previous day"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="text-center">
        <p className="text-sm font-medium text-sage-800">{displayDate}</p>
        {isToday && (
          <p className="text-xs text-primary-600 font-medium">Today</p>
        )}
      </div>
      <button
        type="button"
        onClick={goNext}
        disabled={!canGoNext}
        className="p-2 rounded-lg text-primary-600 hover:bg-seafoam-100 active:bg-seafoam-200 disabled:opacity-40 disabled:pointer-events-none"
        aria-label="Next day"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}
