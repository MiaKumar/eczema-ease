import { useState, useEffect } from 'react'
import { useEntries } from '../hooks/useEntries'
import DateSelector from '../components/DateSelector'
import EczemaScoreRing from '../components/EczemaScoreRing'
import FlareSeveritySelector from '../components/FlareSeveritySelector'
import SeverityScale from '../components/SeverityScale'
import EnhancedBodyMap from '../components/EnhancedBodyMap'
import MedicationTracker from '../components/MedicationTracker'
import QuickLogIcons from '../components/QuickLogIcons'
import { Palette, Droplets, Sparkles, Bandage } from 'lucide-react'

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
    <div className="space-y-6 pb-4">
      {/* TOP: Score + Date */}
      <section className="bg-white rounded-card p-6 shadow-soft">
        <EczemaScoreRing entry={entry} />
        <div className="mt-6">
          <DateSelector value={dateKey} onChange={setDateKey} />
        </div>
      </section>

      {/* OVERALL SYMPTOMS */}
      <section>
        <h2 className="text-lg font-semibold text-sage-800 mb-3">Overall Symptoms Today</h2>
        <div className="space-y-4">
          <FlareSeveritySelector
            value={entry.flareSeverity}
            onChange={(flareSeverity) => persist({ flareSeverity })}
          />
          <SeverityScale
            label="Redness (0–10)"
            value={entry.redness ?? entry.darkColor}
            onChange={(redness) => persist({ redness })}
            icon={Palette}
          />
          <SeverityScale
            label="Swelling (0–10)"
            value={entry.swelling}
            onChange={(swelling) => persist({ swelling })}
            icon={Droplets}
          />
          <SeverityScale
            label="Itch (0–10)"
            value={entry.itch}
            onChange={(itch) => persist({ itch })}
            icon={Sparkles}
          />
          <SeverityScale
            label="Pain (0–10)"
            value={entry.pain}
            onChange={(pain) => persist({ pain })}
            icon={Bandage}
          />
        </div>
      </section>

      {/* BODY MAP */}
      <section>
        <h2 className="text-lg font-semibold text-sage-800 mb-1">Affected Areas</h2>
        <p className="text-sm text-sage-600 mb-3">Tap areas to track specific symptoms</p>
        <EnhancedBodyMap
          bodyAreas={entry.bodyAreas || {}}
          onUpdate={(bodyAreas) => persist({ bodyAreas })}
        />
      </section>

      {/* MEDICATIONS */}
      <MedicationTracker
        medications={entry.medications || []}
        onUpdate={(medications) => persist({ medications })}
      />

      {/* QUICK LOGS */}
      <section>
        <h2 className="text-lg font-semibold text-sage-800 mb-3">Quick Logs</h2>
        <QuickLogIcons
          sleep={entry.sleep}
          stress={entry.stress}
          weather={entry.weather}
          onSleep={(sleep) => persist({ sleep })}
          onStress={(stress) => persist({ stress })}
          onWeather={(weather) => persist({ weather })}
        />
      </section>
    </div>
  )
}
