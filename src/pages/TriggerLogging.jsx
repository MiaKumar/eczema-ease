import { useState, useEffect } from 'react'
import { useEntries } from '../hooks/useEntries'
import DateSelector from '../components/DateSelector'

const todayKey = () => new Date().toISOString().slice(0, 10)

const FOODS = ['Dairy', 'Eggs', 'Nuts', 'Gluten', 'Citrus', 'Shellfish', 'Soy', 'Spicy', 'Alcohol', 'Chocolate', 'Tomatoes']
const FABRICS = ['Wool', 'Synthetic fabrics', 'Latex', 'Metals', 'Nickel', 'Rubber']
const EMOTIONS = ['Stress', 'Anxiety', 'Depression', 'Anger', 'Excitement']
const ENVIRONMENTAL = ['Pollen', 'Dust', 'Pet dander', 'Mold', 'Humidity', 'Temperature changes', 'Dry air']
const MENSTRUAL = ['Period start', 'Ovulation', 'PMS']
const PRODUCTS = ['Soap', 'Lotion', 'Detergent', 'Fragrance', 'Makeup', 'Sunscreen', 'Shampoo', 'Conditioner']

function TriggerCategory({ label, options, selected = [], onChange, onAddCustom }) {
  const [customValue, setCustomValue] = useState('')
  const [showCustom, setShowCustom] = useState(false)

  const toggle = (item) => {
    const set = new Set(selected)
    if (set.has(item)) set.delete(item)
    else set.add(item)
    onChange([...set])
  }

  const addCustom = () => {
    if (customValue.trim() && !selected.includes(customValue.trim())) {
      onChange([...selected, customValue.trim()])
      setCustomValue('')
      setShowCustom(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-sage-800">{label}</p>
        {!showCustom && (
          <button
            type="button"
            onClick={() => setShowCustom(true)}
            className="text-xs text-primary-600 hover:text-primary-700"
          >
            + Custom
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selected.includes(opt)
                ? 'bg-primary-500 text-white shadow-sm'
                : 'bg-seafoam-100 text-sage-700 hover:bg-seafoam-200'
            }`}
          >
            {opt}
          </button>
        ))}
        {selected.filter((s) => !options.includes(s)).map((custom) => (
          <button
            key={custom}
            type="button"
            onClick={() => toggle(custom)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-500 text-white shadow-sm"
          >
            {custom} ×
          </button>
        ))}
      </div>
      {showCustom && (
        <div className="flex gap-2">
          <input
            type="text"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustom()}
            placeholder="Enter custom trigger"
            className="flex-1 rounded-lg border border-seafoam-300 px-2 py-1.5 text-xs"
          />
          <button
            type="button"
            onClick={addCustom}
            className="px-3 py-1.5 bg-primary-500 text-white rounded-lg text-xs font-medium"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => { setShowCustom(false); setCustomValue('') }}
            className="px-3 py-1.5 bg-seafoam-100 text-sage-700 rounded-lg text-xs"
          >
            Cancel
          </button>
        </div>
      )}
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

      <div className="bg-white rounded-2xl border-2 border-seafoam-200 p-4 shadow-sm space-y-6">
        <TriggerCategory
          label="Foods"
          options={FOODS}
          selected={entry.foods ?? []}
          onChange={(foods) => persist({ foods })}
        />
        <TriggerCategory
          label="Fabrics/Materials"
          options={FABRICS}
          selected={entry.fabrics ?? []}
          onChange={(fabrics) => persist({ fabrics })}
        />
        <TriggerCategory
          label="Emotions"
          options={EMOTIONS}
          selected={entry.emotions ?? []}
          onChange={(emotions) => persist({ emotions })}
        />
        <TriggerCategory
          label="Environmental"
          options={ENVIRONMENTAL}
          selected={entry.environmental ?? []}
          onChange={(environmental) => persist({ environmental })}
        />
        <TriggerCategory
          label="Menstrual Cycle"
          options={MENSTRUAL}
          selected={entry.menstrual ?? []}
          onChange={(menstrual) => persist({ menstrual })}
        />
        <TriggerCategory
          label="Products"
          options={PRODUCTS}
          selected={entry.products ?? []}
          onChange={(products) => persist({ products })}
        />
        <TriggerCategory
          label="Other"
          options={[]}
          selected={entry.otherTriggers ?? []}
          onChange={(otherTriggers) => persist({ otherTriggers })}
        />
      </div>

      <div className="bg-white rounded-2xl border-2 border-seafoam-200 p-4 shadow-sm">
        <label className="block text-sm font-semibold text-sage-800 mb-2" htmlFor="notes">
          Additional Notes
        </label>
        <textarea
          id="notes"
          rows={4}
          className="w-full rounded-lg border-2 border-seafoam-200 px-3 py-2 text-sm focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
          placeholder="Any other triggers or notes..."
          value={entry.notes ?? ''}
          onChange={(e) => persist({ notes: e.target.value })}
        />
      </div>
    </div>
  )
}
