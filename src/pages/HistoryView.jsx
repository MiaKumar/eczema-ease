import { useState, useMemo } from 'react'
import { useEntries } from '../hooks/useEntries'
import CalendarView from '../components/CalendarView'
import SeverityChart from '../components/SeverityChart'

const todayKey = () => new Date().toISOString().slice(0, 10)

const WEATHER_LABELS = { sunny: 'Sunny', cloudy: 'Cloudy', cold: 'Cold', humid: 'Humid', dry: 'Dry', windy: 'Windy' }
const FLARE_LABELS = { none: 'None', mild: 'Mild', moderate: 'Moderate', severe: 'Severe' }

const TIMEFRAMES = [
  { days: 30, label: '30 days' },
  { days: 60, label: '60 days' },
  { days: 90, label: '90 days' },
  { days: 365, label: '365 days' },
]

function filterEntriesByTimeframe(entries, days) {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  const cutoffKey = cutoff.toISOString().slice(0, 10)
  const filtered = {}
  Object.keys(entries).forEach((key) => {
    if (key >= cutoffKey) filtered[key] = entries[key]
  })
  return filtered
}

export default function HistoryView() {
  const { entries } = useEntries()
  const [selectedDay, setSelectedDay] = useState(null)
  const [timeframe, setTimeframe] = useState(30)
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const t = new Date()
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}`
  })

  const filteredEntries = useMemo(() => filterEntriesByTimeframe(entries, timeframe), [entries, timeframe])
  const timeframeLabel = TIMEFRAMES.find((t) => t.days === timeframe)?.label || `${timeframe} days`

  const entry = selectedDay ? entries[selectedDay] : null
  const displayDate = selectedDay
    ? new Date(selectedDay + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    : null

  const handleCalendarSelect = (dayKey, monthKey) => {
    if (monthKey) setCalendarMonth(monthKey)
    else setSelectedDay(dayKey)
  }

  return (
    <div className="space-y-4">
      {/* Timeframe selector */}
      <div className="bg-white rounded-2xl border-2 border-seafoam-200 p-3 shadow-sm">
        <p className="text-xs font-semibold text-sage-700 mb-2">Timeframe</p>
        <div className="flex gap-2">
          {TIMEFRAMES.map(({ days, label }) => (
            <button
              key={days}
              type="button"
              onClick={() => setTimeframe(days)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                timeframe === days
                  ? 'bg-primary-500 text-white'
                  : 'bg-seafoam-100 text-sage-700 hover:bg-seafoam-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <SeverityChart entries={filteredEntries} limit={timeframe} timeframeLabel={timeframeLabel} />

      <CalendarView
        entries={filteredEntries}
        currentMonth={calendarMonth}
        onSelectDay={handleCalendarSelect}
      />

      {selectedDay && (
        <div className="bg-white rounded-2xl border-2 border-seafoam-200 p-4 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <h2 className="font-semibold text-sage-800">{displayDate}</h2>
            <button
              type="button"
              onClick={() => setSelectedDay(null)}
              className="text-sage-500 hover:text-sage-700 text-lg"
            >
              ×
            </button>
          </div>
          {entry ? (
            <div className="text-sm space-y-2">
              {entry.flareSeverity && (
                <p className="font-medium text-sage-800">
                  Flare Severity: <span className="text-primary-600">{FLARE_LABELS[entry.flareSeverity] || entry.flareSeverity}</span>
                </p>
              )}
              {((entry.redness ?? entry.darkColor) != null || entry.swelling != null || entry.itch != null || entry.pain != null) && (
                <div>
                  <p className="font-medium text-sage-700 mb-1">Overall Symptoms:</p>
                  {(entry.redness ?? entry.darkColor) != null && <p>Redness: {entry.redness ?? entry.darkColor}/10</p>}
                  {entry.swelling != null && <p>Swelling: {entry.swelling}/10</p>}
                  {entry.itch != null && <p>Itch: {entry.itch}/10</p>}
                  {entry.pain != null && <p>Pain: {entry.pain}/10</p>}
                </div>
              )}
              {entry.bodyAreas && Object.keys(entry.bodyAreas).length > 0 && (
                <div>
                  <p className="font-medium text-sage-700 mb-1">Body Areas:</p>
                  {Object.entries(entry.bodyAreas).map(([area, symptoms]) => (
                    <div key={area} className="ml-2 mb-1 text-xs">
                      <p className="font-medium">{area.replace(/-/g, ' ')}:</p>
                      {(symptoms.redness ?? symptoms.darkColor) != null && <span className="text-sage-600">Redness {symptoms.redness ?? symptoms.darkColor}/10 </span>}
                      {symptoms.swelling != null && <span className="text-sage-600">Swelling {symptoms.swelling}/10 </span>}
                      {symptoms.itch != null && <span className="text-sage-600">Itch {symptoms.itch}/10 </span>}
                      {symptoms.pain != null && <span className="text-sage-600">Pain {symptoms.pain}/10</span>}
                    </div>
                  ))}
                </div>
              )}
              {entry.sleep != null && <p>Sleep: {entry.sleep}/5</p>}
              {entry.stress != null && <p>Stress: {entry.stress}/5</p>}
              {entry.weather && <p>Weather: {WEATHER_LABELS[entry.weather] ?? entry.weather}</p>}
              {(entry.foods?.length ?? 0) > 0 && <p>Foods: {entry.foods.join(', ')}</p>}
              {(entry.fabrics?.length ?? 0) > 0 && <p>Fabrics: {entry.fabrics.join(', ')}</p>}
              {(entry.emotions?.length ?? 0) > 0 && <p>Emotions: {entry.emotions.join(', ')}</p>}
              {(entry.environmental?.length ?? 0) > 0 && <p>Environmental: {entry.environmental.join(', ')}</p>}
              {(entry.menstrual?.length ?? 0) > 0 && <p>Menstrual: {entry.menstrual.join(', ')}</p>}
              {(entry.products?.length ?? 0) > 0 && <p>Products: {entry.products.join(', ')}</p>}
              {(entry.otherTriggers?.length ?? 0) > 0 && <p>Other: {entry.otherTriggers.join(', ')}</p>}
              {entry.medications && entry.medications.length > 0 && (
                <div>
                  <p className="font-medium text-sage-700 mb-1">Medications:</p>
                  {entry.medications.map((med) => (
                    <p key={med.id} className="text-xs ml-2">
                      {med.name} {med.dosage && `(${med.dosage})`} {med.time && `at ${med.time}`}
                    </p>
                  ))}
                </div>
              )}
              {entry.notes && <p className="text-sage-600 pt-2 border-t border-seafoam-200">Notes: {entry.notes}</p>}
            </div>
          ) : (
            <p className="text-sage-500 text-sm">No data for this day.</p>
          )}
        </div>
      )}
    </div>
  )
}
