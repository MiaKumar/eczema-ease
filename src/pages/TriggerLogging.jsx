import { useState, useEffect } from 'react'
import { useEntries } from '../hooks/useEntries'
import DateSelector from '../components/DateSelector'

const todayKey = () => new Date().toISOString().slice(0, 10)

const QUICK_FOODS = ['Dairy', 'Eggs', 'Nuts', 'Wheat', 'Shellfish', 'Soy', 'Spicy', 'Alcohol', 'Other']
const QUICK_PRODUCTS = ['Soap', 'Lotion', 'Detergent', 'Fragrance', 'Makeup', 'Sunscreen', 'Other']
const QUICK_ACTIVITIES = ['Exercise', 'Swimming', 'Hot shower', 'Cold exposure', 'Sweating', 'Scratching', 'Other']

function QuickAdd({ label, options, selected = [], onChange }) {
  const toggle = (item) => {
    const set = new Set(selected)
    if (set.has(item)) set.delete(item)
    else set.add(item)
    onChange([...set])
  }

  return (
    <div>
      <p className="text-sm font-medium text-slate-700 mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selected.includes(opt)
                ? 'bg-primary-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-primary-100 hover:text-primary-700'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function TriggerLogging() {
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

      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-4">
        <QuickAdd
          label="Foods"
          options={QUICK_FOODS}
          selected={entry.foods ?? []}
          onChange={(foods) => persist({ foods })}
        />
        <QuickAdd
          label="Products used"
          options={QUICK_PRODUCTS}
          selected={entry.products ?? []}
          onChange={(products) => persist({ products })}
        />
        <QuickAdd
          label="Activities"
          options={QUICK_ACTIVITIES}
          selected={entry.activities ?? []}
          onChange={(activities) => persist({ activities })}
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="notes">
          Notes
        </label>
        <textarea
          id="notes"
          rows={4}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Any other triggers or notes..."
          value={entry.notes ?? ''}
          onChange={(e) => persist({ notes: e.target.value })}
        />
      </div>
    </div>
  )
}
