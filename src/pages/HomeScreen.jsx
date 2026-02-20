import { useState, useEffect } from 'react'
import { useEntries } from '../hooks/useEntries'
import DateSelector from '../components/DateSelector'
import FlareSeveritySelector from '../components/FlareSeveritySelector'
import SeverityScale from '../components/SeverityScale'
import EnhancedBodyMap from '../components/EnhancedBodyMap'
import MedicationTracker from '../components/MedicationTracker'
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

      {/* Overall Flare Severity */}
      <FlareSeveritySelector
        value={entry.flareSeverity}
        onChange={(flareSeverity) => persist({ flareSeverity })}
      />

      {/* Symptoms in new order */}
      <SeverityScale
        label="Dark color (0–10)"
        value={entry.darkColor}
        onChange={(darkColor) => persist({ darkColor })}
      />
      <SeverityScale
        label="Swelling (0–10)"
        value={entry.swelling}
        onChange={(swelling) => persist({ swelling })}
      />
      <SeverityScale
        label="Itch (0–10)"
        value={entry.itch}
        onChange={(itch) => persist({ itch })}
      />
      <SeverityScale
        label="Pain (0–10)"
        value={entry.pain}
        onChange={(pain) => persist({ pain })}
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

      {/* Quick Logs */}
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
