import { useState, useEffect } from 'react'
import { useEntries } from '../hooks/useEntries'
import DateSelector from '../components/DateSelector'
import SeverityScale from '../components/SeverityScale'
import BodyMap from '../components/BodyMap'
import QuickLogIcons from '../components/QuickLogIcons'

const todayKey = () => new Date().toISOString().slice(0, 10)

export default function HomeScreen() {
  const { entries, updateEntry } = useEntries()
  const [dateKey, setDateKey] = useState(todayKey())
  const entry = entries[dateKey] ?? {}

  useEffect(() => {
    setDateKey((k) => k || todayKey())
  }, [])

  const persist = (updates) => updateEntry(dateKey, { ...entry, ...updates })

  return (
    <div className="space-y-4">
      <DateSelector value={dateKey} onChange={setDateKey} />

      <SeverityScale
        label="Itch severity (0–10)"
        value={entry.itch}
        onChange={(itch) => persist({ itch })}
      />
      <SeverityScale
        label="Pain severity (0–10)"
        value={entry.pain}
        onChange={(pain) => persist({ pain })}
      />

      <BodyMap
        selectedAreas={entry.bodyAreas ?? []}
        onChange={(bodyAreas) => persist({ bodyAreas })}
      />

      <QuickLogIcons
        sleep={entry.sleep}
        stress={entry.stress}
        weather={entry.weather}
        onSleep={(sleep) => persist({ sleep })}
        onStress={(stress) => persist({ stress })}
        onWeather={(weather) => persist({ weather })}
      />
    </div>
  )
}
