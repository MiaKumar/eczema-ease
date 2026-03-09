import { useState, useEffect } from 'react'
import { useEntries } from '../hooks/useEntries'
import DateSelector from '../components/DateSelector'
import FlareSeveritySelector from '../components/FlareSeveritySelector'
import SeverityScale from '../components/SeverityScale'
import EnhancedBodyMap from '../components/EnhancedBodyMap'
import MedicationTracker from '../components/MedicationTracker'
import QuickLogIcons from '../components/QuickLogIcons'

const todayKey = () => new Date().toISOString().slice(0, 10)

function todayScore(entry) {
  const r = entry?.redness ?? entry?.darkColor ?? 0
  const s = entry?.swelling ?? 0
  const i = entry?.itch ?? 0
  const p = entry?.pain ?? 0
  return Math.round(((r + s + i + p) / 4) * 10) / 10
}

function scoreColor(score) {
  if (score <= 3) return '#7EBFB3'
  if (score <= 6) return '#F4C542'
  return '#F4A896'
}

const RING_SIZE = 120
const RING_R = 50
const RING_STROKE = 10
const RING_C = 2 * Math.PI * RING_R

export default function HomeScreen() {
  const { entries, updateEntry } = useEntries()
  const [dateKey, setDateKey] = useState(todayKey())
  const entry = entries[dateKey] ?? {}

  useEffect(() => {
    setDateKey((k) => k || todayKey())
  }, [])

  const persist = (updates) => updateEntry(dateKey, { ...entry, ...updates })

  const score = todayScore(entry)
  const pct = Math.min(1, score / 10)
  const ringColor = scoreColor(score)
  const dashOffset = RING_C * (1 - pct)

  return (
    <div className="space-y-6">
      {/* Today's Eczema Score */}
      <div className="flex flex-col items-center mt-8">
        <div
          className="relative rounded-full flex items-center justify-center shadow-score-glow"
          style={{
            width: RING_SIZE,
            height: RING_SIZE,
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(224,251,247,0.4))',
          }}
        >
          <svg width={RING_SIZE} height={RING_SIZE} className="rotate-[-90deg]" aria-hidden="true">
            <circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_R}
              fill="none"
              stroke="#E5E7EB"
              strokeWidth={RING_STROKE}
            />
            <circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_R}
              fill="none"
              stroke={ringColor}
              strokeWidth={RING_STROKE}
              strokeLinecap="round"
              strokeDasharray={RING_C}
              strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset 0.4s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.3s ease-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-sage-800 tabular-nums">{score.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-sm font-medium text-sage-700 mt-2">Today&apos;s Eczema Score</p>
      </div>

      <DateSelector value={dateKey} onChange={setDateKey} />

      {/* Overall Flare Severity */}
      <FlareSeveritySelector
        value={entry.flareSeverity}
        onChange={(flareSeverity) => persist({ flareSeverity })}
      />

      {/* Symptoms in new order */}
      <SeverityScale
        label="Redness (0–10)"
        value={entry.redness}
        onChange={(redness) => persist({ redness })}
        showDefinition
        iconType="redness"
      />
      <SeverityScale
        label="Swelling (0–10)"
        value={entry.swelling}
        onChange={(swelling) => persist({ swelling })}
        showDefinition
        iconType="swelling"
      />
      <SeverityScale
        label="Itch (0–10)"
        value={entry.itch}
        onChange={(itch) => persist({ itch })}
        showDefinition
        iconType="itch"
      />
      <SeverityScale
        label="Pain (0–10)"
        value={entry.pain}
        onChange={(pain) => persist({ pain })}
        showDefinition
        iconType="pain"
      />

      {/* Sleep, Stress, Weather */}
      <QuickLogIcons
        sleep={entry.sleep}
        stress={entry.stress}
        weather={entry.weather}
        onSleep={(sleep) => persist({ sleep })}
        onStress={(stress) => persist({ stress })}
        onWeather={(weather) => persist({ weather })}
      />

      {/* Enhanced Body Map */}
      <EnhancedBodyMap
        bodyAreas={entry.bodyAreas || {}}
        onUpdate={(bodyAreas) => persist({ bodyAreas })}
      />

      {/* Medications */}
      <MedicationTracker
        medications={entry.medications || []}
        onUpdate={(medications) => persist({ medications })}
      />
    </div>
  )
}
