import { useMemo } from 'react'

const SIZE = 140
const STROKE = 10
const R = (SIZE - STROKE) / 2
const CX = SIZE / 2
const CY = SIZE / 2

function getScoreColor(score) {
  if (score == null || Number.isNaN(score)) return 'stroke-sage-300'
  if (score <= 3) return 'stroke-score-good'
  if (score <= 6) return 'stroke-score-moderate'
  return 'stroke-score-challenging'
}

export default function EczemaScoreRing({ entry }) {
  const { score, hasData } = useMemo(() => {
    const r = entry?.redness ?? entry?.darkColor ?? null
    const s = entry?.swelling ?? null
    const i = entry?.itch ?? null
    const p = entry?.pain ?? null
    const values = [r, s, i, p].filter((v) => v != null && !Number.isNaN(v))
    if (values.length === 0) return { score: null, hasData: false }
    const avg = values.reduce((a, b) => a + b, 0) / values.length
    return { score: Math.round(avg * 10) / 10, hasData: true }
  }, [entry])

  const dashOffset = useMemo(() => {
    const circumference = 2 * Math.PI * R
    const value = score == null ? 0 : Math.min(10, Math.max(0, score)) / 10
    return circumference * (1 - value)
  }, [score])

  const colorClass = getScoreColor(score)

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} className="transform -rotate-90">
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE}
            className="text-seafoam-200"
          />
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * R}
            strokeDashoffset={dashOffset}
            className={`${colorClass} transition-all duration-500 ease-out`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-sage-800 tabular-nums">
            {hasData ? score.toFixed(1) : '—'}
          </span>
        </div>
      </div>
      <p className="text-sm font-semibold text-sage-700 mt-3">Today&apos;s Eczema Score</p>
      {hasData && (
        <p className="text-xs text-sage-500 mt-0.5">
          Redness, swelling, itch & pain average
        </p>
      )}
    </div>
  )
}
