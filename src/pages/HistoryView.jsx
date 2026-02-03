import { useState, useMemo } from 'react'
import { useEntries } from '../hooks/useEntries'
import CalendarView from '../components/CalendarView'
import SeverityChart from '../components/SeverityChart'

const todayKey = () => new Date().toISOString().slice(0, 10)

const WEATHER_LABELS = { sunny: 'Sunny', cloudy: 'Cloudy', cold: 'Cold', humid: 'Humid', dry: 'Dry', windy: 'Windy' }

export default function HistoryView() {
  const { entries } = useEntries()
  const [selectedDay, setSelectedDay] = useState(null)
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const t = new Date()
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}`
  })

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
      <SeverityChart entries={entries} />

      <CalendarView
        entries={entries}
        currentMonth={calendarMonth}
        onSelectDay={handleCalendarSelect}
      />

      {selectedDay && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <h2 className="font-medium text-slate-800">{displayDate}</h2>
            <button
              type="button"
              onClick={() => setSelectedDay(null)}
              className="text-slate-500 hover:text-slate-700 text-sm"
            >
              Close
            </button>
          </div>
          {entry ? (
            <div className="text-sm space-y-2">
              {(entry.itch != null || entry.pain != null) && (
                <p>
                  Itch: {entry.itch ?? '—'} / Pain: {entry.pain ?? '—'}
                </p>
              )}
              {(entry.bodyAreas?.length ?? 0) > 0 && (
                <p>Areas: {entry.bodyAreas.join(', ')}</p>
              )}
              {entry.sleep != null && <p>Sleep: {entry.sleep}/5</p>}
              {entry.stress != null && <p>Stress: {entry.stress}/5</p>}
              {entry.weather && <p>Weather: {WEATHER_LABELS[entry.weather] ?? entry.weather}</p>}
              {(entry.foods?.length ?? 0) > 0 && <p>Foods: {entry.foods.join(', ')}</p>}
              {(entry.products?.length ?? 0) > 0 && <p>Products: {entry.products.join(', ')}</p>}
              {(entry.activities?.length ?? 0) > 0 && <p>Activities: {entry.activities.join(', ')}</p>}
              {entry.notes && <p className="text-slate-600">Notes: {entry.notes}</p>}
            </div>
          ) : (
            <p className="text-slate-500 text-sm">No data for this day.</p>
          )}
        </div>
      )}
    </div>
  )
}
